import React, {Component} from 'react'
import io from 'socket.io-client';
import axios from 'axios';
import Peer from 'peerjs';
import {connect} from 'react-redux';
const socket = io(process.env.REACT_APP_SOCKET);

// const customConfig;
// const peer = new Peer({
//     key: '0j24mz34djgojemi'
//     // host: 'mypeer300.herokuapp.com',
//     // secure: true,
//     // port: 443,
//     // config: customConfig


// axios.get('https://service.xirsys.com/ice',{
//   ident: "hqdang97",
//   secret: "2b5c030e-78c9-11e7-93d4-b416ec176587",
//   domain: "hokakede1.github.io",
//   application: "default",
//   room: "default",
//   secure: 1
// }).then(res => customConfig = res.d)


function openStream() {
  const config = { audio: false, video: true };
  return navigator.mediaDevices.getUserMedia(config);
}
function playStream(idVideoTag, stream) {
  const video = document.getElementById(idVideoTag);
  video.srcObject = stream;
  video.play();
}
// openStream()
// .then(stream => playStream('localStream', stream) );

 class VideoChat extends Component {
  constructor(props){
    super(props)
    this.state = {
      input: '',
      peer: new Peer({key: '0j24mz34djgojemi'}),
      peerId: '',
      signupName: this.props.currentUser,
      onlineUserList: [{username: '', peerId: ''}]
    }
  }
  componentWillMount(){
    openStream()
    .then(stream => playStream('localStream', stream));
    this.state.peer.on('open', id => this.setState({peerId: id}))
    this.state.peer.on('call', call => {
      openStream().then(stream => {
        call.answer(stream);
        playStream('localStream', stream);
        call.on('stream', remoteStream => playStream('remoteStream', remoteStream));
      })
    })
    socket.on('newUserSignUp', (data)=> {this.setState({onlineUserList:data})})
}


  onInputChange(e){
    this.setState({
      input: e.target.value
    })
  }

  onCallClick(peerid){
    openStream()
    .then(stream => {
      playStream('localStream', stream);
      const call = this.state.peer.call(peerid, stream);
      call.on('stream', remoteStream => playStream('remoteStream', remoteStream));
    })
  }

  onSignUpInputChange(e){
    this.setState({signupName: e.target.value})
  }
  onClickSignUp(){
    socket.emit('UserSignUp', {userName: this.state.signupName, peerId: this.state.peerId})
  }


  render(){
  // console.log(this.props.currentUser)
  // console.log(this.state.signupName)
  // console.log(this.state.onlineUserList)
  var online_user = this.state.onlineUserList.map((item, index) => {
    return (
      <div key={index}>
        <h1>{item.userName}</h1>
        <button onClick={() => {this.onCallClick(item.peerId)}}>Call {item.username}</button>
      </div>
    )
  })
  return (
    <div>
        {online_user}
        <ul id='ulUser'>
        </ul>
        <h1>My Peer Id is {this.state.peerId}</h1>
        <video id="localStream" width="300" controls></video>
        <br />
        <video id="remoteStream" width="300" controls></video>
        <br />
        {/* <input
          type='text'
          id='remoteId'
          placeholder="Remote ID"
          onChange={this.onInputChange.bind(this)}
         />
        <button id='btnCall'
          onClick={this.onCallClick.bind(this)}
          >Call</button> */}

        <input
          onChange={this.onSignUpInputChange.bind(this)}
          value={this.state.signupName}
          type='text'
          id='txtUsername'
          placeholder="Enter your username"></input>
        <button id='btnSignUp' onClick={this.onClickSignUp.bind(this)}>Make a call</button>
    </div>
  )
  }
}
function mapStateToProps(state){
  console.log(state);
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(VideoChat)
