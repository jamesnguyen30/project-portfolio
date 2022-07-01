from newsapi import NewsApiClient
import json
from dotenv import load_dotenv
import os
import pathlib
from datetime import datetime, timedelta

class NewsApiWrapper():
    def __init__(self):
        app = pathlib.Path(__file__).parent.parent.parent
        dotenv_path = os.path.join(app, 'dotenv')
        load_dotenv(dotenv_path)
        newsapi_key = os.environ.get("NEWS_API_KEY")

        self.output_dir = os.path.join(app, 'output')
        self.following_topic_path = os.path.join(app, 'following.txt')

        if os.path.exists(self.output_dir) == False:
            os.mkdir(self.output_dir)

        self.client = NewsApiClient(api_key = newsapi_key) 
    
    def fetch_top_headlines(self):
        news = self.client.get_top_headlines(category='business')

        now = datetime.now()

        filename = f"headlines_{now.year}_{now.month}_{now.day}_{now.hour}_{now.minute}.json"
        save_path = os.path.join(self.output_dir , filename)
        with open(save_path, 'w') as file:
            json.dump(news, file)
        
        return news

    def fetch_news_by_term(self, term):
        now = datetime.now()
        from_date = now - timedelta(days = 29)


        news = self.client.get_everything(
            q = term, 
            from_param = from_date.strftime('%Y-%m-%d'), 
            language='en', 
            sort_by= 'relevancy')


        filename = f"fetch_{term}_{now.year}_{now.month}_{now.day}_{now.hour}_{now.minute}_{now.second}.json"
        save_path = os.path.join(self.output_dir , filename)
        with open(save_path, 'w') as file:
            json.dump(news, file)
        
        return news
    def fetch_all_following_topics(self):
        following = []
        with open(self.following_topic_path, 'r') as file:
            for line in file.readlines():
                if line == '':
                    break
                following.append(line.strip())
        all_news = list()
        # for file in os.listdir(self.output_dir):
        #     print(file)
        #     path = os.path.join(self.output_dir, file)
        #     with open(path, 'r') as f:
        #         news = json.load(f)

        #     parts = file.split("_")
        #     all_news.append({'articles': news['articles'], 'term': parts[1]})


        for term in following:
            news = self.fetch_news_by_term(term)
            all_news.append({'articles': news['articles'], 'term': term})

        return all_news


if __name__ == '__main__':
    newsapi_wrapper = NewsApiWrapper()

    allnews = newsapi_wrapper.fetch_all_following_topics()

    print(len(allnews['articles']))

    # news = newsapi_wrapper.fetch_news_by_term('apple')



