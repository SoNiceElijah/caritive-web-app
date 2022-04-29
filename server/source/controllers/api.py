from flask import Blueprint
from flask import jsonify
from flask import request

from ..database.mapper import mapper

requests_controller = Blueprint("requests_controller", __name__)

######################################################
###                   PARAMETERS                   ###
######################################################

@requests_controller.route('/api/parameters/get', methods=["POST", "GET"])
def api_parameters_get():
    return jsonify(mapper.parameters.get_all())

@requests_controller.route('/api/records/get', methods=["POST", "GET"])
def api_records_get():
    return jsonify(mapper.records.get_all())

@requests_controller.route('/api/records/by_marker', methods=["POST", "GET"])
def api_records_get_by_m_id():
    m_id = request.json['marker_id']
    return jsonify(mapper.records.get_by_marker_id(m_id))

@requests_controller.route('/api/markers/get', methods=["POST", "GET"])
def api_markers_get():
    return jsonify(mapper.markers.get_all())

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
