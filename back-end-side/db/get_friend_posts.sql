select * from post
join users on users.user_auth_id = post.user_id
where users.user_id = $1;
