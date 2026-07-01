import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(PROJECT_ROOT))

import json
import validators
import requests

from urllib.parse import urlparse
from backend.ai.sarvam_client import generate_response


SHORTENED_DOMAINS = [
    "bit.ly",
    "tinyurl.com",
    "goo.gl",
    "t.co",
    "ow.ly",
    "is.gd",
    "buff.ly",
    "rebrand.ly"
]


def analyze_url_info(url):
    """
    Analyze URL locally.
    """

    if not validators.url(url):

        return {
            "valid": False,
            "domain": "",
            "https": False,
            "shortened": False
        }

    parsed = urlparse(url)

    domain = parsed.netloc.lower()

    shortened = any(short in domain for short in SHORTENED_DOMAINS)

    https = parsed.scheme == "https"

    return {
        "valid": True,
        "domain": domain,
        "https": https,
        "shortened": shortened
    }


def create_url_prompt(info):

    prompt = f"""
You are an expert cybersecurity analyst.

Analyze the following URL information.

Domain:
{info["domain"]}

HTTPS:
{info["https"]}

Shortened URL:
{info["shortened"]}

Determine:

1. Scam risk (0-100)
2. Phishing likelihood
3. Whether the URL appears suspicious
4. Short explanation

Return ONLY valid JSON.

{{
    "risk_score":20,
    "phishing":false,
    "suspicious":false,
    "reason":"Short explanation."
}}
"""

    return prompt


def get_url_analysis(url):

    info = analyze_url_info(url)

    if not info["valid"]:

        return {
            "risk_score": 100,
            "phishing": True,
            "suspicious": True,
            "reason": "Invalid URL."
        }

    prompt = create_url_prompt(info)

    response = generate_response(prompt)

    return parse_model_response(response)


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
            "risk_score": 50,
            "phishing": False,
            "suspicious": True,
            "reason": "Unable to analyze URL."
        }


def analyze_url(url):

    return get_url_analysis(url)


if __name__ == "__main__":

    sample = "https://www.google.com"

    print(analyze_url(sample))