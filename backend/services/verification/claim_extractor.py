import sys
from pathlib import Path

# Add the project root (truthlens) to Python's import path
PROJECT_ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(PROJECT_ROOT))

import json
from typing import Dict, Any

import spacy
from backend.ai.sarvam_client import generate_response

try:
    nlp = spacy.load("en_core_web_sm")

except OSError:
    raise OSError(
        "spaCy model not found. Run: python -m spacy download en_core_web_sm"
    )


OPINION_WORDS = [
    "think",
    "believe",
    "feel",
    "love",
    "hate",
    "best",
    "worst",
    "good",
    "bad",
    "amazing",
    "terrible"
]


def is_opinion(sentence: str) -> bool:
    """
    Detect obvious opinion sentences.
    """

    sentence = sentence.lower()

    return any(word in sentence for word in OPINION_WORDS)


def preprocess_text(text: str):
    """
    Split text into sentences and remove obvious opinions.
    """

    doc = nlp(text)

    sentences = []

    for sent in doc.sents:

        sentence = sent.text.strip()

        if len(sentence) < 5:
            continue

        if is_opinion(sentence):
            continue

        sentences.append(sentence)

    return sentences


def create_claim_prompt(text: str) -> str:
    """
    Create prompt for Sarvam AI.
    """

    sentences = preprocess_text(text)

    prompt = f"""
You are an expert fact-checking assistant.

Your task is to identify ONLY factual claims.

Rules:

1. Ignore opinions.
2. Ignore emotions.
3. Ignore personal beliefs.
4. Ignore questions.
5. Ignore predictions.
6. Return ONLY statements that can be verified using evidence.

Return ONLY valid JSON.

Example:

{{
    "claims":[
        {{
            "id":1,
            "claim":"India became independent in 1947."
        }}
    ]
}}

Sentences:

{sentences}
"""

    return prompt


def get_claims_from_model(text: str) -> str:
    """
    Send prompt to Sarvam AI.
    """

    prompt = create_claim_prompt(text)

    return generate_response(prompt)


def parse_model_response(response: str) -> Dict[str, Any]:
    """
    Parse JSON response from Sarvam AI.
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

    except (json.JSONDecodeError, TypeError):

        return {
            "claims": []
        }


def extract_claims(text: str) -> Dict[str, Any]:
    """
    Main function.
    """

    if not text or not text.strip():

        return {
            "claims": []
        }

    raw_response = get_claims_from_model(text)

    return parse_model_response(raw_response)


if __name__ == "__main__":

    sample_text = """
    India became independent in 1947.

    I think India is the best country.

    Water boils at 100 degrees Celsius.

    I love pizza.
    """

    print(extract_claims(sample_text))