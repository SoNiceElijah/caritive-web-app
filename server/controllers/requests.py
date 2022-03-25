from flask import Blueprint

requests_controller = Blueprint("requests_controller", __name__)

@requests_controller.route('/request')
def index():
    return "smth"
