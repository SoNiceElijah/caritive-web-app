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
