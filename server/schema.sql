-- to start psql: psql -U postgres
-- to run file in psql: \i server/schema.sql

DROP DATABASE qa;

CREATE DATABASE qa;

-- to go into database \c qa
\c qa;

-- id,product_id,body,date_written,asker_name,asker_email,reported,helpful

CREATE TABLE QUESTIONS(
   QUESTION_ID SERIAL PRIMARY KEY NOT NULL,
   PRODUCT_ID INT NOT NULL,
   QUESTION_BODY TEXT NOT NULL,
   QUESTION_DATE BIGINT,
   ASKER_NAME TEXT,
   EMAIL TEXT,
   REPORTED BOOLEAN,
   QUESTION_HELPFULNESS INT
);

-- id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful

CREATE TABLE ANSWERS(
   ID SERIAL PRIMARY KEY NOT NULL,
   QUESTION_ID INTEGER REFERENCES QUESTIONS (QUESTION_ID),
   ANSWER_BODY TEXT NOT NULL,
   ANSWER_DATE BIGINT,
   ANSWERER_NAME TEXT,
   ANSWERER_EMAIL TEXT,
   REPORTED BOOLEAN,
   QUESTION_HELPFULNESS INT
);

-- id,answer_id,url

CREATE TABLE PHOTOS(
   ID SERIAL PRIMARY KEY NOT NULL,
   ANSWER_ID INTEGER REFERENCES ANSWERS (ID),
   PIC_URL TEXT NOT NULL
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

SELECT setval(pg_get_serial_sequence('questions', 'question_id'), max(question_id)) FROM questions;

SELECT setval(pg_get_serial_sequence('answers', 'id'), max(id)) FROM answers;

SELECT setval(pg_get_serial_sequence('photos', 'id'), max(id)) FROM photos;

