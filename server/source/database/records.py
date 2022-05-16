import sqlalchemy
from .base import Base, engine, from_keys
from sqlalchemy import select, text
from flask import request

class Record:
    def __init__(self):
        self.Records = Base.classes.records
        self.connection = engine.connect()
    
    #not tested with limit/offset
    @from_keys
    def get_all(self):
        limit = int(request.args.get('limit'))
        skip = int(request.args.get('skip'))
        query = select([self.Records]).limit(limit).offset(skip)
        cursor = self.connection.execute(query)
        return cursor.fetchall()

    @from_keys
    def get_by_marker_id(self, marker_id):
        query = select([self.Records]).where(self.Records.marker_id == marker_id)
        cursor = self.connection.execute(query)
        return cursor.keys(), cursor.fetchall()

    #эту можно удалить
    @from_keys
    def get_one_param(self, query: dict):
        for name, val in query['params'][0].items():
            param_id = name
            value = val
        res = select([self.Records.marker_id]).where(self.Records.param_id == param_id).where(self.Records.value == value)
        cursor = self.connection.execute(res)
        return cursor.keys(), cursor.fetchall()

    #not tested
    @from_keys
    def get_by_parameters(self, query: dict):
        #добавить языки
        langs = query['langs']
        if query['res_type'] == 'markers:':
            sql_query = 'SELECT DISTINCT a.marker_id\nFROM records AS a\n'
        elif query['res_type'] == 'langs':
            sql_query = 'SELECT DISTINCT a.lang\nFROM records AS a\n' #новый код
        if langs: #новый код
            lang_list = ', '.join(langs)
            q = f'WHERE a.lang IN ({lang_list})\n'
            sql_query = sql_query+q
        for i, pair in enumerate(query["params"]):
            code = chr(i+98)
            for par, val in pair.items():
                #сорри я пока сделала максимально тупую проверку, я переделаю когда будет БД
                if len(par) <= 3 and val in ['1', '1?', '0', '0?', 'IRR', 'ND']:
                    q = f"INNER JOIN records AS {code}\nON a.marker_id={code}.marker_id and {code}.param_id='{par}' and {code}.value='{val}'\n"
                    sql_query = sql_query+q
        res = text(sql_query)
        cursor = self.connection.execute(res)
        return cursor.keys(), cursor.fetchall()





            