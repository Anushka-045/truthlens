from random import randint


def check_claims(claims):

    results = []

    for item in claims:

        score = randint(60, 100)

        if score >= 85:
            verdict = "Likely True"
        elif score >= 70:
            verdict = "Needs Verification"
        else:
            verdict = "Unsupported"

        results.append({
            "claim": item["claim"],
            "confidence": score,
            "verdict": verdict
        })

    return results