from http.client import HTTP_PORT
from inspect import trace
from fastapi import APIRouter, HTTPException, Depends
from numpy import minimum
# from ..dependencies import get_token_header
from .model import NewsModel
from typing import Optional
from db import news_db
from db.mongodb.schemas import News
from utils import response
from datetime import datetime, timedelta
from service.newsapi import main as newsapi
import traceback
import json
from datetime import datetime, timezone

# ONLY ADMIN CAN ACCESSS THESE ROUTES

router = APIRouter(
    prefix='/cmd',
    tags = ['cmd']
)

news_client = newsapi.NewsApiWrapper()
db = news_db.NewsDb()

@router.get("/fetch_headlines")
def fetch_headlines():
    try:
        headlines = news_client.fetch_top_headlines()
        # headlines_path = '/home/nguyen/Desktop/project-portfolio/news_service/app/output/headlines_2022_6_21_12_57.json'

        # headlines = newsapi_wrapper.fetch_top_headlines()
        # with open(headlines_path, 'r') as file:
        #     headlines = json.load(file)
        
        # with open(news_path, 'r') as file:
        #     news = json.load(file)

        for headline in headlines['articles']:
            date = datetime.strptime(headline['publishedAt'], "%Y-%m-%dT%H:%M:%SZ")
            date.replace(tzinfo=timezone.utc)

            # Ignore youtube
            if headline['source']['name'] == 'YouTube':
                continue
            
            # Remove the source after - symbol in title
            title = headline['title']
            for i in range(len(title) - 1, 0, -1):
                if title[i] == '-':
                    title = title[:i]
                    break

            db.save(
                'headlines', 
                title,
                None,
                headline['author'] if headline['author']!=None else headline['source']['name'],
                headline['source']['name'],
                headline['url'],
                headline['urlToImage'],
                date,
                None, None, None
            )
            print(f'Saved {title} to db') 
        return response.generate_body(200, message = 'saved headlines')

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail = 'internal server error, check log')

@router.get("/fetch_news")
def fetch_news():
    try:
        # with open()
        # news_client.fetch_news_by_term()
        # news_path = '/home/nguyen/Desktop/project-portfolio/news_service/app/output/fetch_2022_6_21_12_57_apple.json'
        all_news = news_client.fetch_all_following_topics()

        # with open(news_path, 'r') as file:
        #     all_news = json.load(file)

        for news_object in all_news:

            news = news_object['articles']
            term = news_object['term']
            for article in news:

                date = datetime.strptime(article['publishedAt'], "%Y-%m-%dT%H:%M:%SZ")
                date.replace(tzinfo=timezone.utc)

                # Ignore youtube
                if article['source']['name'] == 'YouTube':
                    continue
                
                # Remove the source after - symbol in title
                title = article['title']
                for i in range(len(title) - 1, 0, -1):
                    if title[i] == '-':
                        title = title[:i]
                        break

                db.save(
                    term, 
                    title,
                    None,
                    article['author'] if article['author']!=None else article['source']['name'],
                    article['source']['name'],
                    article['url'],
                    article['urlToImage'],
                    date, None, None, None
                )
                print(f'Saved {title} to db') 
        return response.generate_body(200, message = 'saved headlines')

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail = 'internal server error, check log')
