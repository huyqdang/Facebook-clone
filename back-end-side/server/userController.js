
module.exports = {
  //=============GET REQUEST================
  getPosts: function(req, res, next){ //but might need to fix at sql part
    const db = req.app.get('db');
    const { id } = req.user;


    db.get_posts([id])
      .then( (posts) => {
        res.status(200).send(posts)} )
      .catch( (err) => {
        res.status(500).send(err)} )

  },

  getFriends: function(req, res, next){ //DONE -FIXED
    const db = req.app.get('db');
    const { id } = req.user;

    db.get_friends_id([id])
    .then(friends => res.status(200).send(friends))
    .catch( (err) => res.status(500).send(err))
  },

  getImages: function(req, res, next){ //DONE
    const db = req.app.get('db');
    const { id } = req.user;

    db.get_my_images([id])
    .then(imgposts => res.status(200).send(imgposts))
    .catch( err => res.status(500).send(err));
  },

  getMyPosts: function(req, res, next){ //DONE --FIXED
    const db = req.app.get('db');
    const { id } = req.user;


    db.get_my_posts([id])
    .then(posts => {
      res.status(200).send(posts)})
    .catch( (err) => res.status(500).send(err));
  },

  getInfo: function(req, res, next){ //DONE --FIXED
    const db = req.app.get('db');
    const { id } = req.user;

    db.get_infos([id])
    .then(infos => res.status(200).send(infos))
    .catch( (err) => res.status(500).send(err));
  },

  getComments: function(req, res, next){ //DONE --FIXED
    const db = req.app.get('db');
    const { id } = req.user;
    const { postid } = req.params;

    db.get_comments([postid])
    .then(comments => res.status(200).send(comments))
    .catch( (err) => res.status(500).send(err));
  },

  getFriendInfo: function(req, res, next){ //JUST ADDED
    const db = req.app.get('db');
    const { friendid } = req.params;

    db.get_friends_info([friendid])
    .then(infos => {
      res.status(200).send(infos)})
    .catch( (err) => res.status(500).send(err));
  },

  getFriendPosts: function(req, res, next){ //JUST ADDED
    const db = req.app.get('db');
    const { friendid } = req.params;

    db.get_friend_posts([friendid])
    .then(infos => {
      res.status(200).send(infos)})
    .catch( (err) => res.status(500).send(err));
  },

  search: function(req, res, next){ //DONE -FIXED
    const db = req.app.get('db');
    const { name } = req.params;
    var thename = `%${name}%`;
    db.search([thename])
      .then(results => {
        const users = results.filter(result => {
         return result.user_name.toLowerCase().includes(name.toLowerCase()) ;
       })
        res.status(200).send(users)
      })
      .catch( (err) => res.status(500).send(err));
  },

//=============POST REQUEST===============

  postNewPost: function(req, res, next){  //DONE
    const db = req.app.get('db');
    const { id } = req.user;
    const { postContent } = req.body;

    db.post_new_post([ id, postContent ])
      .then(results => res.status(200).send(results))
      .catch( (err) => res.status(500).send(err));
  },
  postAddFriend: function(req, res, next){ //DONE
    const db = req.app.get('db');
    const { id } = req.user;
    const { friendId } = req.body;

    db.post_add_friend([id, friendId])
      .then(results => res.status(200).send(results))
      .catch( (err) => res.status(500).send(err));
  },
  postLike: function(req, res, next){ //DONE but might need to fix at line 102
    const db = req.app.get('db');
    const { id } = req.user;
    const { postid } = req.params;

    db.post_total_likes([postid])
      .then(likes => {

        var newlikes = likes[0].post_like + 1;

        db.post_like([newlikes, postid])
        .then(() => res.status(200).send('Successfully like') )
        .catch((err) => res.status(500).send(err))
      })
      .catch( (err) => res.status(500).send(err));
  },

  postUnlike: function(req, res, next){ //DONE but might need to fix at line 102
    const db = req.app.get('db');
    const { id } = req.user;
    const { postid } = req.params;

    db.post_total_likes([postid])
      .then(likes => {
        var newlikes = likes[0].post_like - 1 ;
        db.post_like([newlikes, postid])
        .then(() => res.status(200).send('Successfully like') )
        .catch((err) => res.status(500).send(err))
      })
      .catch( (err) => res.status(500).send(err));

  },

  postAddComment: function(req, res, next){ //DONE
    const db = req.app.get('db');
    const { id } = req.user;
    const { postid } = req.params;
    const { commentContent } = req.body;

    console.log(`id = ${id}`,`comment Content = ${commentContent}`,`postid = ${postid}`)


    db.post_add_comment([id, commentContent, postid])
      .then(results => res.status(200).send(results))
      .catch( (err) => res.status(500).send(err));
  },

  postLikeComment: function(req, res, next){ //DONE FIXED
    const db = req.app.get('db');
    const { commentid } = req.params;

    db.comment_total_likes([commentid])
      .then(likes => {
        var newlikes = likes[0].comment_like + 1 ;
        db.comment_like([newlikes, commentid])
        .then(() => res.status(200).send('Successfully like') )
        .catch((err) => res.status(500).send(err))
      })
      .catch( (err) => res.status(500).send(err));

  },
  postUnlikeComment: function(req, res, next){ //DONE FIXED
    const db = req.app.get('db');
    const { commentid } = req.params;

    db.comment_total_likes([commentid])
      .then(likes => {
        var newlikes = likes[0].comment_like - 1 ;
        db.comment_like([newlikes, commentid])
        .then(() => res.status(200).send('Successfully like') )
        .catch((err) => res.status(500).send(err))
      })
      .catch( (err) => res.status(500).send(err));

  },
  //=============PUT REQUEST===============
  putPost: function(req, res, next){ //DONE
    const db = req.app.get('db');
    const { id } = req.user;
    const { postid, newPostContent } = req.body;

    db.put_post([id, postid, newPostContent])
      .then(results => res.status(200).send(results))
      .catch( (err) => res.status(500).send(err));
  },
  putComment: function(req, res, next){ //DONE
    const db = req.app.get('db');
    const { id } = req.user;
    const { commentid, newCommentContent } = req.body;

    db.put_comment([id, commentid, newCommentContent])
      .then(results => res.status(200).send(results))
      .catch( (err) => res.status(500).send(err));
  },
  putInfo: function(req, res, next){ //DONE
    const db = req.app.get('db');
    const { id } = req.user;
    const { newbio } = req.body;
    console.log(id, newbio);

    db.put_info([id, newbio])
      .then(results =>{
        res.status(200).send(results)
      })

      .catch( (err) => {
        console.log(err)
        res.status(500).send(err)
      });
  },

  //=============DELETE REQUEST===============
  deletePost: function(req, res, next){
    const db = req.app.get('db');
    const { id } = req.user;
    const { postid } = req.params;
    console.log(id, postid);

    db.delete_post([id, postid])
      .then(results => res.status(200).send(results))
      .catch( (err) => res.status(500).send(err));
  },

  deleteComment: function(req, res, next){
    const db = req.app.get('db');
    const { id } = req.user;
    const { commentid } = req.params;

    db.delete_comment([id, commentid ])
      .then(results => res.status(200).send(results))
      .catch( (err) => res.status(500).send(err));
  }


}
