import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import OnlineUserList from './Components/Chatsystem/Chatlist.js'
import Chatbox from './Components/Chatsystem/Chatbox.js'

class App extends Component {

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
