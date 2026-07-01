import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(PROJECT_ROOT))

import json

from backend.ai.sarvam_client import generate_response


def calculate_trust_score(
    fact_confidence: float,
    source_score: float,
    url_score: float
):
    """
    Calculate final trust score.
    """

    trust_score = (
        (fact_confidence * 0.5)
        + (source_score * 0.3)
        + ((100 - url_score) * 0.2)
    )

    return round(trust_score, 2)


def create_summary_prompt(
    trust_score,
    fact_confidence,
    source_score,
    url_score
):

    prompt = f"""
You are an AI assistant.

Generate a short trust summary.

Details:

Fact Confidence: {fact_confidence}

Source Credibility: {source_score}

URL Risk Score: {url_score}

Overall Trust Score: {trust_score}

Return ONLY valid JSON.

{{
    "summary":"Short explanation of why this trust score was given."
}}
"""

    return prompt


def get_summary(
    trust_score,
    fact_confidence,
    source_score,
    url_score
):

    prompt = create_summary_prompt(
        trust_score,
        fact_confidence,
        source_score,
        url_score
    )

    return generate_response(prompt)


def parse_model_response(response):

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

    except Exception:

        return {
            "summary": "Unable to generate summary."
        }


def generate_trust_report(
    fact_confidence,
    source_score,
    url_score
):

    trust_score = calculate_trust_score(
        fact_confidence,
        source_score,
        url_score
    )

    raw = get_summary(
        trust_score,
        fact_confidence,
        source_score,
        url_score
    )

    summary = parse_model_response(raw)

    return {
        "trust_score": trust_score,
        "summary": summary["summary"]
    }


if __name__ == "__main__":

    report = generate_trust_report(
        fact_confidence=92,
        source_score=85,
        url_score=10
    )

    print(report)