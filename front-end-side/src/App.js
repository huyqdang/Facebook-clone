import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import OnlineUserList from './Components/Chatsystem/Chatlist.js';
import Chatbox from './Components/Chatsystem/Chatbox.js';
import axios from 'axios';



class App extends Component {
  constructor(){
    super()

    this.state = {
      no: null
    }
  }

  componentDidMount(){
    console.log('In component Did mount')
    // axios.get('/api/friends').then(res => console.log('friends :',res))
    // axios.get('/api/myposts').then(res => console.log('myposts :',res))
    // axios.get('/api/info/').then(res => console.log('myinfo :',res))
    // axios.get('/api/comment/3').then(res => console.log('comment :',res))
    // axios.get('/api/search/huy').then(res => console.log('search :',res))
    //==========POST
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
  }

  render() {
    return (
      <div className='wrapper'>
        <Navbar />
        <OnlineUserList />
        {this.props.children}
        <Chatbox />

      </div>
    );
  }
}

export default App;
