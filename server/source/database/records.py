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

# сделать get_by_marker_id который принимает маркер_айди и возвращает все рекордсы с таким маркер айди
# тоже в апи