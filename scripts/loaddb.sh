PGPASSWORD='dev' psql -Ucaritive -d caritive -f ../sql/create_table.sql
python ../parser/create_table.py ../data | PGPASSWORD='dev' psql -Ucaritive -d caritive
