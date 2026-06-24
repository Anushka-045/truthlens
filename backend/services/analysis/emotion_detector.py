import json
from typing import Dict,Any
def create_emotion_prompt(text : str)-> str:
    prompt = f"""
        You are an expert media manipulation analyst.

        Analyze the following text and determine:

        1. Whether fear-based language is present.
        2. Whether urgency is present.
        3. Whether outrage or anger is present.
        4. Whether sensational language is present.
        5. Emotional intensity from 0.0 to 1.0.
        6. Short explanation.

        Definitions:

        Fear-based language:
        Language designed to create fear, anxiety, panic, or insecurity.

        Urgency:
        Language encouraging immediate action or creating pressure.

        Outrage and anger:
        Language intended to provoke anger, hostility, or strong emotional reactions.

        Sensationalism:
        Exaggerated, shocking, dramatic, or attention-grabbing language.

        Emotional intensity:
        0.0 = emotionally neutral.
        1.0 = extremely emotionally manipulative.

        Return ONLY valid JSON:

        {{
            "fear_detected": false,
            "urgency_detected": false,
            "outrage_detected": false,
            "sensationalism_detected": false,
            "emotion_intensity": 0.0,
            "explanation": "Short explanation."
        }}

        Text:
        {text}
        """
    return prompt
def get_emotion_from_model(text: str) -> str:

    prompt = create_emotion_prompt(text)

    # TODO:
    # Replace with Sarvam AI API call

    return json.dumps({
        "fear_detected": False,
        "urgency_detected": False,
        "outrage_detected": False,
        "sensationalism_detected": False,
        "emotion_intensity": 0.0,
        "explanation": "Sarvam AI integration pending."
    })
def parse_model_response(response: str) -> Dict[str, Any]:

    try:
        return json.loads(response)

    except (json.JSONDecodeError, TypeError):

        return {
            "fear_detected": False,
            "urgency_detected": False,
            "outrage_detected": False,
            "sensationalism_detected": False,
            "emotion_intensity": 0.0,
            "explanation": "Could not parse model response."
        }
def analyze_emotion(text: str) -> Dict[str, Any]:

    if not text or not text.strip():

        return {
            "fear_detected": False,
            "urgency_detected": False,
            "outrage_detected": False,
            "sensationalism_detected": False,
            "emotion_intensity": 0.0,
            "explanation": "Empty input text."
        }

    raw_response = get_emotion_from_model(text)

    return parse_model_response(raw_response)