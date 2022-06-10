from typing import Optional
from pydantic import BaseModel

class NewsModel(BaseModel):
    search_term: str 
    date: int 
    title: str
    text: str 
    authors: list
    source: str
    url: str
    image_url: str
    summary: str
    keywords: list
    sentiment: str