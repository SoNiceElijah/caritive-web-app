from flask import Blueprint
from flask import jsonify

from ..database.mapper import mapper

requests_controller = Blueprint("requests_controller", __name__)

######################################################
###                   PARAMETERS                   ###
######################################################

@requests_controller.route('/api/parameters/get', methods=["POST", "GET"])
def api_parameters_get():
    return jsonify(mapper.parameters.get_all())

"""
test = {
    "params" : [
        { "1b" : 0 },
        { "1a" : 1 },
        { "1c" : 1 },
        { "1d" : 'ND' },
        { "1e" : '0?' },
    ],
    "params_options" : '>2',
    "res_type" : 'markers'
}
"""
