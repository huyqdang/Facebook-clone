insert into comment (user_id, comment_content, comment_like, post_id, comment_date)
  values($1, $2, 0, $3, default);
