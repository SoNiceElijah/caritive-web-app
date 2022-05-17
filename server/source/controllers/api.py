from flask import Blueprint
from flask import jsonify
from flask import request

from ..database.mapper import mapper

requests_controller = Blueprint("requests_controller", __name__)

######################################################
###                   PARAMETERS                   ###
######################################################

#работает
@requests_controller.route('/api/markers/get', methods=["POST", "GET"])
def api_markers_get():
    limit = int(request.args.get('limit', 100))
    skip = int(request.args.get('skip', 0))
    return jsonify(mapper.markers.get_all(skip, limit))

#работает
@requests_controller.route('/api/markers/get_all_langs', methods=["POST", "GET"])
def api_markers_get_langs():
    return jsonify(mapper.markers.get_all_langs())

#работает
@requests_controller.route('/api/markers/get_all_markers_by_lang', methods=["POST", "GET"])
def api_markers_get_by_langs():
    lang = request.args.get('lang')
    return jsonify(mapper.markers.get_all_markers_by_lang(lang))   

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

#работает
@requests_controller.route('/api/records/get_all', methods=["POST", "GET"])
def api_get_all_records():
    limit = int(request.args.get('limit', 100))
    skip = int(request.args.get('skip', 0))
    return jsonify(mapper.records.get_all(skip, limit))
        

"""
test = {
    "params" : [
        { "1b" : "0" },
        { "1a" : "0" }
    ],
    "params_options" : ">2",
    "res_type" : "markers",
    "langs": []
}
"""
