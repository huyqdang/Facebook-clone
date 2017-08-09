//THIS IS THE CHILD OF Chatlist.js

import React from 'react';

export default function UserList(props) {
  // var style = {
  //   display: 'none'
  // }

  let flex = {
    display: 'flex',
    marginLeft: '10px'
  }

  return (
    <div className='list_user'>
      <div style={flex}>

        <div className='userList_avatar'></div>
        <h5>
          {props.name}
        </h5>

      </div>

      <div className='online_User' >
      </div>
    </div>
)

}
