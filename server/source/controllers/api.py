from flask import Blueprint
from flask import jsonify
from flask import request

from ..database.mapper import mapper

requests_controller = Blueprint("requests_controller", __name__)

######################################################
###                   PARAMETERS                   ###
######################################################

@requests_controller.route('/api/markers/get', methods=["POST", "GET"])
def api_markers_get():
    return jsonify(mapper.markers.get_all())

@requests_controller.route('/api/parameters/get', methods=["POST", "GET"])
def api_parameters_get():
    return jsonify(mapper.parameters.get_all())

@requests_controller.route('/haha')
def haha():
    return 'hahahahah'

@requests_controller.route('/api/get_by_marker_id')
def api_get_by_marker_id():
    marker_id = request.args.get('marker_id')
    return jsonify(mapper.records.get_by_marker_id(marker_id))

@requests_controller.route('/api/get_one_param', methods=["POST", "GET"])
def api_get_one_param():
    #print('headers: ', str(request.headers))
    #print('data: ', str(request.data))
    query = request.get_json()
    #print(query)
    return jsonify(mapper.records.get_one_param(query))

@requests_controller.route('/api/get_by_params', methods=["POST", "GET"])
def api_get_by_params():
    #print('headers: ', str(request.headers))
    #print('data: ', str(request.data))
    query = request.get_json()
    #print(query)
    return jsonify(mapper.records.get_by_parameters(query))

"""
test = {
    "params" : [
        { "1b" : "0" },
        { "1a" : "1" },
        { "1c" : "1" },
        { "1d" : "ND" },
        { "1e" : "0?" }
    ],
    "params_options" : ">2",
    "res_type" : "markers"
}
"""
