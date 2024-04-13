DROP TABLE IF EXISTS public.reservations;
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.groups;
DROP TABLE IF EXISTS public.rooms;

CREATE TABLE IF NOT EXISTS public.groups
(
    id SERIAL PRIMARY KEY,
    name character varying(50) NOT NULL UNIQUE,
    password character varying(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.users
(
    id SERIAL PRIMARY KEY,
    group_id integer REFERENCES groups,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    email character varying(100) NOT NULL UNIQUE,
    password character varying(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.rooms
(
    id SERIAL PRIMARY KEY,
    building_name character varying(50) NOT NULL,
    floor_number integer NOT NULL,
    room_name character varying(50) NOT NULL,
    room_description varchar,
    room_image varchar
);

CREATE TABLE IF NOT EXISTS public.reservations
(
    id SERIAL PRIMARY KEY,
    room_id integer REFERENCES rooms NOT NULL,
    user_id integer REFERENCES users NOT NULL,
    start_time timestamp NOT NULL,
    end_time timestamp NOT NULL
);
