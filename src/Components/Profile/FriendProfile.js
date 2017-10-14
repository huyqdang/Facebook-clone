import React, {Component} from 'react';
import Cards from '../NewsFeeds/Card';
// import InputField from '../NewsFeeds/InputField';
import { connect } from 'react-redux';
// import {getMyPosts, getFriend} from '../../ducks/reducer';
import axios from 'axios';
// import Navbar from '../Navbar';
// import OnlineUserList from '../Chatsystem/Chatlist'
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
      if(item.user_auth_id === this.props.match.params.authid) {
        this.setState({areFriend: true})
        this.props.getFriend();
      }
    })
  }

  render() {
    console.log('this is what you lkf', this.state.myInfo)
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

    var style2 = {
      backgroundImage: `url(${this.state.myInfo[0].banner})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }

    var style = {
      backgroundImage: `url(${this.state.myInfo[0].profile_pic})`,
      backgroundSize: 'cover'
    }

    var displayNone = {
      display: 'none'
    }

    var top = {
      marginTop: '42px'
    }

    return(
      <div>
      {/* <Navbar /> */}

      <div className='profile_wrapper' style={top}>
      {/* <OnlineUserList style={top}/> */}
        <div className='profile_banner' style={style2}>
          <div className='profile_avatar' style={style}>
          </div>
          <button className='profile_add_btn'
            style={this.state.areFriend ? displayNone : null }
            onClick={this.onAddFriendClick.bind(this)}
            >+ Add Friend</button>
            <button className='profile_add_btn'
              style={this.state.areFriend ? null : displayNone }
              >Friend</button>
        </div>

        <div className='profile_bottom_part'>

          <div className='profile_left_side'>
            <div className='info'>
              <i className="fa fa-info-circle" aria-hidden="true">Info</i>
              <div className='live_info'>
                <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                <h4>{this.state.myInfo[0].bio}</h4>
              </div>
              <div className='live_info'>
                <i className="fa fa-home" aria-hidden="true"></i>
                <h4>Live at: {this.state.myInfo[0].user_location}</h4>
              </div>

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
