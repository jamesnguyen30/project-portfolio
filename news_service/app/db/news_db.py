from .mongodb.schemas import News
from .mongodb import config
from mongoengine import connect, disconnect
from datetime import datetime 
import pandas as pd
import pathlib

CWD = pathlib.Path(__file__).parent.absolute()

class NewsDb():
    def __init__(self):
        self.init_db(config.NEWS_DB, config.NEWS_COLLECTION)

    def init_db(self, alias, name):
        connect(alias = alias, name = name)

    def save(self, 
        search_term: str,  title: str, text: str, 
        authors: list, source: str, url: str, 
        image_url: str, date: datetime, keywords: list, 
        summary: str, sentiment: str ) -> bool: 

        to_save = News()
        to_save.date = date 

        if self.get_by_url(url):
            return False

        to_save.search_term = search_term 
        to_save.title = title 
        to_save.text =  text 
        to_save.authors = authors
        to_save.source = source
        to_save.url = url
        to_save.image_url = image_url
        to_save.keywords = keywords
        to_save.summary = summary
        to_save.sentiment = sentiment

        to_save.save()

        return True
    
    def get_all_news(self) -> list:
        return News.objects().all()
    
    def get_by_id(self, id: str) -> News:
        news = News.objects(id = id).first()
        return news
    
    def get_by_title(self, title) -> News:
        news = News.objects(title = title).first()
        return news
    
    def get_by_url(self, url) -> News:
        news = News.objects(url = url).first()
        return news

    def delete(self, obj):
        obj.delete()
    
    def produce_csv(self):
        all_news = News.objects()
        news_list = list()

        for news in all_news:
            print(news.title)
            news_list.append([news.title, news.date, news.text, news.authors, news.source, news.url, news.image_url])

        df = pd.DataFrame(news_list, columns = ['title', 'date', 'text', 'authors', 'source', 'url', 'image_url'])

        return df 
    def get_today_headlines(self):
        '''
        get today headlines
        '''
        start_date = datetime.now().replace(hour = 0, minute = 0, second = 0, microsecond=0)
        end_date = datetime.now().replace(hour = 23, minute = 59, second = 59)

        headlines = News.objects(search_term = 'headlines').limit(20)
        # .filter(date__gte=start_date, date__lte = end_date)
        return headlines

    def get_by_search_term(self, search_term):
        '''
        get all the news by search term
        @params
            string search_term
        @return
            list 
        '''
        news = News.objects(search_term = search_term).all()
        return news

    def close(self):
        disconnect()

