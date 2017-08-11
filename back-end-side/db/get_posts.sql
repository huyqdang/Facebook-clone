-- select * from posts
-- where user_id in ($1)
select posts_id, post_content, post_like from post
inner join friend
on friend.user_id = $1 and friend.friend_id = post.user_id
order by post_id;
