import re
from bs4 import BeautifulSoup
import spacy
from collections import Counter
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    raise OSError("spaCy model not found. Run: python -m spacy download en_core_web_sm")
def remove_html(text: str )-> str:
    """Removes HTML tags from text"""
    soup = BeautifulSoup(text, "html.parser")
    return soup.get_text(separator=" ")
def clean_text(text: str) -> str:
    """Cleans and noramlizes text."""
    text = remove_html(text)
    text = text.strip()
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r"([.!?])\1+", r"\1", text)
    return text
def extract_links(text: str)-> list:
    """Extract URLs from text."""
    pattern = r"https?://\S+"
    return re.findall(pattern, text)
def extract_keywords(text: str, top_n: int =10) ->list:
    """Returns impotant keywords"""
    doc = nlp(text)
    words =[]
    for token in doc:
        if ( token.is_stop or token.is_punct or token.is_space):
            continue
        if len(token.text) <=2:
            continue
        words.append(token.lemma_.lower())
    frequency= Counter(words)
    keywords = frequency.most_common(top_n)
    return [ word for word, count in keywords]
def get_word_count(text:str)-> int:
    return len(text.split())
def get_sentence_count(text:str)-> int:
     sentences = re.split(r"[.!?]+", text)
     sentences = [sentence for sentence in sentences if sentence.strip()]
     return len(sentences)
def parse_text(text: str) -> dict:
    """Main preprocessing function."""

    cleaned_text = clean_text(text)

    return {
        "clean_text": cleaned_text,
        "keywords": extract_keywords(cleaned_text),
        "links": extract_links(cleaned_text),
        "word_count": get_word_count(cleaned_text),
        "sentence_count": get_sentence_count(cleaned_text)
    }
    
