import React, {Component} from 'react'
import UserList from './UserList'



class OnlineUserList extends Component {
  constructor() {
    super()
    this.state = {
      name: ['Huy', 'Sam', 'Logan', 'George', 'Dave', 'Im']
    }
  }


  render(){

    var userList = this.state.name.map((item, i) =>{
      return(
        <UserList name={item} key={i}/>
      )
    })
    return(
      <div className='chatbox__user-list'>

        {userList}
    </div>
    )
  }
}

export default OnlineUserList
