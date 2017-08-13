import React, {Component} from 'react';

class Chatbox extends Component {

  render(){
    var displayNone = {
      display: 'none'
    }
    return(
      <div className="chat" style={this.props.display ? null : displayNone}>
        <div className='chatbox_content'>
        <div className="chatbox_header">

          <div className='chatbox_user'>
            <div className='online_User'></div>
            <h5>{this.props.name}</h5>
          </div>

          <i className="fa fa-times"
            onClick={()=>this.props.turnoff()}
            aria-hidden="true"></i>
        </div>


        </div>

        <input className='chatbox_input' />

      </div>
    )
  }
}

export default Chatbox
