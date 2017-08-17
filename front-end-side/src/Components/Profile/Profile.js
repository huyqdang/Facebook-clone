import React, {Component} from 'react';
import Cards from '../NewsFeeds/Card';
import InputField from '../NewsFeeds/InputField';
import { connect } from 'react-redux';
import { getMyPosts, getFriend} from '../../ducks/reducer';
import axios from 'axios';
import Dropzone from 'react-dropzone'

const uploadImage = (file) => {
  return axios.post("/api/getSignedURL", {
    filename: file.name,
    filetype: file.type
  })
  .then(res => {
    let options = {
      headers: {
        'Content-Type': file.type
      }
    }
    return axios.put(res.data.url, file, options)
    .then(res => {
       return res.config.url.match(/.*\?/)[0].slice(0,-1)
    })
  })
}


class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      myInfo: [{name: '', profile_pic:'',bio:''}],
      newprofile: '',
      newbanner: ''
    }
    this.onDropProfile = this.onDropProfile.bind(this);
    this.onDropBanner = this.onDropBanner.bind(this);
  }

  onDropProfile(accepted, rejected){
    uploadImage(accepted[0])
    .then(url =>{
      axios.put('/api/changepp', {image: url})
      .then(res => {
        console.log('Upload Successfully');
        axios.get('/api/info/').then(res => {this.setState({myInfo: res.data})})
      })
    })
  }


  onDropBanner(accepted, rejected){
    uploadImage(accepted[0])
    .then(url => {
      axios.put('/api/changebanner', {image: url})
      .then(res => {
        console.log('Upload Successfully');
        axios.get('/api/info/').then(res => {this.setState({myInfo: res.data})})
      })
    })
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
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }

    var style2 = {
      backgroundImage: `url(${this.state.myInfo[0].banner})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }

    return(
      <div className='profile_wrapper'>

        <div className='profile_banner' style={style2}>
          <div className='profile_avatar' style={style}>
            <Dropzone
              className='profile_pic_upload'
              onDrop={(accepted, rejected) => this.onDropProfile(accepted, rejected)}>
              <i className="fa fa-camera" aria-hidden="true"></i>
              Choose images
            </Dropzone>
            <h1>{this.state.myInfo[0].user_name}</h1>
          </div>
            <Dropzone
              className='banner_pic_upload'
              onDrop={(accepted, rejected) => this.onDropBanner(accepted, rejected)}>
              <div className='banner_btn_container'>
                <i className="fa fa-camera" aria-hidden="true"></i>
                <p>Update cover photo</p>
              </div>
            </Dropzone>
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
            <InputField name={this.state.myInfo[0].user_name} profilepic={this.state.myInfo[0].profile_pic}/>
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
