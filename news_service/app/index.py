from fastapi import FastAPI, Path
from typing import Optional
from pydantic import BaseModel
from db import news_db
from routers import news
import sys
import pathlib


cwd = pathlib.Path(__file__).parent
sys.path.append(str(cwd))

class Student(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = 0
    year: Optional[int] = 0

app = FastAPI()

db =  news_db.NewsDb()

app.include_router(news.router)




