-- to start psql: psql -U postgres
-- to run file in psql: \i server/schema.sql

-- DROP DATABASE qa;

CREATE DATABASE qa;

-- to go into database \c qa
\c qa;

-- id,product_id,body,date_written,asker_name,asker_email,reported,helpful

CREATE TABLE QUESTIONS(
   ID INT PRIMARY KEY NOT NULL,
   PRODUCT_ID INT NOT NULL,
   QUESTION_BODY TEXT NOT NULL,
   QUESTION_DATE CHAR(50),
   ASKER_NAME TEXT,
   EMAIL TEXT,
   REPORTED INT,
   QUESTION_HELPFULNESS INT
);

-- id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful

CREATE TABLE ANSWERS(
   ID INT PRIMARY KEY NOT NULL,
   QUESTION_ID INTEGER REFERENCES QUESTIONS (ID),
   ANSWER_BODY TEXT NOT NULL,
   ANSWER_DATE CHAR(50),
   ANSWERER_NAME TEXT,
   ANSWERER_EMAIL TEXT,
   REPORTED BOOLEAN,
   QUESTION_HELPFULNESS INT
);

-- id,answer_id,url

CREATE TABLE PHOTOS(
   ID INT PRIMARY KEY NOT NULL,
   ANSWER_ID INTEGER REFERENCES ANSWERS (ID),
   PIC_URL TEXT
);

-- show tables: \d

-- insert csv data into postgresSQL using copy
COPY QUESTIONS
FROM '/Users/szetodonna/HackReactor/SDC---Questions-Answers/data/questions.csv'
DELIMITER ',' CSV HEADER;

COPY ANSWERS
FROM '/Users/szetodonna/HackReactor/SDC---Questions-Answers/data/answers.csv'
DELIMITER ',' CSV HEADER;

COPY PHOTOS
FROM '/Users/szetodonna/HackReactor/SDC---Questions-Answers/data/answers_photos.csv'
DELIMITER ',' CSV HEADER;