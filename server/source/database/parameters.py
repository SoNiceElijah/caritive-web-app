from .base import Base, engine, from_keys
from sqlalchemy import select

class Parameter:
    def __init__(self):
        self.Parameters = Base.classes.parameters
        self.ParametersTypes = Base.classes.parameters_types
        self.connection = engine.connect()
    
    @from_keys
    def get_all(self):
        query = select([self.Parameters, self.ParametersTypes.description, self.ParametersTypes.color]).join(self.ParametersTypes)
        print(query)
        cursor = self.connection.execute(query)
        return cursor.keys(), cursor.fetchall()

