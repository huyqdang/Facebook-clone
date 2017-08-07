var express = require('express');
var massive = require('massive');
var bodyParser = bodyParser('body-parser');


const connectionString = 'postgres://uelgbslmawgpdq:77276a3dbe2d8f51eb453b9b5744760e1196a5f6f9c70b8ecbd9821a129fe7a8@ec2-184-73-247-240.compute-1.amazonaws.com:5432/d5jc0vhoq8bl56?ssl=true';
massive( connectionString ).then( db => app.set('db', db) );

var port = process.env.PORT || 3000;
var app = module.exports = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(bodyParser.json());

// ============GET REQUEST===============
//get Posts /
//get Friends /api/friends
//get OnlineFriends /api/onlinefriend
//get Images /api/images
//get myPosts /api/myposts
//get Search  /api/search
//get comment /api/comment
//get Info  /api/comment


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
