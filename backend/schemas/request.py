from pydantic import BaseModel, HttpUrl
from typing import Optional


class VerificationRequest(BaseModel):
    """
    Request received from frontend.
    """

    text: str
    url: Optional[HttpUrl] = None