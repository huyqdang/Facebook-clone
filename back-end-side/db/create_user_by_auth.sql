insert into users (user_auth_id,
user_name,
user_location ,
profile_pic ,
bio)
values
($1, $2, NULL, $3, NULL);
