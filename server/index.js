require('dotenv').config();
var express = require('express');
var massive = require('massive');
var bodyParser = require('body-parser');
var userController = require('./userController');
var secondController = require('./secondController');
var Auth0Strategy = require('passport-auth0');
var session = require('express-session');
var passport = require('passport');
var cors = require('cors');
// var config = require('./config')
var port = 8080;
var app = module.exports = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);




app.use(cors());

app.use(session({
  resave: true, //Without this you get a constant warning about default values
  saveUninitialized: true, //Without this you get a constant warning about default values
  secret: 'asdjfa;klsdjfladsfjkadfs;lkj'
}))
app.use( express.static( `${__dirname}/../build` ) );
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

const connectionString = process.env.CONNECTION_STRING;
massive( connectionString ).then( db => {
  console.log("DB Connected");
  app.set('db', db)
  // db.initTables.initTables()
  // .then( response => {
  //   console.log('User table init'); })
}).catch(err=>console.log(err));

//=========Auth0 setup

passport.use(new Auth0Strategy({
   domain:       process.env.DOMAIN,
   clientID:     process.env.ID,
   clientSecret: process.env.SECRET,
   callbackURL:  '/auth/callback'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    let db = app.get('db');
    //Find user in database
    db.get_user_by_auth([profile.id])
    .then(
      (user) => {
        user = user[0];
        if (!user) { //if there isn't one, we'll create one!
          console.log('CREATING USER');
          db.create_user_by_auth([profile.id,profile.displayName,profile.picture])
          .then((user) => {
            console.log('USER CREATED', user);
            return done(null, user[0]); // GOES TO SERIALIZE USER
          })
          .catch((err) => console.log(err))
          db.inituser([profile.id]).then((user) => console.log('Init User themself successfully'))
        }
        return done(null, profile)
      }
    )
    .catch((err) => console.log(err))
  }
));

passport.serializeUser(function(user, done) {
  //Things you might do here :
   //Serialize just the id, get other information to add to session,
  done(null, user); //PUTS 'USER' ON THE SESSION
});

//USER COMES FROM SESSION - THIS IS INVOKED FOR EVERY ENDPOINT
passport.deserializeUser(function(user, done) {

  //Things you might do here :
    // Query the database with the user id, get other information to put on req.user
  done(null, user); //PUTS 'USER' ON REQ.USER
});

app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback',
  passport.authenticate('auth0', {successRedirect: process.env.LOGIN_SUCCESS_REDIRECT1}), function(req, res) {
    res.status(200).send(req.user);
})

app.get('/auth/me', function(req, res) {

  res.status(200).send(req.user);
})

app.get('/auth/logout', function(req, res) {
  req.logout();
  res.redirect(process.env.LOGOUT_SUCCESS_REDIRECT1);
})

app.get('/api/hello', function(req, res){
  console.log('the end point hits', req.user)
  res.json(req.user);
})

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
app.get('/api/search/:name', userController.search);
//get comment /api/comment
app.get('/api/comment/:postid', userController.getComments);
//get Info  /api/info
app.get('/api/info', userController.getInfo);

app.get('/api/friend/info/:friendid', userController.getFriendInfo);

app.get('/api/friend/posts/:friendid', userController.getFriendPosts);

//=============POST REQUEST===============

//post createPost /api/createposts
app.post('/api/posts', userController.postNewPost);  //createPost
//post createPost /api/createposts
// app.post('/api/imgposts', userController.postNewPost); //createNewImagePost
//post AddFriend  /api/addposts
app.post('/api/addfriend', userController.postAddFriend); //AddFriend
//post Likes  /api/post_id/like
app.post('/api/like/:postid', userController.postLike); //like
//post Likes  /api/post_id/unlike
app.post('/api/unlike/:postid', userController.postUnlike); //unlike
//post Comments /api/comment_id/like
app.post('/api/comment/:postid', userController.postAddComment); //addcomment

app.post('/api/comment/like/:commentid', userController.postLikeComment ); //likecomment

app.post('/api/comment/unlike/:commentid', userController.postUnlikeComment); //unlikecomment

app.post('/api/getSignedURL', secondController.getSignedURL)

app.post('/api/postimage', (req, res)=> {
  const db = req.app.get('db');
  const {id} = req.user
  const {image, content} = req.body

  db.post_image_post([id, content, image])
  .then(result => res.status(200).send(result))
  .catch(err => res.status(500).send(err))
})

app.put('/api/changepp', (req, res)=> {
  const db = req.app.get('db');
  const {id} = req.user
  const {image} = req.body
  console.log(image)

  db.put_profile_pic([image, id])
  .then(result => res.status(200).send(result))
  .catch(err => res.status(500).send(err))
})

app.put('/api/changebanner', (req, res)=> {
  const db = req.app.get('db');
  const {id} = req.user
  const {image} = req.body

  db.put_banner([image, id])
  .then(result => res.status(200).send(result))
  .catch(err => res.status(500).send(err))
})




//=============PUT REQUEST===============
//edit Posts /api/editpost
app.put('/api/post',userController.putPost); // Edit Post
//edit Comments /api/editcomment
app.put('/api/comment',userController.putComment); // Edit comment
//edit Info /api/editinfo
app.put('/api/fixinfo',userController.putInfo); // edit profile picture
app.put('/api/fixname',userController.putName); // edit profile picture
app.put('/api/fixlocation',userController.putLocation); // edit profile picture

//=============DELETE REQUEST===============
//delete Posts /api/deleteposts
app.delete('/api/post/:postid',userController.deletePost)
//delete Comments /api/deletecomments
app.delete('/api/comment/:commentid',userController.deleteComment)


server.listen(port, () => {
  console.log('your server is running on ' + port)
})

//=============SOCKET SECTION===============
var userlist = ['Dang Huy','Alice','Bui Sam', 'Hai Hai'];
var onlineUser = [];
var message = [];
var storename = '';
var arrUserInfo = [];

io.on('connection', function(socket){

  socket.on('userOnline', function(data){
      if(!onlineUser.includes(data)){
        onlineUser.push(data);
        setTimeout(function(){ onlineUser.splice(onlineUser.indexOf(data), 1)}, 31000);
      }
      io.sockets.emit('onlineUser', onlineUser);
      // console.log(onlineUser + ' is online');
  })

  // socket.on('updateOnlineUser', function(){
  //   console(onlineUser)
  //   io.sockets.emit('onlineUser', onlineUser);
  // })

  socket.on('updateData', function(){
    io.sockets.emit('serverSendMessage', message)
  })


  socket.on('userSendMessage', function(data){
    // console.log(data)
    message.push({un: data.un,mes: data.mes})
    io.sockets.emit('serverSendMessage', message)
  })

  socket.on('logout', function(data){
    onlineUser.splice(onlineUser.indexOf(data), 1)
    io.sockets.emit('onlineUser', onlineUser)
  })

  socket.on('UserSignUp', user => {
    arrUserInfo.push(user);
    socket.peerId = user.peerId;
    // socket.emit('OnlinePeople', arrUserInfo);
    io.sockets.emit('newUserSignUp', arrUserInfo);
  });

  socket.on('disconnect', (data) => {

    const index = arrUserInfo.findIndex(user => user.peerId === socket.peerId);
    arrUserInfo.splice(index, 1);
    io.emit('SomeoneDisconnected', socket.peerId);

  })
});

const path = require('path')
app.get('*', (req, res)=>{
res.sendFile(path.join(__dirname, '..','build','index.html'));
})
