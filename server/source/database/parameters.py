#from base import Base, engine, from_keys
from .base import Base, engine, from_keys
from sqlalchemy import select

class Parameter:
    def __init__(self):
        self.Parameters = Base.classes.parameters
        self.connection = engine.connect()
    
    @from_keys
    def get_all(self):
        query = select([self.Parameters])
        cursor = self.connection.execute(query)
        return cursor.keys(), cursor.fetchall()
