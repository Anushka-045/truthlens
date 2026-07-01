import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(PROJECT_ROOT))

import json

from backend.ai.sarvam_client import generate_response


def create_recommendation_prompt(
    trust_score,
    fact_verdict,
    source_reliability,
    url_risk
):
    """
    Create prompt for Sarvam AI.
    """

    prompt = f"""
You are an expert fact-checking assistant.

Based on the following analysis, provide useful recommendations.

Trust Score:
{trust_score}

Fact Verification:
{fact_verdict}

Source Reliability:
{source_reliability}

URL Risk:
{url_risk}

Give recommendations that help the user verify the information.

Return ONLY valid JSON.

{{
    "recommendations":[
        "Recommendation 1",
        "Recommendation 2",
        "Recommendation 3"
    ]
}}
"""

    return prompt


def get_recommendations(
    trust_score,
    fact_verdict,
    source_reliability,
    url_risk
):
    """
    Send prompt to Sarvam AI.
    """

    prompt = create_recommendation_prompt(
        trust_score,
        fact_verdict,
        source_reliability,
        url_risk
    )

    return generate_response(prompt)


def parse_model_response(response):
    """
    Parse AI response.
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

    except Exception:

        return {
            "recommendations": [
                "Unable to generate recommendations."
            ]
        }


def generate_recommendations(
    trust_score,
    fact_verdict,
    source_reliability,
    url_risk
):
    """
    Main function.
    """

    raw = get_recommendations(
        trust_score,
        fact_verdict,
        source_reliability,
        url_risk
    )

    return parse_model_response(raw)


if __name__ == "__main__":

    print(
        generate_recommendations(
            trust_score=78,
            fact_verdict="Needs Verification",
            source_reliability="Medium",
            url_risk="Low"
        )
    )