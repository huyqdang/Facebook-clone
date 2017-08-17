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
      myinfo: [{profile_pic: '',name: ''}]
    }
  }

  componentWillMount(){
    axios.get('/api/info/').then(res => {
      this.setState({myinfo: res.data})
      this.props.getMyInfo(res.data)
    });
  }

  render() {
    // console.log(this.state.no)
    return (
      <div className='wrapper'>
        <Navbar profilepic={this.state.myinfo[0].profile_pic}
          name={this.state.myinfo[0].user_name}/>
        <OnlineUserList />
        {this.props.children}

      </div>
    );
  }
}

export default connect(null, {getMyInfo})(App);
