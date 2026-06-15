--
-- PostgreSQL database dump
--

\restrict exWLwzKgoHXtkljqtR5CxS0pJTJsCGV9mSF15vQGmiag01q67CfcT6loKHeJuBm

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-06-15 15:51:14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 232 (class 1259 OID 24728)
-- Name: audit_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.audit_logs (
    log_id integer NOT NULL,
    user_id integer,
    action character varying(100) NOT NULL,
    table_name character varying(50),
    record_id integer,
    details text,
    ip_address character varying(45),
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.audit_logs OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 24727)
-- Name: audit_logs_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.audit_logs_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.audit_logs_log_id_seq OWNER TO postgres;

--
-- TOC entry 4985 (class 0 OID 0)
-- Dependencies: 231
-- Name: audit_logs_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.audit_logs_log_id_seq OWNED BY public.audit_logs.log_id;


--
-- TOC entry 224 (class 1259 OID 24632)
-- Name: caretakers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.caretakers (
    caretaker_id integer NOT NULL,
    full_name character varying(100) NOT NULL,
    phone character varying(20),
    nin character varying(20),
    gender character varying(10),
    village character varying(100),
    division character varying(50),
    relationship character varying(50),
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT caretakers_gender_check CHECK (((gender)::text = ANY ((ARRAY['male'::character varying, 'female'::character varying])::text[])))
);


ALTER TABLE public.caretakers OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 24631)
-- Name: caretakers_caretaker_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.caretakers_caretaker_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.caretakers_caretaker_id_seq OWNER TO postgres;

--
-- TOC entry 4986 (class 0 OID 0)
-- Dependencies: 223
-- Name: caretakers_caretaker_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.caretakers_caretaker_id_seq OWNED BY public.caretakers.caretaker_id;


--
-- TOC entry 226 (class 1259 OID 24645)
-- Name: children; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.children (
    child_id integer NOT NULL,
    unique_code character varying(20) NOT NULL,
    full_name character varying(100) NOT NULL,
    date_of_birth date NOT NULL,
    gender character varying(10),
    caretaker_id integer,
    registered_at integer,
    registered_by integer,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT children_gender_check CHECK (((gender)::text = ANY ((ARRAY['male'::character varying, 'female'::character varying])::text[])))
);


ALTER TABLE public.children OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 24644)
-- Name: children_child_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.children_child_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.children_child_id_seq OWNER TO postgres;

--
-- TOC entry 4987 (class 0 OID 0)
-- Dependencies: 225
-- Name: children_child_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.children_child_id_seq OWNED BY public.children.child_id;


--
-- TOC entry 220 (class 1259 OID 24596)
-- Name: facilities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.facilities (
    facility_id integer NOT NULL,
    name character varying(100) NOT NULL,
    division character varying(50) NOT NULL,
    level character varying(20) NOT NULL,
    location character varying(100),
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.facilities OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24595)
-- Name: facilities_facility_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.facilities_facility_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.facilities_facility_id_seq OWNER TO postgres;

--
-- TOC entry 4988 (class 0 OID 0)
-- Dependencies: 219
-- Name: facilities_facility_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.facilities_facility_id_seq OWNED BY public.facilities.facility_id;


--
-- TOC entry 222 (class 1259 OID 24608)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    full_name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password_hash character varying(255) NOT NULL,
    role character varying(20) NOT NULL,
    staff_number character varying(50),
    cadre character varying(50),
    facility_id integer,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['health_worker'::character varying, 'admin'::character varying])::text[])))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24607)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 4989 (class 0 OID 0)
-- Dependencies: 221
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 230 (class 1259 OID 24690)
-- Name: vaccinations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vaccinations (
    vaccination_id integer NOT NULL,
    child_id integer NOT NULL,
    vaccine_id integer NOT NULL,
    date_administered date NOT NULL,
    facility_id integer NOT NULL,
    administered_by integer NOT NULL,
    batch_number character varying(50),
    notes text,
    created_by timestamp without time zone DEFAULT now()
);


ALTER TABLE public.vaccinations OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 24689)
-- Name: vaccinations_vaccination_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vaccinations_vaccination_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vaccinations_vaccination_id_seq OWNER TO postgres;

