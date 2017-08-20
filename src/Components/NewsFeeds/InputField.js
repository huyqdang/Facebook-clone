import React, {Component} from 'react'
import axios from 'axios';
import {connect} from 'react-redux';
import { getPosts, getMyPosts } from '../../ducks/reducer';
import Dropzone from 'react-dropzone';

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

class InputField extends Component {
  constructor(props){
    super(props)

    this.state = {
      input: '',
      pictures: [],
      myinfo: this.props.myinfo
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.handleImageSubmit = this.handleImageSubmit.bind(this);
  }

  handleImageSubmit(){
    axios.post('/api/postimage', {image: this.state.pictures, content: this.state.input})
    .then(res => {
    console.log('sent Successfully')
    this.props.getPosts()
    this.props.getMyPosts()
  })
  this.setState({pictures: [], input: ''})

  }

  onDrop(accepted, rejected){
    uploadImage(accepted[0])
    .then(url => {
      this.setState({pictures: url})
      alert('You successfully chose your picture, write a caption and hit Upload ^-^')
  })
  }


  handleInputChange(event){
    this.setState({
      input: event.target.value
    })
  }

  handleInputSubmit(){
    axios.post('/api/posts', {postContent: this.state.input})
    .then(res => {
      this.props.getPosts()
      this.props.getMyPosts()

    })
    this.setState({
      input: ''
    })
  }

  render(){
    var avatar = {
      backgroundImage: `url('${this.props.profilepic}')`,
      backgroundSize: 'cover',
    }
    return(

      <div className='input_card'>

        <div className="blog-container">

          <div className="blog-header">
            <div className="blog-author--no-cover">
                <div className='avatar' style={avatar}></div>
                <h3>{this.props.name}</h3>
            </div>
          </div>

          <div className="blog-body">
                <div className="form-group">
                  <textarea className="form-control status-box"
                    rows="2"
                    placeholder="What's on your mind?"
                    onChange={this.handleInputChange}
                    value={this.state.input}
                    ></textarea>
                </div>

          </div>

          <div className="blog-footer">
            <ul className="btn-container">

              {/* <input type='file' onChange={(e) => this.onDrop(e)} accept="image/*" /> */}
              <Dropzone
                className='dropzone'
                onDrop={(accepted, rejected) => this.onDrop(accepted, rejected)}>Choose images</Dropzone>
              <div>
                <button className="upload-btn" onClick={this.handleImageSubmit}>Upload</button>
                <button className="post-btn" onClick={this.handleInputSubmit}>Post</button>
              </div>
            </ul>
          </div>

      </div>




    </div>

    )
  }
}

function mapStateToProps(state){
  return {
    myinfo: state.myinfo
  }
}

export default connect(mapStateToProps, { getPosts, getMyPosts })(InputField)
