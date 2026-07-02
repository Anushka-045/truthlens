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


class BiasResult(BaseModel):
    bias_score: float
    bias_label: str
    explanation: str


class EmotionResult(BaseModel):
    dominant_emotion: str
    confidence: float


class PerspectiveResult(BaseModel):
    perspective: str
    confidence: float
    explanation: str


class ParsedArticle(BaseModel):
    title: str
    author: str
    published_date: str
    content: str



class VerificationResponse(BaseModel):

    # Parsed article
    parsed_article: ParsedArticle

    # Analysis
    bias_analysis: BiasResult
    emotion_analysis: EmotionResult
    perspective_analysis: PerspectiveResult

    # Verification
    claims: List[ClaimResult]
    source: SourceResult
    url_analysis: URLResult
    trust: TrustResult

    # Suggestions
    recommendations: List[str]