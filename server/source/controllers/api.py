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

#new
@requests_controller.route('/api/markers/get_all_langs', methods=["POST", "GET"])
def api_markers_get_langs():
    return jsonify(mapper.markers.get_all_langs())

#new
@requests_controller.route('/api/markers/get_all_markers_by_lang', methods=["POST", "GET"])
def api_markers_get_by_langs():
    return jsonify(mapper.markers.get_all_markers_by_lang())   

@requests_controller.route('/api/parameters/get', methods=["POST", "GET"])
def api_parameters_get():
    return jsonify(mapper.parameters.get_all())

@requests_controller.route('/api/get_by_marker_id')
def api_get_by_marker_id():
    marker_id = request.args.get('marker_id')
    return jsonify(mapper.records.get_by_marker_id(marker_id))

@requests_controller.route('/api/get_by_params', methods=["POST", "GET"])
def api_get_by_params():
    query = request.get_json()
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
    "res_type" : "markers",
    "langs": [языки по которым поиск]
}
"""
