--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO dev;

--
-- Name: cars; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.cars (
    id integer NOT NULL,
    plate character varying(255),
    manufacture character varying(255),
    model character varying(255),
    image character varying(255),
    rentperday character varying(255),
    capacity character varying(255),
    description character varying(255),
    transmission character varying(255),
    type character varying(255),
    year character varying(255),
    options character varying(255),
    specs character varying(255),
    "availableAt" character varying(255),
    whoadded integer,
    whoupdated integer,
    whodeleted integer,
    deletestatus character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.cars OWNER TO dev;

--
-- Name: cars_id_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public.cars_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cars_id_seq OWNER TO dev;

--
-- Name: cars_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public.cars_id_seq OWNED BY public.cars.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255),
    email character varying(255),
    password character varying(255),
    type character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO dev;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO dev;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: cars id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.cars ALTER COLUMN id SET DEFAULT nextval('public.cars_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public."SequelizeMeta" (name) FROM stdin;
20220510005435-create-user.js
20220510010106-create-cars.js
\.


--
-- Data for Name: cars; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.cars (id, plate, manufacture, model, image, rentperday, capacity, description, transmission, type, year, options, specs, "availableAt", whoadded, whoupdated, whodeleted, deletestatus, "createdAt", "updatedAt") FROM stdin;
1	DBH-99999	Ford	F15090	https://cdn.motor1.com/images/mgl/Vz8nXB/s1/ford-ranger-raptor-unofficial-rendering.jpg	500000	2	Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.	Automatic	Sedan	2005	Cruise Control,Tinted Glass, Tinted Glass, Tinted Glass, AM/FM Stereo	Brake assist, Leather-wrapped shift knob, Glove box lamp, Air conditioning w/in-cabin microfilter, Body color folding remote-controlled pwr mirrors, Dual-stage front airbags w/occupant classification system	true	2	1	2	true	2022-05-10 11:09:13.862+07	2022-05-10 12:20:11.436+07
2	Z10-3121	Mazda	9701	https://cdn.motor1.com/images/mgl/Vz8nXB/s1/ford-ranger-raptor-unofficial-rendering.jpg	200000	10	Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.	Automatic	Sedan	2013	Cruise Control,Tinted Glass, Tinted Glass, Tinted Glass, AM/FM Stereo	Brake assist, Leather-wrapped shift knob, Glove box lamp, Air conditioning w/in-cabin microfilter, Body color folding remote-controlled pwr mirrors, Dual-stage front airbags w/occupant classification system	true	2	\N	\N	false	2022-05-10 12:21:37.317+07	2022-05-10 12:21:37.317+07
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.users (id, username, email, password, type, "createdAt", "updatedAt") FROM stdin;
2	fatwa	fatwa@gmail.com	$2a$10$YmEa5gW.lsAn.GXYDhtZoewzx9X6KjlA2TtjVC2mjmgkA88or1Xmu	admin	2022-05-10 10:04:48.311+07	2022-05-10 10:23:24.086+07
4	zuhri	zuhri@gmail.com	$2a$10$2eWQ44.VKd.bHHd48KHgMO/64/tAdi0n5qqr96eJ2CQK8iL1CS5ny	member	2022-05-10 10:54:07.878+07	2022-05-10 10:54:07.878+07
1	Super admin	sadmin@gmail.com	$2a$10$XUoEtanKK0vWeUw49BqKdOX7OUWuq0SG258VhMEh8kR3Tpd8yf8XC	sadmin	2022-05-10 13:58:51.997+07	2022-05-10 13:58:51.997+07
\.


--
-- Name: cars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.cars_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: cars cars_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

