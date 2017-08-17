delete from comment where post_id = $2;
delete from post where user_id = $1 and post_id = $2;
