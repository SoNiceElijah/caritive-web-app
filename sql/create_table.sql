
drop table if exists records cascade;
drop table if exists parameters cascade;
drop table if exists parameters_types cascade;
drop table if exists markers cascade;
drop type if exists param_values;

create table parameters_types (
    id serial primary key,
    description varchar not null default '',
    color integer not null default 0
);

create table parameters (
    id varchar unique not null primary key,
    name varchar not null,
    example varchar not null default '',
    type integer references  parameters_types(id) on delete cascade
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
    param_id varchar references parameters(id) on delete cascade,
    marker_id integer references markers(id) on delete cascade,
    value param_values not null,
    note varchar not null default '',
    example varchar not null default '',
    translation varchar not null default '',
    source varchar not null default ''
);
