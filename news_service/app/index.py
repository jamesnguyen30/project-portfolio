from fastapi import FastAPI, Query 
from typing import Optional
from pydantic import BaseModel
from db import news_db
from routers import news, command
import sys
import pathlib
import uvicorn
import os
from dotenv import load_dotenv

cwd = pathlib.Path(__file__).parent
sys.path.append(str(cwd))
path = os.path.join(cwd, 'secrets', '.env')
load_dotenv(dotenv_path = path)
PORT = int(os.getenv("PORT"))

app = FastAPI()

db =  news_db.NewsDb()

app.include_router(news.router)
app.include_router(command.router)

@app.get('/')
def health_check():
    return {'message': 'healthy'}

if __name__ == '__main__':
    uvicorn.run("index:app", host = 'localhost', port = PORT, reload = True)


