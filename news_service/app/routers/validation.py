from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class NewsModel(BaseModel):
    search_term: str 
    date: datetime
    title: str
    text: str 
    authors: list
    source: str
    url: str
    image_url: str