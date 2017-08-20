
-- DROP SCHEMA public CASCADE;
-- CREATE SCHEMA public;

CREATE TABLE IF NOT EXISTS  Users (
	user_id serial NOT NULL,
  user_auth_id TEXT NOT NULL,
	user_name TEXT NOT NULL,
	user_location TEXT,
	profile_pic TEXT,
	bio TEXT,
	CONSTRAINT Users_pk PRIMARY KEY (user_auth_id)
) WITH (
  OIDS=FALSE
);


--

CREATE TABLE IF NOT EXISTS  Friend (
	user_id TEXT NOT NULL,
	friend_id TEXT NOT NULL
) WITH (
  OIDS=FALSE
);


CREATE TABLE IF NOT EXISTS  Post (
	post_id serial NOT NULL,
	user_id TEXT NOT NULL,
	post_content TEXT NOT NULL,
	post_like integer NOT NULL,
	post_url TEXT,
	CONSTRAINT Post_pk PRIMARY KEY (post_id)
) WITH (
  OIDS=FALSE
);


--

CREATE TABLE IF NOT EXISTS Comment (
	comment_id serial NOT NULL,
	user_id TEXT NOT NULL,
	comment_content TEXT NOT NULL,
	comment_like integer NOT NULL,
	post_id integer NOT NULL,
	comment_date TIMESTAMP default date_trunc('second', now()) NOT NULL,
	CONSTRAINT Comment_pk PRIMARY KEY (comment_id)
) WITH (
  OIDS=FALSE
);




ALTER TABLE Friend ADD CONSTRAINT Friend_fk0 FOREIGN KEY (user_id) REFERENCES Users(user_auth_id);
ALTER TABLE Friend ADD CONSTRAINT Friend_fk1 FOREIGN KEY (friend_id) REFERENCES Users(user_auth_id);

ALTER TABLE Post ADD CONSTRAINT Post_fk0 FOREIGN KEY (user_id) REFERENCES Users(user_auth_id);

ALTER TABLE Comment ADD CONSTRAINT Comment_fk0 FOREIGN KEY (user_id) REFERENCES Users(user_auth_id);
ALTER TABLE Comment ADD CONSTRAINT Comment_fk1 FOREIGN KEY (post_id) REFERENCES Post(post_id);




-- ============= INSERT DUMBDATA

-- INSERT INTO Users (user_name, user_location, profile_pic, bio)
-- VALUES
-- ('Huy','Garden Grove', 'https://s-media-cache-ak0.pinimg.com/736x/09/78/21/097821c6e8737db2a601f7cc04e4b1ee--deal-with-it-gif-cat-gif.jpg','Hi everyone'),
-- ('Logan', 'San Francisco', 'https://i.redd.it/go5nr2w2vs8y.jpg', 'Oh yea'),
-- ('Ashley', 'Unknown', 'https://s-media-cache-ak0.pinimg.com/originals/b3/d3/26/b3d326c7751255cc86a8559b2bb9e24d.jpg', 'Watahhhh'),
-- ('Im', 'Deep in the Ocean', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDGkrF0qt-E79zHwcipeyucY94ybIfmZs8cOPOvaJK_O8NBp-ksg', 'Hm....');


-- INSERT INTO Post (user_id, post_content, post_like, post_url)
-- VALUES
-- (1, 'Hey welcome to my App', 9000, NULL),
-- (3, 'Hello anyone home', 12, NULL),
-- (4, 'Say Hi', 0, NULL),
-- (2, 'HAizzzzzz', 25, NULL);
--
-- INSERT INTO Comment (user_id, comment_content, comment_like, post_id, comment_date)
-- VALUES
-- (1, 'How do you feel', 2, 2, default),
-- (3, 'What is up', 3, 4, default);
