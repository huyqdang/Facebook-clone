//THIS IS THE CHILD OF Chatlist.js

import React, {Component} from 'react';
import io from 'socket.io-client';
const socket = io(process.env.REACT_APP_SOCKET);




export default class UserList extends Component {
  constructor(props){
    super(props)

    this.state = {
      showOnline: false
    }
  }

  componentDidMount(){
    socket.on('onlineUser', (data)=>{
      // console.log(data)
      if(data.includes(this.props.name)){
        this.setState({
          showOnline: true
        })

      }else {this.setState({showOnline: false})}
    })
  }

  render(){
    var style = {
      background: `url(${this.props.profilePic})`,
      backgroundSize: 'cover'
    }

    // var displayNone = {
    //   display: 'none'
    // }

    let flex = {
      display: 'flex',
      marginLeft: '10px'
    }
    let online = {
      backgroundColor: 'rgb(86,208,144)'
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

        <div className='online_User' style={this.state.showOnline ? online : null}></div>
       </div>

    </div>
   )
  }

}
