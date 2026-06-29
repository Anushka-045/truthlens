"""
Project-wide constants
"""

# -------------------------
# Trust Score Weights
# -------------------------

FACT_WEIGHT = 0.50
SOURCE_WEIGHT = 0.30
URL_WEIGHT = 0.20


# -------------------------
# Trust Levels
# -------------------------

HIGH_TRUST = 80

MEDIUM_TRUST = 60

LOW_TRUST = 0


# -------------------------
# Default Scores
# -------------------------

DEFAULT_FACT_SCORE = 50

DEFAULT_SOURCE_SCORE = 50


# -------------------------
# URL Risk Scores
# -------------------------

URL_SCORE = {
    "Low": 100,
    "Medium": 70,
    "High": 30
}


# -------------------------
# Trusted Domains
# -------------------------

TRUSTED_DOMAINS = [

    "bbc.com",

    "reuters.com",

    "who.int",

    "gov.in",

    "wikipedia.org",

    "un.org",

    "nature.com",

    "sciencedirect.com"
]


# -------------------------
# URL Shorteners
# -------------------------

SHORTENED_DOMAINS = [

    "bit.ly",

    "tinyurl.com",

    "t.co",

    "goo.gl",

    "ow.ly"
]


# -------------------------
# Opinion Words
# Used by claim extractor
# -------------------------

OPINION_WORDS = [

    "think",

    "believe",

    "feel",

    "love",

    "hate",

    "good",

    "bad",

    "best",

    "worst",

    "awesome",

    "terrible",

    "beautiful",

    "excellent",

    "poor"
]