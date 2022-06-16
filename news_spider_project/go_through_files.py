import os
import pandas as pd
import pathlib

cwd = pathlib.Path(__file__).parent
root_dir = '/home/nguyen/Desktop/project-portfolio/news_spider_project/src/service/news_spider/news_spider/spiders/output/dataset'

data = dict()

def merge_news_csv(self, root_dir):

    output_file = 'all_news.csv'

    output_dir = os.path.join(cwd, 'output')
    try:
        os.mkdir(output_dir)
    except Exception as e:
        print(str(e)) 

    merged:pd.DataFrame = None
    
    for subdirs, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.csv'):
                df = pd.read_csv(os.path.join(subdirs, file))
                if merged is not None:
                    merged = pd.concat([merged, df], ignore_index=True)
                else:
                    merged = df

    merged = merged.dropna(subset=['text'])  

    if merged is not None: 
        merged.to_csv(os.path.join(output_dir, output_file))
    