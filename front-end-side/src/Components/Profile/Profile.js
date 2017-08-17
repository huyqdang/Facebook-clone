import React, {Component} from 'react';
import Cards from '../NewsFeeds/Card';
import InputField from '../NewsFeeds/InputField';
import { connect } from 'react-redux';
import { getMyPosts, getFriend} from '../../ducks/reducer';
import axios from 'axios';


class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      myInfo: [{name: '', profile_pic:'',bio:''}]
    }
  }



  componentDidMount(){
    this.props.getMyPosts();
    this.props.getFriend();
    axios.get('/api/info/').then(res => {this.setState({myInfo: res.data})
  });

  }

  render() {
    let myposts = this.props.myPosts.map((post, i) => {
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

    return(
      <div className='profile_wrapper'>

        <div className='profile_banner'>
          <div className='profile_avatar' style={style}>
          </div>
        </div>

        <div className='profile_bottom_part'>

          <div className='profile_left_side'>
            <div className='info'>
              {this.state.myInfo[0].bio}
            </div>
            <div className='friend-info'>

            </div>
          </div>

          <div className='profile_right_side'>
            <InputField name={this.state.myInfo[0].user_name}/>
            {myposts}

          </div>

        </div>

      </div>
    )
  }
}

function mapStateToProps(state){
  console.log(state);
  return {
    myInfo: state.myinfo,
    myPosts: state.myposts,
    myfriends: state.friends
  }
}

export default connect (mapStateToProps, {getMyPosts, getFriend})(Profile)
