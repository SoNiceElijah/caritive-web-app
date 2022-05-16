from .base import Base, engine, from_keys
from sqlalchemy import select, text
from flask import request

class Marker:
    def __init__(self):
        self.Markers = Base.classes.markers
        self.connection = engine.connect()
    
    #not tested with limit/offset
    @from_keys
    def get_all(self):
        limit = int(request.args.get('limit'))
        skip = int(request.args.get('skip'))
        query = select([self.Markers]).limit(limit).offset(skip)
        cursor = self.connection.execute(query)
        return cursor.keys(), cursor.fetchall()

    #not tested
    @from_keys
    def get_all_langs(self):
        query = "SELECT DISTINCT lang FROM markers"
        cursor = self.connection.execute(text(query))
        return cursor.keys(), cursor.fetchall()

    #not tested
    @from_keys
    def get_all_markers_by_lang(self):
        lang = request.args.get('lang')
        #query = f"SELECT DISTINCT marker_id FROM markers WHERE lang='{lang}'"
        query = select([self.Markers.marker_id]).where(self.Markers.lang == lang).distinct()
        cursor = self.connection.execute(query)
        return cursor.keys(), cursor.fetchall()