var express = require('express');
var massive = require('massive');
var bodyParser = require('body-parser');
var userController = require('./server/userController');
var Auth0Strategy = require('passport-auth0');
var session = require('express-session');
var passport = require('passport');
var cors = require('cors');
const cloud = require('cloudinary');

var port = 8080;
var app = module.exports = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);



cloud.config({
  cloud_name: 'dejv0ljvj',
  api_key: '833721353563451',
  api_secret: 'yRtrXhUhwZR8oINu5mPISJShapc'
});



app.use(cors());

app.use(session({
  resave: true, //Without this you get a constant warning about default values
  saveUninitialized: true, //Without this you get a constant warning about default values
  secret: 'asdjfa;klsdjfladsfjkadfs;lkj'
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());


const connectionString = 'postgres://uelgbslmawgpdq:77276a3dbe2d8f51eb453b9b5744760e1196a5f6f9c70b8ecbd9821a129fe7a8@ec2-184-73-247-240.compute-1.amazonaws.com:5432/d5jc0vhoq8bl56?ssl=true';
massive( connectionString ).then( db => {
  app.set('db', db)
  // db.initTables.initTables()
  // .then( response => {
  //   console.log('User table init'); })
});

//=========Auth0 setup

passport.use(new Auth0Strategy({
   domain:       'hqdang97.auth0.com',
   clientID:     'Ox3ap_X_aKUg9G8Z_O9DZjdHxtTxAMpm',
   clientSecret: 'pPX4hcJL8FyEFhaSHacxGm6KygTvu3GrxaQbC-_yQs-QTtrI5KM_FJmDhWpgS9L1',
   callbackURL:  'http://localhost:8080/auth/callback'
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
  passport.authenticate('auth0', {successRedirect: 'http://localhost:3000/newsfeed'}), function(req, res) {
    res.status(200).send(req.user);
})

app.get('/auth/me', function(req, res) {

  res.status(200).send(req.user);
})

app.get('/auth/logout', function(req, res) {
  console.log('SUCCESSFULLY LOG OUT')
  req.logout();
  res.redirect('http://localhost:3000');
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




//=============PUT REQUEST===============
//edit Posts /api/editpost
app.put('/api/post',userController.putPost); // Edit Post
//edit Comments /api/editcomment
app.put('/api/comment',userController.putComment); // Edit comment
//edit Info /api/editinfo
app.put('/api/info',userController.putInfo); // edit profile picture

//=============DELETE REQUEST===============
//delete Posts /api/deleteposts
app.delete('/api/post/:postid',userController.deletePost)
//delete Comments /api/deletecomments
app.delete('/api/comment/:commentid',userController.deleteComment)



//=============SOCKET SECTION===============

server.listen(port, () => {
  console.log('your server is running on ' + port)
})
