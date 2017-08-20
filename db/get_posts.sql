-- select * from posts
-- where user_id in ($1)
select post_id, post_content, post_like, post_url, users.user_auth_id, user_name, profile_pic from post
inner join friend
on friend.user_id = $1 and friend.friend_id = post.user_id
join users on users.user_auth_id = post.user_id
order by post_id desc;
