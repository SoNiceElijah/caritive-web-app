from .base import Base, engine, from_keys
from sqlalchemy import select

class Marker:
    def __init__(self):
        self.Markers = Base.classes.markers
        self.connection = engine.connect()
    
    @from_keys
    def get_all(self):
        query = select([self.Markers])
        cursor = self.connection.execute(query)
        return cursor.keys(), cursor.fetchall()
