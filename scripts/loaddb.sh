psql -d caritive -f ../sql/create_table.sql
python ../parser/create_table.py ../data | psql -d caritive
