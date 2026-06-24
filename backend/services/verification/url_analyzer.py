import validators
from urllib.parse import urlparse


SHORTENERS = [
    "bit.ly",
    "tinyurl.com",
    "t.co",
    "goo.gl"
]


def analyze_url(url):

    if not validators.url(url):
        return {
            "valid": False,
            "risk": "Invalid URL"
        }

    domain = urlparse(url).netloc

    shortened = any(site in domain for site in SHORTENERS)

    risk = "Low"

    if shortened:
        risk = "Medium"

    if "@" in url:
        risk = "High"

    return {
        "valid": True,
        "domain": domain,
        "shortened": shortened,
        "risk": risk
    }