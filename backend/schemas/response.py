from pydantic import BaseModel
from typing import List


class ParsedArticle(BaseModel):
    clean_text: str
    keywords: List[str]
    links: List[str]
    word_count: int
    sentence_count: int




class BiasResult(BaseModel):
    political_bias: bool
    ideological_bias: bool
    reporting_style: str
    bias_intensity: float
    explanation: str


class EmotionResult(BaseModel):
    fear_detected: bool
    urgency_detected: bool
    outrage_detected: bool
    sensationalism_detected: bool
    emotion_intensity: float
    explanation: str


class PerspectiveResult(BaseModel):
    missing_expert_opinions: bool
    missing_opposing_viewpoints: bool
    missing_stakeholder_perspectives: bool
    additional_perspectives: List[str]
    explanation: str




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

    
    parsed_article: ParsedArticle

   
    bias_analysis: BiasResult
    emotion_analysis: EmotionResult
    perspective_analysis: PerspectiveResult

    
    claims: List[ClaimResult]
    source: SourceResult
    url_analysis: URLResult
    trust: TrustResult

    
    recommendations: List[str]