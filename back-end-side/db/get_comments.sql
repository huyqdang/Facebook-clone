select * from comment
join users on users.user_auth_id = comment.user_id
where post_id = $1 order by comment_like desc, comment_date;
