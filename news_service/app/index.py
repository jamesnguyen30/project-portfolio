from fastapi import FastAPI, Query 
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

@app.get('/')
def health_check():
    return {'message': 'healthy'}

# @app.get("/test_query")
# def test_query(q: str = Query(default = 'anything', min_length=50, max_length=100, regex = '^whatever')):
#     #process
# NOTE: when set  Query(default = ...) --> means that the query value is required



