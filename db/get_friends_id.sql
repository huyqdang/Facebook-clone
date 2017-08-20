-- select friend_id from friend_id where user_id = $1;
select * from users
join friend on friend.friend_id = users.user_auth_id and friend.user_id = $1 and friend.friend_id != $1;
