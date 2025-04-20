from fastapi import FastAPI
from pydantic import BaseModel

api=FastAPI()

class Query(BaseModel):
    query:str

@api.post("/analyze")
def analyze(data:Query):
    print(data.query)
    return {
        "message":"Recieved",
        "query":data.query
    }
