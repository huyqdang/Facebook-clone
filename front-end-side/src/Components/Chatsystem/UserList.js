//THIS IS THE CHILD OF Chatlist.js

import React, {Component} from 'react';

export default class UserList extends Component {

  render(){
    var style = {
      background: `url(${this.props.profilePic})`,
      backgroundSize: 'cover'
    }

    let flex = {
      display: 'flex',
      marginLeft: '10px'
    }

    return (
      <div>
      <div className='list_user' onClick={() => this.props.toggleChat(this.props.name)}>
        <div style={flex}>
          <div className='userList_avatar' style={style} ></div>
          <h5>
            {this.props.name}
          </h5>
        </div>

        <div className='online_User' ></div>
       </div>

    </div>
   )
  }

}
