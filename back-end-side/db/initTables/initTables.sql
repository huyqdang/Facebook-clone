CREATE TABLE IF NOT EXISTS "User" (
	user_id serial NOT NULL,
	name TEXT NOT NULL,
	location TEXT,
	profile_pic TEXT,
	bio TEXT,
	CONSTRAINT User_pk PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);


--
CREATE TABLE IF NOT EXISTS "Friend_id" (
	"user_id" integer NOT NULL,
	"friend_id" integer NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS "PostId" (
	"post_id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"content" TEXT NOT NULL,
	"like" integer NOT NULL,
	"url" TEXT,
	CONSTRAINT PostId_pk PRIMARY KEY ("post_id")
) WITH (
  OIDS=FALSE
);


--
CREATE TABLE IF NOT EXISTS "Comment" (
	"comment_id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"content" TEXT NOT NULL,
	"like" integer NOT NULL,
	"post_id" integer NOT NULL,
	"date" TIMESTAMP NOT NULL,
	CONSTRAINT Comment_pk PRIMARY KEY ("comment_id")
) WITH (
  OIDS=FALSE
);
--
--
--
--
ALTER TABLE "Friend_id" ADD CONSTRAINT "Friend_id_fk0" FOREIGN KEY ("user_id") REFERENCES "User"("user_id");
ALTER TABLE "Friend_id" ADD CONSTRAINT "Friend_id_fk1" FOREIGN KEY ("friend_id") REFERENCES "User"("user_id");

ALTER TABLE "PostId" ADD CONSTRAINT "PostId_fk0" FOREIGN KEY ("user_id") REFERENCES "User"("user_id");

ALTER TABLE "Comment" ADD CONSTRAINT "Comment_fk0" FOREIGN KEY ("user_id") REFERENCES "User"("user_id");
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_fk1" FOREIGN KEY ("post_id") REFERENCES "PostId"("post_id");
