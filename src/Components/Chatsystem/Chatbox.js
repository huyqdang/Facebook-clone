import React, {Component} from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import {Link} from 'react-router-dom';
const socket = io(process.env.REACT_APP_SOCKET);




class Chatbox extends Component {
  constructor(props){
    super(props)
    this.state = {
      input: '',
      message: [{un:'', mes:''}],
      showOnline: false,
      name: this.props.name
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputSubmit = this.onInputSubmit.bind(this);
  }
  componentDidMount(){
    socket.on('serverSendMessage', (data) => {
      this.setState({message:data})
    })
    socket.emit('updateData')
    socket.on('onlineUser', (data)=>{
      if(data.includes(this.state.name)){
        console.log('it hits')
        this.setState({
          showOnline: true
        })

      }else {this.setState({showOnline: false})}
    })
  }

  // componentWillUpdate(nextProps, nextState){
  //   console.log('it hits componentWillUpdate');
  //   socket.on('onlineUser', (data)=>{
  //     console.log('it hits the if')
  //     if(data.includes(nextState.name)){
  //       console.log('it hits true')
  //       this.setState({
  //         showOnline: true
  //       })
  //
  //     }else {
  //       console.log('it hits false')
  //       this.setState({showOnline: false})
  //     }})
  //   // }})
  // }

  componentWillReceiveProps(nextProps){
    // this.setState({name: nextProps.name})
      socket.on('onlineUser', (data)=>{
        if(data.includes(nextProps.name)){
          this.setState({
            showOnline: true
          })

        }else {
          this.setState({showOnline: false})
        }})
      // }})
  }

  onInputChange(e){
    this.setState({
      input: e.target.value
    })
  }

  onInputSubmit(e){
    if(e.which === 13) {
      socket.emit('userSendMessage', {un: this.props.currentUser, mes: this.state.input})
      this.setState({input: ''})
    }
  }

  render(){
    let online = {
      backgroundColor: 'rgb(86,208,144)'
    }

    var displayNone = {
      display: 'none'
    }

    var message = this.state.message.map((item, i) => {
      if(item.un === this.props.currentUser) {
        return (
          <div className='my_mes' key={i}>
            <p>{item.mes}</p>
          </div>
        )
      }
      else{

        return (
          <div className='other_mes' key={i}>
            <p>{item.mes}</p>
          </div>
        )
      }
    })
    return(
      <div className="chat" style={this.props.display ? null : displayNone}>
        <div className='chatbox_content'>
        <div className="chatbox_header">

          <div className='chatbox_user'>
            <div className='online_User' style={this.state.showOnline ? online : null}></div>
            <h5>{this.props.name}</h5>
          </div>
          <div>
            <Link to='/videochat' target="_blank">
              <i className="fa fa-video-camera" aria-hidden="true"></i>
            </Link>
            <i className="fa fa-times"
              onClick={()=>this.props.turnoff()}
              aria-hidden="true"></i>
          </div>
        </div>
        <div className='chat_area'>
        {message}
        </div>
        </div>

        <input className='chatbox_input'
                onChange={this.onInputChange}
                value={this.state.input}
                onKeyPress={this.onInputSubmit}
        />

      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}



export default connect(mapStateToProps)(Chatbox)
