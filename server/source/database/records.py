import sqlalchemy
from .base import Base, engine, from_keys
from sqlalchemy import select, text

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

    @from_keys
    def get_by_parameters(self, query: dict):
        sql_query = 'SELECT DISTINCT a.marker_id\nFROM records AS a\n'
        for i, pair in enumerate(query["params"]):
            code = chr(i+98)
            for par, val in pair.items():
                q = f"INNER JOIN records AS {code}\nON a.marker_id={code}.marker_id and {code}.param_id='{par}' and {code}.value='{val}'\n"
                sql_query = sql_query+q
        res = text(sql_query)
        cursor = self.connection.execute(res)
        return cursor.keys(), cursor.fetchall()




    #@from_keys
    #def get_by_params(self, query: dict):
    #    for name, val in query.items():
            