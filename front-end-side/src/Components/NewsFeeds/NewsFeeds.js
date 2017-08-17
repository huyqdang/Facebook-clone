import React, {Component} from 'react';
import Cards from './Card';
import InputField from './InputField';
import {connect} from 'react-redux';
import {setCurrentUser, getFriend, getPosts} from '../../ducks/reducer';
import axios from 'axios';
import io from 'socket.io-client';
const socket = io('http://localhost:8080');


class Newsfeed extends Component {
  constructor(props){
    super(props)

    this.state = {
      myInfo: [{name: '', profile_pic:'',bio:'', user_name:''}]
    }
  }


  componentDidMount(){
    this.props.getFriend();
    this.props.getPosts();
    axios.get('/api/info/').then(res => {
    this.setState({myInfo: res.data})
    socket.emit('userOnline', res.data[0].user_name)
    setInterval(function(){socket.emit('userOnline', res.data[0].user_name)}, 30000)
    this.props.setCurrentUser(this.state.myInfo[0].user_name)
  });
  }

  render() {
    var newsfeedCards = this.props.posts.map((person, index) => {

      return (
        <Cards key={person.post_id}
          name={person.user_name}
          profilePic={person.profile_pic}
          likes={person.post_like}
          content={person.post_content}
          id={person.post_id}
          userid={person.user_auth_id}
          image={person.post_url}
        />
      )
    })
    var style = {
      width: '50%',
      marginLeft: '200px'
    }
    return(
      <div className='newsfeed_wrapper' style={style}>
        <div>
          <InputField profilepic={this.state.myInfo[0].profile_pic}/>
          {newsfeedCards}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    friends: state.friends,
    posts: state.posts,
    currentUser: state.currentUser
  }
}



export default connect(mapStateToProps, {setCurrentUser,getFriend, getPosts})(Newsfeed)
