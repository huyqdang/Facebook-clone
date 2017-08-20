import axios from 'axios';
// axios.get('/api/friends').then(res => console.log('friends :',res))
// axios.get('/api/myposts').then(res => console.log('myposts :',res)) //Need to fix
// axios.get('/api/info/').then(res => console.log('myinfo :',res))
// axios.get('/api/comment/3').then(res => console.log('comment :',res)) //to have UI
// axios.get('/api/search/huy').then(res => console.log('search :',res)) //to have UI
// axios.get('/api/friend/info/:friendid', userController.getFriendInfo);
// axios.get('/api/friend/posts/:friendid', userController.getFriendPosts);
// //==========POST
// axios.post('/api/posts', {postContent: 'WhatSUp'}).then(res => console.log('sent Successfully'))
// axios.post('/api/addfriend', {friendId: 'auth0|598cd367b30b087a9934fedf'}).then(res => console.log('sent Successfully'))
// axios.post('/api/like/3').then(res => console.log('sent Successfully'))
// axios.post('/api/unlike/3').then(res => console.log('sent Successfully'))
// axios.post('/api/comment/2', {commentContent: 'hello'}).then(res => console.log('sent Successfully'))
// axios.post('/api/comment/like/1').then(res => console.log('sent Successfully'))
// axios.post('/api/comment/unlike/1').then(res => console.log('sent Successfully'))
//==========PUT
// axios.put('/api/post',{ postid: 10, newPostContent: 'SubjectChange'} ).then(res => console.log('sent Successfully'))
// axios.put('/api/comment',{ commentid: 4, newCommentContent: 'SubjectChange'}).then(res => console.log('sent Successfully'))
// axios.delete('/api/post/11').then(res => console.log('sent Successfully'))
// axios.delete('/api/comment/4').then(res => console.log('sent Successfully'))

var initialState = {
  currentUser:'',
  posts:[],
  loadingposts: false,
  friends: [],
  loadingFriend: false,
  myposts: [],
  loadingMyPosts: false,
  myinfo: [{profile_pic: ''}],
  loadingMyInfo: false,
  search: [],
  loadingSearch: false,
  error: null
}

// var GET_FRIEND = 'GET_FRIEND';
// // var GET_POSTS = 'GET_POSTS';
// var GET_MYPOSTS = 'GET_MYPOSTS';
// var GET_MYINFO  = 'GET_MYINFO';
var SET_USER_NAME = 'SET_USER_NAME';

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case SET_USER_NAME:{
      return {...state,
        currentUser: action.payload
      }
    }
    case 'GET_FRIEND_PENDING':{
      return {...state,
        loadingFriend: true
      }
    }
    case 'GET_FRIEND_FULFILLED':{
      return {...state,
        loadingFriend: false,
        friends: action.payload.data
      }
    }
    case 'GET_MYPOSTS_PENDING':{
      return {...state,
        loadingMyPosts: true
      }
    }
    case 'GET_MYPOSTS_FULFILLED':{

      return {...state,
        loadingMyPosts: false,
        myposts: action.payload.data
      }
    }
    case 'GET_POSTS_PENDING':{
      return {...state,
        loadingposts: true
      }
    }
    case 'GET_POSTS_FULFILLED':{

      return {...state,
        loadingposts: false,
        posts: action.payload.data
      }
    }
    case 'SEARCH_PENDING':{
      return {...state,
        loadingSearch: true
      }
    }
    case 'SEARCH_FULFILLED':{
      return {...state,
        search: action.payload.data,
        loadingSearch: false,
      }
    }
    case 'SEARCH_REJECTED':{
      return {...state,
        error: action.payload,
        loadingSearch: false,
      }
    }
    case 'GET_MYINFO':{
      return {...state,
        myinfo: action.payload
      }
    }


    default:{
      return state
    }
  }
}

//GET REQUEST ============

export function getFriend(){
  return {
    type: 'GET_FRIEND',
    payload: axios.get('/api/friends')
  }
};

export function getMyPosts(){
  return {
    type: 'GET_MYPOSTS',
    payload: axios.get('/api/myposts')
  }
};

export function getPosts(){
  return{
    type: 'GET_POSTS',
    payload: axios.get('/api/posts')
  }
}

export function search(searchTerm){
  return {
    type: 'SEARCH',
    payload: axios.get(`/api/search/${searchTerm}`)
  }
}

export function getMyInfo(info){
  return{
    type: 'GET_MYINFO',
    payload: info
  }
}

export function setCurrentUser(user_name){
  return{
    type: SET_USER_NAME,
    payload: user_name
  }
}
