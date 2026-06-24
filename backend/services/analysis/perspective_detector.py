import json
from typing import Dict, Any
import spacy
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    raise OSError(
        "spaCy model not found. Run: python -m spacy download en_core_web_sm"
    )


def extract_context(text: str) -> Dict[str, list]:
    """
    Extract entities and important keywords
    to provide additional context to the AI model.
    """

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


def create_perspective_prompt(text: str) -> str:
    """
    Builds prompt for perspective analysis.
    """

    context = extract_context(text)

    prompt = f"""
You are an expert media analysis assistant.

Analyze the following content and determine:

1. Whether expert opinions are missing.
2. Whether opposing viewpoints are missing.
3. Whether stakeholder perspectives are missing.
4. Suggest additional perspectives that should be considered.
5. Provide a short explanation.

Definitions:

Missing expert opinions:
The content does not include insights from qualified experts.

Missing opposing viewpoints:
The content presents one side but omits reasonable alternative viewpoints.

Missing stakeholder perspectives:
The content ignores groups affected by the topic.

Detected Entities:
{context["entities"]}

Detected Keywords:
{context["keywords"]}

Return ONLY valid JSON:

{{
    "missing_expert_opinions": false,
    "missing_opposing_viewpoints": false,
    "missing_stakeholder_perspectives": false,
    "additional_perspectives": [
        "Perspective 1",
        "Perspective 2"
    ],
    "explanation": "Short explanation."
}}

Text:
{text}
"""

    return prompt


def get_perspective_from_model(text: str) -> str:
    """
    Sends prompt to Sarvam AI.
    Currently returns placeholder response.
    """

    prompt = create_perspective_prompt(text)

    # TODO:
    # Replace with actual Sarvam AI API call

    return json.dumps(
        {
            "missing_expert_opinions": False,
            "missing_opposing_viewpoints": False,
            "missing_stakeholder_perspectives": False,
            "additional_perspectives": [],
            "explanation": "Sarvam AI integration pending."
        }
    )


def parse_model_response(
    response: str
) -> Dict[str, Any]:
    """
    Parses model response safely.
    """

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
            "missing_expert_opinions": False,
            "missing_opposing_viewpoints": False,
            "missing_stakeholder_perspectives": False,
            "additional_perspectives": [],
            "explanation":
                "Could not parse model response."
        }


def analyze_perspectives(
    text: str
) -> Dict[str, Any]:
    """
    Main perspective analysis function.
    """

    if not text or not text.strip():

        return {
            "missing_expert_opinions": False,
            "missing_opposing_viewpoints": False,
            "missing_stakeholder_perspectives": False,
            "additional_perspectives": [],
            "explanation": "Empty input text."
        }

    raw_response = get_perspective_from_model(text)

    return parse_model_response(raw_response)


if __name__ == "__main__":

    sample_text = """
    The government announced a new tax policy.
    Officials claim it will improve economic growth.
    """

    print(
        analyze_perspectives(sample_text)
    )