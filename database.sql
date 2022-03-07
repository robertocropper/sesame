CREATE DATABASE SESAME;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE USERS(
uid UUID DEFAULT uuid_generate_v4(),
displayName VARCHAR(200) NOT NULL,
email VARCHAR(200) NOT NULL UNIQUE,
password VARCHAR(200) NOT NULL,
type VARCHAR(200),
stripeID VARCHAR,
plan VARCHAR,
status VARCHAR,
createdAt  TIMESTAMP DEFAULT NOW(),
PRIMARY KEY (uid)
);

CREATE TABLE PROJECTS(
pid UUID DEFAULT uuid_generate_v4(),
uid UUID,
clientObjective VARCHAR(200) NOT NULL,
objectiveOption VARCHAR(40),
service VARCHAR(200),
niche VARCHAR(200),
duration INTEGER,
unitOption VARCHAR(9),
dateCompleted DATE,
cost NUMERIC,
currencyOption VARCHAR(9),
specifications VARCHAR(2000),
process VARCHAR(4000),
outcome VARCHAR(4000),
clientNotes VARCHAR(4000),
filenames VARCHAR[],
category VARCHAR(200),
tags TEXT[],
kpi TEXT[][],
published BOOLEAN,
private BOOLEAN,
createdAt  TIMESTAMP DEFAULT NOW(),
PRIMARY KEY (pid),
FOREIGN KEY (uid) REFERENCES USERS(uid)
);

-----

CREATE TABLE USERS(
uid UUID DEFAULT uuid_generate_v4(),
displayName VARCHAR(200) NOT NULL,
email VARCHAR(200) NOT NULL UNIQUE,
password VARCHAR(200) NOT NULL,
type VARCHAR(200),
location VARCHAR(200),
stripeID VARCHAR,
plan VARCHAR,
status VARCHAR,
createdAt  TIMESTAMP DEFAULT NOW(),
PRIMARY KEY (uid)
);

CREATE TABLE PROJECTS2(
pid UUID DEFAULT uuid_generate_v4(),
uid UUID,
clientObjective VARCHAR(200) NOT NULL,
service VARCHAR(200),
description VARCHAR(4000),
status VARCHAR(40),
duration NUMERIC,
durationUnit VARCHAR(9),
costAmount NUMERIC,
costCurrency VARCHAR(4),
dateCompleted DATE,
clientName VARCHAR(200),
clientIndustry VARCHAR(200),
clientNiche VARCHAR(200),
clientWords VARCHAR(2000),
filenames VARCHAR[],
category VARCHAR(200),
tags TEXT[],
kpi TEXT[][],
published BOOLEAN,
private BOOLEAN,
createdAt  TIMESTAMP DEFAULT NOW(),
PRIMARY KEY (pid),
FOREIGN KEY (uid) REFERENCES USERS(uid)
);

CREATE TABLE PROJECTS(
pid UUID DEFAULT uuid_generate_v4(),
uid UUID,
clientObjective VARCHAR(200) NOT NULL,
service VARCHAR(200),
keyInfo VARCHAR(200),
description VARCHAR(4000),
status VARCHAR(40),
duration NUMERIC,
durationUnit VARCHAR(9),
costAmount NUMERIC,
costCurrency VARCHAR(4),
dateCompleted DATE,
clientName VARCHAR(200),
clientIndustry VARCHAR(200),
clientNiche VARCHAR(200),
clientWords VARCHAR(2000),
filenames VARCHAR[],
category VARCHAR(200),
tags TEXT[],
kpi TEXT[][],
published BOOLEAN,
private BOOLEAN,
createdAt  TIMESTAMP DEFAULT NOW(),
PRIMARY KEY (pid),
FOREIGN KEY (uid) REFERENCES USERS(uid)
);
