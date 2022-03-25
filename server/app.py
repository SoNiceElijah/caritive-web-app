from flask import Flask
from controllers.requests import requests_controller

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!'

app.register_blueprint(requests_controller)