--
-- TOC entry 4990 (class 0 OID 0)
-- Dependencies: 229
-- Name: vaccinations_vaccination_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vaccinations_vaccination_id_seq OWNED BY public.vaccinations.vaccination_id;


--
-- TOC entry 228 (class 1259 OID 24675)
-- Name: vaccines; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vaccines (
    vaccine_id integer NOT NULL,
    name character varying(100) NOT NULL,
    dose_number integer NOT NULL,
    weeks_after_birth integer NOT NULL,
    description text
);


ALTER TABLE public.vaccines OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 24674)
-- Name: vaccines_vaccine_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vaccines_vaccine_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vaccines_vaccine_id_seq OWNER TO postgres;

--
-- TOC entry 4991 (class 0 OID 0)
-- Dependencies: 227
-- Name: vaccines_vaccine_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vaccines_vaccine_id_seq OWNED BY public.vaccines.vaccine_id;


--
-- TOC entry 4781 (class 2604 OID 24731)
-- Name: audit_logs log_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_logs ALTER COLUMN log_id SET DEFAULT nextval('public.audit_logs_log_id_seq'::regclass);


--
-- TOC entry 4774 (class 2604 OID 24635)
-- Name: caretakers caretaker_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.caretakers ALTER COLUMN caretaker_id SET DEFAULT nextval('public.caretakers_caretaker_id_seq'::regclass);


--
-- TOC entry 4776 (class 2604 OID 24648)
-- Name: children child_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.children ALTER COLUMN child_id SET DEFAULT nextval('public.children_child_id_seq'::regclass);


--
-- TOC entry 4769 (class 2604 OID 24599)
-- Name: facilities facility_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facilities ALTER COLUMN facility_id SET DEFAULT nextval('public.facilities_facility_id_seq'::regclass);


--
-- TOC entry 4771 (class 2604 OID 24611)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 4779 (class 2604 OID 24693)
-- Name: vaccinations vaccination_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vaccinations ALTER COLUMN vaccination_id SET DEFAULT nextval('public.vaccinations_vaccination_id_seq'::regclass);


--
-- TOC entry 4778 (class 2604 OID 24678)
-- Name: vaccines vaccine_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vaccines ALTER COLUMN vaccine_id SET DEFAULT nextval('public.vaccines_vaccine_id_seq'::regclass);


--
-- TOC entry 4979 (class 0 OID 24728)
-- Dependencies: 232
-- Data for Name: audit_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.audit_logs (log_id, user_id, action, table_name, record_id, details, ip_address, created_at) FROM stdin;
\.


--
-- TOC entry 4971 (class 0 OID 24632)
-- Dependencies: 224
-- Data for Name: caretakers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.caretakers (caretaker_id, full_name, phone, nin, gender, village, division, relationship, created_at) FROM stdin;
1	DRALEGA MICHAEL LEMATIA	0771881947	CM200100200400	male	Makerere	Kawempe	guardian	2026-05-03 11:57:14.867707
4	Darlene Baby	0759781384	CF200100200400	female	Boston	Makindye	mother	2026-05-08 11:47:48.800862
\.


--
-- TOC entry 4973 (class 0 OID 24645)
-- Dependencies: 226
-- Data for Name: children; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.children (child_id, unique_code, full_name, date_of_birth, gender, caretaker_id, registered_at, registered_by, created_at) FROM stdin;
1	KCCA-1777798634815	Desire Baby	2026-04-03	female	1	1	1	2026-05-03 11:57:14.867707
2	KCCA-1778230068738	Edwin Boy	2026-03-24	male	4	1	1	2026-05-08 11:47:48.800862
\.


