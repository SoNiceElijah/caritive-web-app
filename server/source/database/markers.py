from .base import Base, engine, from_keys, repack
from sqlalchemy import select
from sqlalchemy import and_, or_, func

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
    def get_all_langs(self):
        query = select([self.Markers.lang, func.count()]).group_by(self.Markers.lang)
        cursor = self.connection.execute(query)
        return cursor.keys(), cursor.fetchall()

    
    def get_by_params(self, params):

        def nested_or(arr):
            if len(arr) == 1:
                return self.Records.value == arr[0]
            else:
                return or_(self.Records.value == arr[0], nested_or(arr[1:]))

        def nested_params(arr):
            if len(arr) == 1:
                return and_( self.Records.param_id == arr[0][0], nested_or(arr[0][1]) )
            else:
                return or_(and_(self.Records.param_id == arr[0][0], nested_or(arr[0][1])), nested_params(arr[1:]))

        where_query = []
        ids = params.keys()
        for i in ids:
            where_query.append((i, params[i]))
        if len(where_query) == 0:
            query = select([self.Markers])
        else:
            mids = select([self.Records.marker_id, func.count()]).where(nested_params(where_query)).group_by(self.Records.marker_id).alias('mids')
            query = select(self.Markers).select_from(mids).where(and_(self.Markers.id == mids.c.marker_id, mids.c.count == len(where_query) ))

        cursor = self.connection.execute(query)
        return { 'data' : repack(cursor.keys(), cursor.fetchall()), 'size' : cursor.rowcount }
