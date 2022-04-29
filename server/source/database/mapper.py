from .parameters import Parameter
from .records import Record
from .markers import Marker

class Mapper:
    def __init__(self):
        self.parameters = Parameter()
        self.records = Record()
        self.markers = Marker()

mapper = Mapper()