--
-- TOC entry 4967 (class 0 OID 24596)
-- Dependencies: 220
-- Data for Name: facilities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.facilities (facility_id, name, division, level, location, created_at) FROM stdin;
1	Kisenyi HC IV	Central	HC IV	\N	2026-04-28 19:20:55.043222
2	Kawempe HC IV	Kawempe	HC IV	\N	2026-04-28 19:20:55.043222
3	Komamboga HC III	Kawempe	HC III	\N	2026-04-28 19:20:55.043222
4	Kawaala HC III	Rubaga	HC III	\N	2026-04-28 19:20:55.043222
5	Kisugu HC III	Makindye	HC III	\N	2026-04-28 19:20:55.043222
6	Bukoto HC III	Nakawa	HC III	\N	2026-04-28 19:20:55.043222
7	Kitebi HC III	Rubaga	HC III	\N	2026-04-28 19:20:55.043222
8	Kiswa HC II	Nakawa	HC II	\N	2026-04-28 19:20:55.043222
\.


--
-- TOC entry 4969 (class 0 OID 24608)
-- Dependencies: 222
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, full_name, email, password_hash, role, staff_number, cadre, facility_id, is_active, created_at) FROM stdin;
1	Test Admin	admin@kcca.go.ug	$2b$10$lBpOarqiGMhLkEsa8PDczOzssCeEjKTVo.92bfKF4hzxKhEDLkMre	admin	\N	\N	1	t	2026-04-29 06:47:43.033042
\.


--
-- TOC entry 4977 (class 0 OID 24690)
-- Dependencies: 230
-- Data for Name: vaccinations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vaccinations (vaccination_id, child_id, vaccine_id, date_administered, facility_id, administered_by, batch_number, notes, created_by) FROM stdin;
1	1	1	2026-05-03	1	1	23	\N	2026-05-03 12:09:32.591109
2	1	3	2026-05-03	1	1	34	\N	2026-05-03 12:09:52.28228
3	1	2	2026-05-03	1	1	45	\N	2026-05-03 12:10:12.785236
4	2	1	2026-05-14	1	1		\N	2026-05-14 17:08:33.880461
5	2	2	2026-05-14	1	1		\N	2026-05-14 17:12:24.291531
\.


--
-- TOC entry 4975 (class 0 OID 24675)
-- Dependencies: 228
-- Data for Name: vaccines; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vaccines (vaccine_id, name, dose_number, weeks_after_birth, description) FROM stdin;
1	BCG	1	0	\N
2	OPV	1	0	\N
3	Hepatitis B	1	0	\N
4	Pentavalent	1	6	\N
5	OPV	2	6	\N
6	PCV	1	6	\N
7	Rotavirus	1	6	\N
8	Pentavalent	2	10	\N
9	OPV	3	10	\N
10	PCV	2	10	\N
11	Rotavirus	2	10	\N
12	Pentavalent	3	14	\N
13	OPV	4	14	\N
14	PCV	3	14	\N
15	IPV	1	14	\N
16	MR	1	36	\N
17	Vitamin A	1	24	\N
18	Vitamin A	2	36	\N
\.


--
-- TOC entry 4992 (class 0 OID 0)
-- Dependencies: 231
-- Name: audit_logs_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.audit_logs_log_id_seq', 1, false);


--
-- TOC entry 4993 (class 0 OID 0)
-- Dependencies: 223
-- Name: caretakers_caretaker_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.caretakers_caretaker_id_seq', 6, true);


--
-- TOC entry 4994 (class 0 OID 0)
-- Dependencies: 225
-- Name: children_child_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.children_child_id_seq', 2, true);


--
-- TOC entry 4995 (class 0 OID 0)
-- Dependencies: 219
-- Name: facilities_facility_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.facilities_facility_id_seq', 8, true);


--
-- TOC entry 4996 (class 0 OID 0)
-- Dependencies: 221
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 2, true);


--
-- TOC entry 4997 (class 0 OID 0)
-- Dependencies: 229
-- Name: vaccinations_vaccination_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vaccinations_vaccination_id_seq', 5, true);


--
-- TOC entry 4998 (class 0 OID 0)
-- Dependencies: 227
-- Name: vaccines_vaccine_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vaccines_vaccine_id_seq', 18, true);


--
-- TOC entry 4809 (class 2606 OID 24738)
-- Name: audit_logs audit_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_pkey PRIMARY KEY (log_id);


--
-- TOC entry 4793 (class 2606 OID 24643)
-- Name: caretakers caretakers_nin_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.caretakers
    ADD CONSTRAINT caretakers_nin_key UNIQUE (nin);


