import json
from typing import  Dict,Any
def create_bias_prompt(text: str)-> str:
    prompt = f"""
        You are an expert media bias analyst.

        Analyze the following text and determine:

        1. Whether political bias is present.
        2. Whether ideological bias is present.
        3. Whether reporting is balanced or one-sided.
        4. Bias intensity on a scale from 0.0 to 1.0.
        5. A short explanation.
        Definitions:

        Political bias:
        Favoring or criticizing a political party,
        government, politician, or political viewpoint.

        Ideological bias:
        Favoring or criticizing a belief system,
        such as liberalism, conservatism,
        nationalism, socialism, or any other idea.

        Reporting style:
        Balanced = multiple viewpoints presented.
        One-sided = mainly one viewpoint presented.

        Bias intensity:
        0.0 means no noticeable bias.
        1.0 means extremely biased.

        Return ONLY valid JSON in this format:

        {{
            "political_bias": true,
            "ideological_bias": false,
            "reporting_style": "Balanced",
            "bias_intensity": 0.35,
            "explanation": "Short explanation."
        }}

        Text:
        {text}
        """

    return prompt
def get_bias_from_model(text: str) -> str:
    """
    Sends prompt to Sarvam AI and returns raw response.
    """

    prompt = create_bias_prompt(text)

    # TODO:
    # Replace with actual Sarvam API call

    raise NotImplementedError(
        "Sarvam AI integration pending."
    )
def parse_model_response(response: str) -> Dict[str, Any]:
    """
    Converts model response into dictionary.
    """

    try:
        return json.loads(response)

    except (json.JSONDecodeError,TypeError):
        return {
            "political_bias": False,
            "ideological_bias": False,
            "reporting_style": "Unknown",
            "bias_intensity": 0.0,
            "explanation":
                "Could not parse model response."
        }
def analyze_bias(text: str) -> Dict[str, Any]:
    """
    Main bias analysis function.
    """

    if not text or not text.strip():
        return {
            "political_bias": False,
            "ideological_bias": False,
            "reporting_style": "Unknown",
            "bias_intensity": 0.0,
            "explanation": "Empty input text."
        }

    raw_response = get_bias_from_model(text)

    return parse_model_response(raw_response)
