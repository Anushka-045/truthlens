import json
from typing import Dict, Any
from ai.sarvam_client import generate_response
import spacy
from transformers import pipeline
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    raise OSError("spaCy model not found. Run: python -m spacy download en_core_web_sm")

sentiment_classifier = pipeline("sentiment-analysis",model="cardiffnlp/twitter-roberta-base-sentiment-latest")


def extract_context(text: str) -> Dict[str, list]:
    

    doc = nlp(text)

    entities = list(set(ent.text for ent in doc.ents))

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

        keywords.append(token.lemma_.lower())

    keywords = list(set(keywords))

    return {
        "entities": entities,
        "keywords": keywords
    }


def get_sentiment_signal(text: str) -> Dict[str, Any]:

    result = sentiment_classifier(text)[0]

    return {
        "label": result["label"],
        "score": round(
            result["score"],
            4
        )
    }


def create_bias_prompt(text: str) -> str:
    context = extract_context(text)

    sentiment = get_sentiment_signal(text)

    prompt = f"""
        You are an expert media bias analyst.

        Analyze the following content and determine:

        1. Whether political bias is present.
        2. Whether ideological bias is present.
        3. Whether reporting is balanced or one-sided.
        4. Bias intensity from 0.0 to 1.0.
        5. Provide a short explanation.

        Definitions:

        Political bias:
        Favoring or criticizing a political party,
        government, politician, or political viewpoint.

        Ideological bias:
        Favoring or criticizing a belief system,
        such as liberalism, conservatism,
        nationalism, socialism, or similar ideologies.

        Reporting style:
        Balanced = multiple viewpoints presented.

        One-sided = primarily one viewpoint presented.

        Bias intensity:
        0.0 = no noticeable bias.
        1.0 = extremely biased.

        Detected Entities:
        {context["entities"]}

        Detected Keywords:
        {context["keywords"]}

        Transformer Sentiment Signal:
        {sentiment}
        Do not include markdown, code blocks, explanations, or additional text outside the JSON object.
        Return ONLY valid JSON:

        {{
            "political_bias": false,
            "ideological_bias": false,
            "reporting_style": "Balanced",
            "bias_intensity": 0.0,
            "explanation": "Short explanation."
        }}

        Text:
        {text}
        """

    return prompt


def get_bias_from_model(text: str) -> str:

    prompt = create_bias_prompt(text)

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
            "political_bias": False,
            "ideological_bias": False,
            "reporting_style": "Unknown",
            "bias_intensity": 0.0,
            "explanation":
                "Could not parse model response."
        }


def analyze_bias(text: str) -> Dict[str, Any]:
    

    if not text or not text.strip():

        return {
            "political_bias": False,
            "ideological_bias": False,
            "reporting_style": "Unknown",
            "bias_intensity": 0.0,
            "explanation": "Empty input text."
        }

    raw_response = get_bias_from_model(text)

    return parse_model_response(raw_response)


if __name__ == "__main__":

    sample_text = """
    The government has completely failed and only
    one political party can save the country.
    """

    print(analyze_bias(sample_text))