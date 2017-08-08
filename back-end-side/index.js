var express = require('express');
var massive = require('massive');
var bodyParser = require('body-parser');
var userController = require('./server/userController')


const connectionString = 'postgres://uelgbslmawgpdq:77276a3dbe2d8f51eb453b9b5744760e1196a5f6f9c70b8ecbd9821a129fe7a8@ec2-184-73-247-240.compute-1.amazonaws.com:5432/d5jc0vhoq8bl56?ssl=true';
massive( connectionString ).then( db => {
  app.set('db', db)
  // db.initTables.initTables()
} );

var port = process.env.PORT || 3001;
var app = module.exports = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(bodyParser.json());

// ============GET REQUEST===============
//get Posts /
app.get('/api/posts', userController.getPosts );
//get Friends /api/friends
app.get('/api/friends', userController.getFriends);

//get OnlineFriends /api/onlinefriend

//get Images /api/images
app.get('/api/images', userController.getImages);
//get myPosts /api/myposts
app.get('/api/myposts', userController.getMyPosts);

//get Search  /api/search
app.get('/api/search', userController.search);
//get comment /api/comment
app.get('/api/comment', userController.getComments);
//get Info  /api/info
app.get('/api/comment', userController.getInfo);


//=============POST REQUEST===============

//post CreateUser
//post createPost /api/createposts
//post AddFriend  /api/addposts
//post Likes  /api/post_id/like
//post Comments /api/comment_id/like





//=============PUT REQUEST===============
//edit Posts /api/editpost
//edit Comments /api/editcomment
//edit Info /api/editinfo


//=============DELETE REQUEST===============
//delete Posts /api/deleteposts
//delete Comments /api/deletecomments



//=============SOCKET SECTION===============


server.listen(port, () => {
  console.log('your server is running on ' + port)
})
