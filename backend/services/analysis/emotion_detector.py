import json
from typing import Dict, Any
from ai.sarvam_client import generate_response
import spacy
from transformers import pipeline

try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    raise OSError(
        "spaCy model not found. Run: python -m spacy download en_core_web_sm"
    )


emotion_classifier = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    top_k=None
)


def extract_context(text: str) -> Dict[str, list]:
    

    doc = nlp(text)

    entities = list(
        set(
            ent.text
            for ent in doc.ents
        )
    )

    keywords = []

    for token in doc:

        if (
            token.is_stop
            or token.is_punct
            or token.is_space
        ):
            continue

        if len(token.text) <= 2:
            continue

        keywords.append(
            token.lemma_.lower()
        )

    keywords = list(set(keywords))

    return {
        "entities": entities,
        "keywords": keywords
    }


def get_emotion_scores(text: str) -> Dict[str, float]:
    

    predictions = emotion_classifier(text)[0]

    scores = {}

    for item in predictions:
        scores[item["label"]] = round(
            item["score"],
            4
        )

    return scores


def create_emotion_prompt(text: str) -> str:

    context = extract_context(text)

    emotion_scores = get_emotion_scores(text)

    prompt = f"""
        You are an expert media manipulation analyst.

        Analyze the following content.

        Determine:

        1. Whether fear-based language is present.
        2. Whether urgency is present.
        3. Whether outrage or anger is present.
        4. Whether sensational language is present.
        5. Emotional intensity from 0.0 to 1.0.
        6. Provide a short explanation.

        Definitions:

        Fear-based language:
        Language intended to create fear,
        panic, insecurity, or anxiety.

        Urgency:
        Language encouraging immediate action
        or creating pressure.

        Outrage and anger:
        Language intended to provoke anger,
        hostility, or emotional reaction.

        Sensationalism:
        Exaggerated, shocking, dramatic,
        or attention-grabbing language.

        Detected Entities:
        {context["entities"]}

        Detected Keywords:
        {context["keywords"]}

        Transformer Emotion Scores:
        {emotion_scores}
        Do not include markdown, code blocks, explanations, or additional text outside the JSON object.
        Return ONLY valid JSON:

        {{
            "fear_detected": false,
            "urgency_detected": false,
            "outrage_detected": false,
            "sensationalism_detected": false,
            "emotion_intensity": 0.0,
            "explanation": "Short explanation."
        }}

        Text:
        {text}
        """

    return prompt


def get_emotion_from_model(text: str) -> str:

    prompt = create_emotion_prompt(text)

    return generate_response(prompt)


def parse_model_response(response: str) -> Dict[str, Any]:
   

    try:

        response = response.strip()

        if response.startswith("```"):
            response = (
                response
                .replace("```json", "")
                .replace("```", "")
                .strip()
            )

        return json.loads(response)

    except (
        json.JSONDecodeError,
        TypeError
    ):

        return {
            "fear_detected": False,
            "urgency_detected": False,
            "outrage_detected": False,
            "sensationalism_detected": False,
            "emotion_intensity": 0.0,
            "explanation":
                "Could not parse model response."
        }


def analyze_emotion(text: str) -> Dict[str, Any]:
   
    if not text or not text.strip():

        return {
            "fear_detected": False,
            "urgency_detected": False,
            "outrage_detected": False,
            "sensationalism_detected": False,
            "emotion_intensity": 0.0,
            "explanation": "Empty input text."
        }

    raw_response = get_emotion_from_model(text)

    return parse_model_response(raw_response)


if __name__ == "__main__":

    sample_text = """
    BREAKING! Act NOW before it is too late.
    Experts warn that the country faces a major threat.
    """

    print(
        analyze_emotion(sample_text)
    )