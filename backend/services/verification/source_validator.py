import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(PROJECT_ROOT))

import json
import requests

from bs4 import BeautifulSoup
from backend.ai.sarvam_client import generate_response


def get_page_details(url: str):
    """
    Fetch webpage details.
    """

    try:

        response = requests.get(url, timeout=10)

        soup = BeautifulSoup(response.text, "html.parser")

        title = soup.title.string.strip() if soup.title else "Unknown"

        domain = requests.utils.urlparse(url).netloc

        return {
            "title": title,
            "domain": domain,
            "status": response.status_code
        }

    except Exception:

        return {
            "title": "Unknown",
            "domain": "",
            "status": 0
        }


def create_source_prompt(source):

    prompt = f"""
You are an expert source credibility analyst.

Analyze the following website.

Title:
{source["title"]}

Domain:
{source["domain"]}

Status Code:
{source["status"]}

Return ONLY valid JSON.

{{
    "credibility_score":85,
    "reliability":"High",
    "reason":"Short explanation."
}}
"""

    return prompt


def get_source_analysis(url):

    source = get_page_details(url)

    prompt = create_source_prompt(source)

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
            "credibility_score": 0,
            "reliability": "Unknown",
            "reason": "Unable to analyze source."
        }


def validate_source(url):

    raw = get_source_analysis(url)

    return parse_model_response(raw)


if __name__ == "__main__":

    sample = "https://www.bbc.com"

    print(validate_source(sample))