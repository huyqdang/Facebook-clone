import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import OnlineUserList from './Components/Chatsystem/Chatlist.js';
import axios from 'axios';
import {connect} from 'react-redux';
import {getMyInfo} from './ducks/reducer';



class App extends Component {
  constructor(){
    super()

    this.state = {
      no: null
    }
  }

  componentWillMount(){
    axios.get('/api/info/').then(res => this.props.getMyInfo(res.data));
  }

  render() {
    // console.log(this.state.no)
    return (
      <div className='wrapper'>
        <Navbar />
        <OnlineUserList />
        {this.props.children}


      </div>
    );
  }
}

export default connect(null, {getMyInfo})(App);
