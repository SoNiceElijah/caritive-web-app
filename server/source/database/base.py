from sqlalchemy.ext.automap import automap_base
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

Base = automap_base()
engine = create_engine("postgresql+psycopg2://elijah:test@localhost/caritive");
Base.prepare(engine, reflect=True)

def pack(*params):
    def deco(f):
        def wrapper(*args,**kwargs):
            res = f(*args, **kwargs)
            objs = []
            for r in res:
                obj = {}
                i = 0
                for p in params:
                    obj[p] = r[i]
                    i += 1
                objs.append(obj)
            return objs
        return wrapper
    return deco

def from_keys(f):
    def wrapper(*args, **kwargs):
        keys, res = f(*args, **kwargs)
        objs = []
        for r in res:
            obj = {}
            i = 0
            for k in keys:
                obj[k] = r[i]
                i += 1
            objs.append(obj)
        return objs
    return wrapper

