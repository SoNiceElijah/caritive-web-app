import sys
import pandas as pd
from os import listdir
from os.path import isfile

"""
Cerates create_tables.sql from specified path
"""

def makeUniversal(line):
    if line is None:
        return None
    line = str(line)
    if line.endswith('.0'):
        return line[:-2]
    return line

def buildInsertString(dict):
    line = []
    for key in dict:
        line.append(f"{dict[key]}")
    return '\t(' + ", ".join(line) + ')'


def escape(line):
    if line is None:
        return None
    return "'" + str(line).replace("'","''") + "'"

glob_path = sys.argv[1]
files = [f"{glob_path}/{f}" for f in listdir(glob_path) if isfile(f"{glob_path}/{f}")]
parameters = {}
for file in files:
    sheets = pd.read_excel(file, None)
    for _, v in sheets.items():
        v = v.drop(0)
        for _, row in v.iterrows():
            if(row.isnull()[0]):
                type = row[v.columns[1]]
            else:
                name = "" if row.isnull()[1] else row[v.columns[1]]
                example = "" if row.isnull()[2] else row[v.columns[2]]
                parameters[row[v.columns[0]]] = { 'name' : escape(makeUniversal(name)), 'example' : escape(example), 'type' : escape(type) }

params_query = f"INSERT INTO parameters (\tid, \tname, \texample, \ttype) VALUES\n"
params_types_query = f"INSERT INTO parameters_types (\tid, \tdescription, \tcolor) VALUES\n"

params_types_tmp = set()
params_types_map = {}
params_types_vals = []
for key in parameters:
    params_types_tmp.add(parameters[key]['type'])
i = 0
for type in params_types_tmp:
    params_types_vals.append(f"\t({i}, \t{type}, \t0)")
    params_types_map[type] = i
    i += 1
params_types_query += ',\n'.join(params_types_vals) + ';\n\n'
print(params_types_query)

params_vals = []
for key in parameters:
    params_vals.append(f"\t({escape(makeUniversal(key))}, \t{parameters[key]['name']}, \t{parameters[key]['example']}, \t{params_types_map[parameters[key]['type']]})")
params_query += ',\n'.join(params_vals) + ';\n\n'
print(params_query)

i = 0
markers_query = f"INSERT INTO markers (\tid, \tvalue, \tnote, \texample, \ttranslation, \tsource) VALUES\n"
markers_vals = []
records_query = f"INSERT INTO records (\tmarker_id, \tparam_id, \tvalue, \tnote, \texample, \ttranslation, \tsource) VALUES\n"
records_vals = []

for file in files:
    sheets = pd.read_excel(file, None)
    for _, v in sheets.items():
        marker = { 'id' : i }

        row = v.iloc[0]

        name = "" if row.isnull()[3] else row[v.columns[3]]
        note = "" if row.isnull()[4] else row[v.columns[4]]
        example = "" if row.isnull()[5] else row[v.columns[5]]
        translation = "" if row.isnull()[6] else row[v.columns[6]]
        source = "" if row.isnull()[7] else row[v.columns[7]]

        marker['value'] = escape(name)
        marker['note'] = escape(note)
        marker['example'] = escape(example)
        marker['translation'] = escape(translation)
        marker['source'] = escape(source)

        markers_vals.append(buildInsertString(marker))

        i += 1

        v = v.drop(0)
        for _, row in v.iterrows():

            record = {}
            if(row.isnull()[0]):
               continue
            
            param_id = "" if row.isnull()[0] else row[v.columns[0]]
            name = "" if row.isnull()[3] else row[v.columns[3]]
            note = "" if row.isnull()[4] else row[v.columns[4]]
            example = "" if row.isnull()[5] else row[v.columns[5]]
            translation = "" if row.isnull()[6] else row[v.columns[6]]
            source = "" if row.isnull()[7] else row[v.columns[7]]

            record['marker_id'] = marker['id']
            record['param_id'] = escape(makeUniversal(param_id))
            record['value'] = escape(makeUniversal(name))
            record['note'] = escape(note)
            record['example'] = escape(example)
            record['translation'] = escape(translation)
            record['source'] = escape(source)

            records_vals.append(buildInsertString(record))


print(markers_query + ',\n'.join(markers_vals) + ';\n\n')
print(records_query + ',\n'.join(records_vals) + ';\n\n')
