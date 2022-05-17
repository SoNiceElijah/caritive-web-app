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
    def get_all(self, skip=0, limit=100):
        query = select([self.Records]).limit(limit).offset(skip)
        cursor = self.connection.execute(query)
        return cursor.keys(), cursor.fetchall()

    @from_keys
    def get_by_marker_id(self, marker_id):
        query = select([self.Records]).where(self.Records.marker_id == marker_id)
        cursor = self.connection.execute(query)
        return cursor.keys(), cursor.fetchall()

    #работает
    @from_keys
    def get_by_parameters(self, query: dict):
        langs = query['langs']
        print(langs)
        langs = list(map(lambda k: "'"+k+"'", langs))
        if query['res_type'] == 'markers':
            sql_query = 'SELECT DISTINCT a.marker_id\nFROM records AS a\nINNER JOIN markers AS b ON a.marker_id=b.id\n'
        elif query['res_type'] == 'langs':
            sql_query = 'SELECT DISTINCT b.lang\nFROM markers AS b INNER JOIN records AS a ON a.marker_id=b.id\n'
        x = 98    
        for i, pair in enumerate(query["params"]):
            for par, val in pair.items():
                #сорри я пока сделала максимально тупую проверку, я переделаю когда будет БД
                if len(par) <= 3 and val in ['1', '1?', '0', '0?', 'IRR', 'ND']:
                    x += 1
                    code = chr(x)
                    q = f"INNER JOIN records AS {code}\nON a.marker_id={code}.marker_id and {code}.param_id='{par}' and {code}.value='{val}'\n"
                    sql_query = sql_query+q
        if langs: #работает
            lang_list = ', '.join(langs)
            print(lang_list)
            q = f'WHERE b.lang IN ({lang_list})\n'
            sql_query = sql_query+q            
        res = text(sql_query)
        cursor = self.connection.execute(res)
        return cursor.keys(), cursor.fetchall()





            