from .base import Base, engine, from_keys
from sqlalchemy import select

class Record:
    def __init__(self):
        self.Records = Base.classes.records
        self.Markers = Base.classes.markers
        self.Parameters = Base.classes.parameters
        self.connection = engine.connect()
    
    @from_keys
    def get_all(self):
        query = select([self.Records])
        cursor = self.connection.execute(query)
        return cursor.keys(), cursor.fetchall()

    @from_keys
    def get_by_marker_id(self, m_id):
        query = select([self.Records, self.Parameters.type]).where(self.Records.marker_id == m_id).join(self.Parameters)
        cursor = self.connection.execute(query)
        return cursor.keys(), cursor.fetchall()
