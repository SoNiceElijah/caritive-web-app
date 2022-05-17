from .base import Base, engine, from_keys
from sqlalchemy import select
from sqlalchemy import and_, or_

class Marker:
    def __init__(self):
        self.Markers = Base.classes.markers
        self.Records = Base.classes.records
        self.connection = engine.connect()
    
    @from_keys
    def get_all(self):
        query = select([self.Markers])
        cursor = self.connection.execute(query)
        return cursor.keys(), cursor.fetchall()

    @from_keys
    def get_by_params(self, params):

        def nested_or(arr):
            if len(arr) == 1:
                return self.Records.value == arr[0]
            else:
                return or_(self.Records.value == arr[0], nested_or(arr[1:]))

        def nested_and(arr):
            if len(arr) == 1:
                return and_( self.Records.param_id == arr[0][0], nested_or(arr[0][1]) )
            else:
                return and_(and_(self.Records.param_id == arr[0][0], nested_or(arr[0][1])), nested_and(arr[1:]))

        where_query = []
        ids = params.keys()
        for i in ids:
            where_query.append((i, params[i]))
        if len(where_query) == 0:
            query = select([self.Markers])
        else:
            mids = select(self.Records.marker_id).where(nested_and(where_query)).group_by(self.Records.marker_id).alias('mids')
            query = select(self.Markers).select_from(mids).where(self.Markers.id == mids.c.marker_id)

        cursor = self.connection.execute(query)
        return cursor.keys(), cursor.fetchall()
