from .parameters import Parameter
from .records import Record

class Mapper:
    def __init__(self):
        self.parameters = Parameter()
        self.records = Record()

mapper = Mapper()
