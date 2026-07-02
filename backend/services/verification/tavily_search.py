from tavily import TavilyClient
import os

client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))


def search_claim(claim: str):
    response = client.search(
        query=claim,
        search_depth="advanced",
        max_results=5,
        include_answer=True,
        include_raw_content=False
    )

    return response