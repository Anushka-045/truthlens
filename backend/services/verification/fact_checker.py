import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(PROJECT_ROOT))

import json
from typing import Dict, Any, List

from backend.ai.sarvam_client import generate_response


def create_fact_check_prompt(claims: List[Dict]) -> str:
    """
    Create a prompt for Sarvam AI to verify claims.
    """

    claim_text = ""

    for item in claims:
        claim_text += f'{item["id"]}. {item["claim"]}\n'

    prompt = f"""
You are an expert fact-checking assistant.

Analyze each claim and provide:

1. Confidence score (0–100)
2. Verdict:
   - Likely True
   - Needs Verification
   - Unsupported
3. Short reason

Return ONLY valid JSON.

Example:

{{
    "results":[
        {{
            "claim":"India became independent in 1947.",
            "confidence":99,
            "verdict":"Likely True",
            "reason":"Widely accepted historical fact."
        }}
    ]
}}

Claims:

{claim_text}
"""

    return prompt


def get_fact_check_from_model(claims):
    """
    Send claims to Sarvam AI.
    """

    prompt = create_fact_check_prompt(claims)

    return generate_response(prompt)


def parse_model_response(response: str) -> Dict[str, Any]:
    """
    Parse Sarvam AI JSON response.
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
            "results": []
        }


def check_claims(claims):
    """
    Verify extracted claims.
    """

    if not claims:

        return {
            "results": []
        }

    raw_response = get_fact_check_from_model(claims)

    return parse_model_response(raw_response)


if __name__ == "__main__":

    sample_claims = [
        {
            "id": 1,
            "claim": "India became independent in 1947."
        },
        {
            "id": 2,
            "claim": "The Moon is made of cheese."
        }
    ]

    print(check_claims(sample_claims))