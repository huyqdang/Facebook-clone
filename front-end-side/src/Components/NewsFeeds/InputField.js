import React, {Component} from 'react'
import axios from 'axios';
import {connect} from 'react-redux';
import { getPosts, getMyPosts } from '../../ducks/reducer';

class InputField extends Component {
  constructor(props){
    super(props)

    this.state = {
      input: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
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
    return(

      <div className='input_card'>

        <div className="blog-container">

          <div className="blog-header">
            <div className="blog-author--no-cover">
                <div className='avatar'></div>
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
            <ul >
              <button className="post-btn" onClick={this.handleInputSubmit}>Post</button>
            </ul>
          </div>

      </div>




    </div>

    )
  }
}

export default connect(null, { getPosts, getMyPosts })(InputField)