--
-- TOC entry 4795 (class 2606 OID 24641)
-- Name: caretakers caretakers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.caretakers
    ADD CONSTRAINT caretakers_pkey PRIMARY KEY (caretaker_id);


--
-- TOC entry 4797 (class 2606 OID 24656)
-- Name: children children_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.children
    ADD CONSTRAINT children_pkey PRIMARY KEY (child_id);


--
-- TOC entry 4799 (class 2606 OID 24658)
-- Name: children children_unique_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.children
    ADD CONSTRAINT children_unique_code_key UNIQUE (unique_code);


--
-- TOC entry 4787 (class 2606 OID 24606)
-- Name: facilities facilities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facilities
    ADD CONSTRAINT facilities_pkey PRIMARY KEY (facility_id);


--
-- TOC entry 4789 (class 2606 OID 24625)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4791 (class 2606 OID 24623)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4805 (class 2606 OID 24706)
-- Name: vaccinations vaccinations_child_id_vaccine_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vaccinations
    ADD CONSTRAINT vaccinations_child_id_vaccine_id_key UNIQUE (child_id, vaccine_id);


--
-- TOC entry 4807 (class 2606 OID 24704)
-- Name: vaccinations vaccinations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vaccinations
    ADD CONSTRAINT vaccinations_pkey PRIMARY KEY (vaccination_id);


--
-- TOC entry 4801 (class 2606 OID 24688)
-- Name: vaccines vaccines_name_dose_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vaccines
    ADD CONSTRAINT vaccines_name_dose_number_key UNIQUE (name, dose_number);


--
-- TOC entry 4803 (class 2606 OID 24686)
-- Name: vaccines vaccines_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vaccines
    ADD CONSTRAINT vaccines_pkey PRIMARY KEY (vaccine_id);


--
-- TOC entry 4818 (class 2606 OID 24739)
-- Name: audit_logs audit_logs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- TOC entry 4811 (class 2606 OID 24659)
-- Name: children children_caretaker_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.children
    ADD CONSTRAINT children_caretaker_id_fkey FOREIGN KEY (caretaker_id) REFERENCES public.caretakers(caretaker_id);


--
-- TOC entry 4812 (class 2606 OID 24664)
-- Name: children children_registered_at_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.children
    ADD CONSTRAINT children_registered_at_fkey FOREIGN KEY (registered_at) REFERENCES public.facilities(facility_id);


--
-- TOC entry 4813 (class 2606 OID 24669)
-- Name: children children_registered_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.children
    ADD CONSTRAINT children_registered_by_fkey FOREIGN KEY (registered_by) REFERENCES public.users(user_id);


--
-- TOC entry 4810 (class 2606 OID 24626)
-- Name: users users_facility_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_facility_id_fkey FOREIGN KEY (facility_id) REFERENCES public.facilities(facility_id);


--
-- TOC entry 4814 (class 2606 OID 24722)
-- Name: vaccinations vaccinations_administered_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vaccinations
    ADD CONSTRAINT vaccinations_administered_by_fkey FOREIGN KEY (administered_by) REFERENCES public.users(user_id);


--
-- TOC entry 4815 (class 2606 OID 24707)
-- Name: vaccinations vaccinations_child_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vaccinations
    ADD CONSTRAINT vaccinations_child_id_fkey FOREIGN KEY (child_id) REFERENCES public.children(child_id);


--
-- TOC entry 4816 (class 2606 OID 24717)
-- Name: vaccinations vaccinations_facility_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vaccinations
    ADD CONSTRAINT vaccinations_facility_id_fkey FOREIGN KEY (facility_id) REFERENCES public.facilities(facility_id);


--
-- TOC entry 4817 (class 2606 OID 24712)
-- Name: vaccinations vaccinations_vaccine_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vaccinations
    ADD CONSTRAINT vaccinations_vaccine_id_fkey FOREIGN KEY (vaccine_id) REFERENCES public.vaccines(vaccine_id);


-- Completed on 2026-06-15 15:51:16

--
-- PostgreSQL database dump complete
--

\unrestrict exWLwzKgoHXtkljqtR5CxS0pJTJsCGV9mSF15vQGmiag01q67CfcT6loKHeJuBm

