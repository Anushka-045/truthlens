import spacy

nlp = spacy.load("en_core_web_sm")

OPINION_WORDS = [
    "think", "believe", "feel", "love",
    "hate", "best", "worst", "good",
    "bad", "amazing", "terrible"
]


def is_opinion(sentence):
    sentence = sentence.lower()
    return any(word in sentence for word in OPINION_WORDS)


def extract_claims(text):

    doc = nlp(text)

    claims = []

    claim_id = 1

    for sent in doc.sents:

        sentence = sent.text.strip()

        if len(sentence) < 5:
            continue

        if is_opinion(sentence):
            continue

        claims.append({
            "id": claim_id,
            "claim": sentence
        })

        claim_id += 1

    return claims