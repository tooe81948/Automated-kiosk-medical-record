from settingmodel import YesNo_model,Classification_serve,the68class
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

Model_preYN = YesNo_model()
service_user_first = Classification_serve()
Classification_dialog = the68class()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,allow_origins=['*'],allow_credentials=True,allow_methods=["*"],allow_headers=["*"],
)

@app.get('/')
def index():
    return {'message': 'Model connected successfully.'}

@app.get('/predict_YesNo_model')
def predict(text: str):
    return {'text': text, 'Predict_model': Model_preYN.predict_YesNo(text)}

@app.get('/predict_Classification_serve')
def predict(text: str):
    return {'text': text, 'Predict_model': service_user_first.predict_serve(text)}    

@app.get('/Classification_dialog')
def predict(text: str):
    return {'text': text, 'Predict_model': Classification_dialog.predict_the68class(text)}    

@app.get('/predict_QuestionsAnswers')
def predict(text: str):
    return {'text': text, 'Predict_model': service_user_first.predict_serve(text)}        

if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=18000)







    