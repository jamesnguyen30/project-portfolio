from http.client import HTTP_PORT
from fastapi import APIRouter, HTTPException, Depends
# from ..dependencies import get_token_header
from .model import NewsModel
from typing import Optional
from db import news_db
from db.mongodb.schemas import News
from utils import response

db = news_db.NewsDb()

router = APIRouter(
    prefix = '/news',
    tags = ['news'],
    # dependencies=[Depends(get_token_header)],
    responses={404: {'description': 'Not Found'}}
)
    
@router.get('/all')
def get_all():
    try:
        all_news_objs = db.get_all_news()
        data = list()
        for news in all_news_objs:
            data.append(news.parse())
        return response.generate_body(200, data)
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code = 500, detail = 'internal server error, check log')

@router.get('/{id}')
async def get_by_id(id: str):
    try:
        data = db.get_by_id(id)
        if data == None:
            return response.generate_body(200, message = 'id not found')
        return response.generate_body(200, data.parse())
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code = 500, detail = 'internal server error, check log')

@router.post("/")
async def save_news(news: NewsModel):
    try:
        db.save(search_term = news.search_term, title = news.title, text = news.text, authors = news.authors, 
        source = news.source, url = news.url, image_url = news.image_url, date = news.date
        )
        return response.generate_body(200, message = 'saved')
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code = 500, detail = 'internal server error, check log')

@router.delete('/{id}')
async def delete_news(id: str):
    try:
        news = db.get_by_id(id)

        if news!= None:
            db.delete(news)
            return response.generate_body(200, message = 'deleted')
        else:
            return response.generate_body(200, message = 'id not found')

    except Exception as e:
        print(str(e))
        raise HTTPException(status_code = 500, detail = 'internal server error, check log')
    

    
