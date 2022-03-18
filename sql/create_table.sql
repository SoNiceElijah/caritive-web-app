
drop table if exists parameters cascade;
drop table if exists markers cascade;
drop table if exists records cascade;
drop type if exists param_values;

create table parameters (
    id varchar unique not null primary key,
    name varchar not null,
    example varchar not null default '',
    type varchar not null default ''
);

create table markers (
    id serial primary key,
    value varchar not null,
    note text default '',
    example varchar not null default '',
    translation varchar not null default '',
    source varchar not null default '',
    lang varchar
);

create type param_values AS ENUM ('1', '0', '1?', '0?', 'ND', 'IRR');
create table records (
    id serial primary key,
    param_id varchar references parameters(id),
    marker_id integer references markers(id),
    value param_values not null,
    note varchar not null default '',
    example varchar not null default '',
    translation varchar not null default '',
    source varchar not null default ''
);
