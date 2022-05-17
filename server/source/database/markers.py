from .base import Base, engine, from_keys
from sqlalchemy import select, text
from flask import request

class Marker:
    def __init__(self):
        self.Markers = Base.classes.markers
        self.connection = engine.connect()
    
    #работает
    @from_keys
    def get_all(self, skip, limit):
        query = select([self.Markers]).limit(limit).offset(skip)
        cursor = self.connection.execute(query)
        return cursor.keys(), cursor.fetchall()

    #работает
    @from_keys
    def get_all_langs(self):
        #query = "SELECT DISTINCT lang FROM markers"
        query = select([self.Markers.lang]).distinct()
        cursor = self.connection.execute(query)
        return cursor.keys(), cursor.fetchall()

    #работает
    @from_keys
    def get_all_markers_by_lang(self, lang):
        #query = f"SELECT DISTINCT id FROM markers WHERE lang='{lang}'"
        query = select([self.Markers.id]).where(self.Markers.lang == lang).distinct()
        cursor = self.connection.execute(query)
        return cursor.keys(), cursor.fetchall()