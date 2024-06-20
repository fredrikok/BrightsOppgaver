BEGIN;

SET client_encoding = 'UTF8';

CREATE TABLE actor (
    id int NOT NULL,
    firstname text NOT NULL,
    lastname text NOT NULL,
    gender char(10) NOT NULL,
	PRIMARY KEY (Id),
    CONSTRAINT actorgendercheck CHECK (((Gender = 'Female'::text) OR (Gender = 'Male'::text)) OR (Gender = 'Other'::text))
);

CREATE TABLE movie (
    id int NOT NULL,
    title text NOT NULL,
    releaseyear smallint NOT NULL,
    runtime smallint NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE moviecast (
    actor_id int NOT NULL,
    movie_id int NOT NULL,
    role text NOT NULL,
	PRIMARY KEY (actor_id, movie_id),
	FOREIGN KEY (actor_id) REFERENCES actor(id),
	FOREIGN KEY (movie_id) REFERENCES movie(id)
);

INSERT INTO actor VALUES 
(101, 'James', 'Stewart', 'Male'),
(102, 'Deborah', 'Kerr', 'Female'),
(103, 'Peter', 'OToole', 'Male'),
(104, 'Robert', 'De Niro', 'Male'),
(105, 'F. Murray', 'Abraham', 'Male'),
(106, 'Harrison', 'Ford', 'Male'),
(107, 'Nicole', 'Kidman', 'Female'),
(108, 'Stephen', 'Baldwin', 'Male'),
(109, 'Jack', 'Nicholson', 'Male'),
(110, 'Mark', 'Wahlberg', 'Male'),
(111, 'Woody', 'Allen', 'Male'),
(112, 'Claire', 'Danes', 'Female'),
(113, 'Tim', 'Robbins', 'Male'),
(114, 'Kevin', 'Spacey', 'Male'),
(115, 'Kate', 'Winslet', 'Female'),
(116, 'Robin', 'Williams', 'Male'),
(117, 'Jon', 'Voight', 'Male'),
(118, 'Ewan', 'McGregor', 'Male'),
(119, 'Christian', 'Bale', 'Male'),
(120, 'Maggie', 'Gyllenhaal', 'Female'),
(121, 'Dev', 'Patel', 'Male'),
(122, 'Sigourney', 'Weaver', 'Female'),
(123, 'David', 'Aston', 'Male'),
(124, 'Ali', 'Astin', 'Female');

INSERT INTO movie VALUES 
(901, 'Vertigo', 1958, 128),
(902, 'The Innocents', 1961, 100),
(903, 'Lawrence of Arabia', 1962, 216),
(904, 'The Deer Hunter', 978, 183),
(905, 'Amadeus', 1984, 160),
(906, 'Blade Runner', 1982, 117),
(907, 'Eyes Wide Shut', 1999, 159),
(908, 'The Usual Suspects', 1995, 106),
(909, 'Chinatown', 1974, 130),
(910, 'Boogie Nights', 1997, 155),
(911, 'Annie Hall', 1977, 93),
(912, 'Princess Mononoke', 1997, 134),
(913, 'The Shawshank Redemption', 1994, 142),
(914, 'American Beauty', 1999, 122),
(915, 'Titanic', 1997, 194),
(916, 'Good Will Hunting', 1997, 126),
(917, 'Deliverance', 1972, 109),
(918, 'Trainspotting', 1996, 94),
(919, 'The Prestige', 2006, 130),
(920, 'Donnie Darko', 2001, 113),
(921, 'Slumdog Millionaire', 2008, 120),
(922, 'Alien', 1979, 117),
(923, 'Beyond the Sea', 2004, 118),
(924, 'Avatar', 2009, 162),
(925, 'Braveheart', 1995, 178),
(926, 'Seven Samurai', 1954, 207),
(927, 'Spirited Away', 2001, 125),
(928, 'Back to the Future', 1985, 116),
(929, 'Aliens', 1986, 137);

INSERT INTO moviecast VALUES 
(101, 901, 'John Scottie Ferguson'),
(102, 902, 'Miss Giddens'),
(103, 903, 'T.E. Lawrence'),
(104, 904, 'Michael'),
(105, 905, 'Antonio Salieri'),
(106, 906, 'Rick Deckard'),
(107, 907, 'Alice Harford'),
(108, 908, 'McManus'),
(109, 909, 'J.J. Gittes'),
(110, 910, 'Eddie Adams'),
(111, 911, 'Alvy Singer'),
(112, 912, 'San'),
(113, 913, 'Andy Dufresne'),
(114, 914, 'Lester Burnham'),
(114, 923, 'Bobby Darin'),
(115, 915, 'Rose DeWitt Bukater'),
(116, 916, 'Sean Maguire'),
(117, 917, 'Ed'),
(118, 918, 'Renton'),
(119, 919, 'Alfred Borden'),
(120, 920, 'Elizabeth Darko'),
(121, 921, 'Older Jamal'),
(122, 922, 'Ripley'),
(122, 929, 'Ripley');
	
COMMIT;