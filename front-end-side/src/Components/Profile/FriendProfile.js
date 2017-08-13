import React, {Component} from 'react';
import Cards from '../NewsFeeds/Card';
// import InputField from '../NewsFeeds/InputField';
import { connect } from 'react-redux';
// import {getMyPosts, getFriend} from '../../ducks/reducer';
import axios from 'axios';
import Navbar from '../Navbar';
import OnlineUserList from '../Chatsystem/Chatlist'
import {getFriend} from '../../ducks/reducer'


class FriendProfile extends Component {
  constructor(props){
    super(props)
    this.state = {
      myInfo: [{name: '', profile_pic:'',bio:''}],
      myPosts:[],
      areFriend: false,
    }
  }


  onAddFriendClick(){
    axios.post('/api/addfriend', {friendId: `${this.props.match.params.authid}`})
    .then(res => this.setState({areFriend: true}))
  }
  componentDidMount(){ //FIX THIS
    axios.get(`/api/friend/info/${this.props.match.params.id}`)
    .then(res => {
      this.setState({
        myInfo: res.data
      })
    })

    axios.get(`/api/friend/posts/${this.props.match.params.id}`)
    .then(res => {
      this.setState({
        myPosts: res.data
      })
    })

  }

  componentWillMount(){
    this.props.friends.forEach(item => {
      if(item.user_auth_id == this.props.match.params.authid) {
        this.setState({areFriend: true})
        this.props.getFriend();
      }
    })
  }

  render() {
    let myposts = this.state.myPosts.map((post, i) => {
      return (
        <Cards key={i}
        id={post.post_id}
        content={post.post_content}
        likes={post.post_like}
        post_url={post.post_url}
        name={this.state.myInfo[0].user_name}
        profilePic={this.state.myInfo[0].profile_pic}
      />
      )
    })

    var style = {
      backgroundImage: `url(${this.state.myInfo[0].profile_pic})`,
      backgroundSize: 'cover'
    }

    var displayNone = {
      display: 'none'
    }

    return(
      <div>
      <Navbar />
      <OnlineUserList />
      <div className='profile_wrapper'>

        <div className='profile_banner'>
          <div className='profile_avatar' style={style}>
          </div>
          <button className='profile_add_btn'
            style={this.state.areFriend ? displayNone : null }
            onClick={this.onAddFriendClick.bind(this)}
            >Add Friend</button>
            <button className='profile_add_btn'
              style={this.state.areFriend ? null : displayNone }
              >Friend</button>
        </div>

        <div className='profile_bottom_part'>

          <div className='profile_left_side'>
            <div className='info'>
              {this.state.myInfo[0].bio}
              <br />
              {this.state.myInfo[0].user_location}
            </div>
            <div className='friend-info'>

            </div>
          </div>

          <div className='profile_right_side'>
            {myposts}
          </div>

        </div>

      </div>
      </div>
    )
  }
}

function mapsStatetoProps(state){
  return {
    friends: state.friends
  }
}

export default connect(mapsStatetoProps, {getFriend})(FriendProfile)
