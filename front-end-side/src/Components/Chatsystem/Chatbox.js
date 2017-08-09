import React, {Component} from 'react';

class Chatbox extends Component {
  render(){
    return(
      <div className="chat">
        <div className='chatbox_content'>
        <div className="chatbox_header">

          <div className='chatbox_user'>
            <div className='online_User'></div>
            <h5>Im</h5>
          </div>

          <i className="fa fa-times" aria-hidden="true"></i>
        </div>


        </div>

        <input className='chatbox_input' />

      </div>
    )
  }
}

export default Chatbox
