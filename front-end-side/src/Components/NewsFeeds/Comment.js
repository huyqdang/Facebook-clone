import React, {Component} from 'react';
import axios from 'axios';

class Comments extends Component {
  constructor(props){
    super(props)

    this.state = {
      like: null
    }
    this.onLikeClick = this.onLikeClick.bind(this);
  }

  onLikeClick(){
    this.setState({
      like: !this.state.like
    })
    if(!this.state.like) {
      axios.post(`/api/comment/like/${this.props.id}`)
      .then(res => {
        this.props.reload();
      })
    }
    else if (this.state.like){
      axios.post(`/api/comment/unlike/${this.props.id}`)
      .then(res => this.props.reload())
      .catch(err => console.log(err))
    }
  }

  render(){
    var likestyle = {
      color: '#4C66A4'
    }

    var style = {
    backgroundImage: `url('${this.props.profilePic}')`,
    backgroundSize: 'cover',
    top: '8px',
    width: '30px',
    height: '30px',
    marginRight: '10px'
    }

    return(
      <div className="comment_wrapper">
        <div className="comment_card">
          <div className="comment_profile">
            <div style={style}></div>
            <h5>{this.props.name}</h5>
          </div>
          <div>
            <div className='comment_content'>
              <p>{this.props.content}</p>
            </div>
          </div>

        </div>
        <i className="fa fa-thumbs-o-up comment_like_icon"
          aria-hidden="true"
          style={this.state.like ? likestyle : null}
          onClick={this.onLikeClick}
          > {this.props.likes} </i>
      </div>
    )
  }
}

export default Comments
