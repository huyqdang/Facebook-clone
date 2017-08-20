import React, {Component} from 'react'
import UserList from './UserList'
import {connect} from 'react-redux';
import {getFriend, getMyPosts} from '../../ducks/reducer';
import Chatbox from './Chatbox';


class OnlineUserList extends Component {
  constructor(){
    super()
    this.state = {
      chatBoxDisplay: false,
      currentChat: ''
    }
  }

  componentDidMount(){
    this.props.getFriend()
  }

  onClickName(name){
    this.setState({
      chatBoxDisplay: true,
      currentChat: name
    })
  }
  onTurnOffChat(){
    this.setState({
      chatBoxDisplay: false
    })
  }

  render(){

    var userList = this.props.friends.map((item, i) =>{
      return(
        <UserList name={item.user_name} key={i}
          profilePic={item.profile_pic}
          friendId={item.user_auth_id}
          toggleChat={this.onClickName.bind(this)}
        />
      )
    })
    return(
      <div className='chatbox__user-list'>
        {userList}
        <Chatbox display={this.state.chatBoxDisplay}
          turnoff = {this.onTurnOffChat.bind(this)}
          name={this.state.currentChat}/>
    </div>
    )
  }
}

function mapStateToProps(state){
  return {
    friends: state.friends,
    loadingFriend: state.loadingFriend,
  }
}

export default connect(mapStateToProps, {getFriend, getMyPosts})(OnlineUserList)
