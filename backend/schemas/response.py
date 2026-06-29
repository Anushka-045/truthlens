from pydantic import BaseModel
from typing import List


class ClaimResult(BaseModel):
    claim: str
    confidence: float
    verdict: str


class SourceResult(BaseModel):
    url: str
    credibility_score: float


class URLResult(BaseModel):
    domain: str
    risk: str


class TrustResult(BaseModel):
    trust_score: float
    trust_level: str
    summary: str


class VerificationResponse(BaseModel):

    claims: List[ClaimResult]

    source: SourceResult

    url_analysis: URLResult

    trust: TrustResult

    recommendations: List[str]