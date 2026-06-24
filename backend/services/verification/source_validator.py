import requests
from bs4 import BeautifulSoup


TRUSTED_DOMAINS = [
    "wikipedia.org",
    "bbc.com",
    "reuters.com",
    "who.int",
    "gov.in"
]


def validate_source(url):

    score = 40

    for domain in TRUSTED_DOMAINS:
        if domain in url:
            score = 95

    try:
        response = requests.get(url, timeout=5)

        soup = BeautifulSoup(response.text, "html.parser")

        title = soup.title.string if soup.title else "No Title"

    except Exception:
        title = "Unavailable"

    return {
        "url": url,
        "title": title,
        "credibility_score": score
    }