from urllib.parse import urlparse


def extract_domain(url):
    """
    Extract domain from URL.
    """

    return urlparse(url).netloc


def normalize_text(text):
    """
    Remove unnecessary spaces.
    """

    return " ".join(text.split())


def round_score(score):
    """
    Round scores to 2 decimal places.
    """

    return round(score, 2)


def get_trust_level(score):
    """
    Convert trust score into label.
    """

    if score >= 80:
        return "Highly Trustworthy"

    elif score >= 60:
        return "Moderately Trustworthy"

    return "Low Trust"


def is_trusted_domain(domain, trusted_domains):
    """
    Check whether the domain is trusted.
    """

    return domain.lower() in trusted_domains


def contains_opinion(sentence, opinion_words):
    """
    Detect opinion-based sentences.
    """

    sentence = sentence.lower()

    return any(word in sentence for word in opinion_words)