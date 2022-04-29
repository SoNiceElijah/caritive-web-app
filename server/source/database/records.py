from .base import Base, engine, from_keys
from sqlalchemy import select

class Record:
    def __init__(self):
        self.Records = Base.classes.records
        self.connection = engine.connect()
    
    @from_keys
    def get_all(self):
        query = select([self.Records])
        cursor = self.connection.execute(query)
        return cursor.fetchall()

    @from_keys
    def get_by_marker_id(self, marker_id):
        query = select([self.Records]).where(self.Records.marker_id == marker_id)
        cursor = self.connection.execute(query)
        return cursor.keys(), cursor.fetchall()

    @from_keys
    def get_one_param(self, query: dict):
        for name, val in query['params'][0].items():
            param_id = name
            value = val
        res = select([self.Records.marker_id]).where(self.Records.param_id == param_id).where(self.Records.value == value)
        cursor = self.connection.execute(res)
        return cursor.keys(), cursor.fetchall()

    #@from_keys
    #def get_by_params(self, query: dict):
    #    for name, val in query.items():
            