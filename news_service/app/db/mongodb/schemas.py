from datetime import datetime
import mongoengine
from .config import *

class News(mongoengine.Document):
    meta = {
        'db_alias': NEWS_DB,
        'collection': NEWS_COLLECTION
    }
    search_term = mongoengine.StringField(required = True)
    title = mongoengine.StringField(required = True)
    text = mongoengine.StringField()
    authors = mongoengine.StringField(required = True)
    source = mongoengine.StringField(required = True)
    url = mongoengine.StringField(required = True)
    date = mongoengine.DateTimeField(default = datetime.now())
    image_url = mongoengine.StringField(default = None)
    keywords = mongoengine.ListField()
    summary = mongoengine.StringField()
    sentiment = mongoengine.StringField()

    def parse(self) -> dict:
        return {
            'search_term': self.search_term,
            'title': self.title,
            'text': self.text,
            'authors': self.authors,
            'source': self.source,
            'url': self.url,
            'date': self.date,
            'image_url': self.image_url,
            'keywords': self.keywords,
            'summary': self.summary,
            'sentiment': self.sentiment,
        }


