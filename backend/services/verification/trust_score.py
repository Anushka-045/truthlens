def calculate_trust_score(fact_confidence, source_score, url_risk):
    """
    Calculate an overall trust score.
    """

    # Convert URL risk into numeric score
    if url_risk == "Low":
        url_score = 100
    elif url_risk == "Medium":
        url_score = 70
    else:
        url_score = 30

    # Weighted average
    trust_score = (
        fact_confidence * 0.5 +
        source_score * 0.3 +
        url_score * 0.2
    )

    trust_score = round(trust_score, 2)

    # Decide trust level
    if trust_score >= 80:
        level = "Highly Trustworthy"
    elif trust_score >= 60:
        level = "Moderately Trustworthy"
    else:
        level = "Low Trust"

    return {
        "trust_score": trust_score,
        "trust_level": level
    }