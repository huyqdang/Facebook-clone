import React, {Component} from 'react';
import axios from 'axios';
import ArrowKey from './ArrowKey';
import {connect} from 'react-redux';

class Comments extends Component {
  constructor(props){
    super(props)

    this.state = {
      like: null,
      element: 'comment',
      arrowshow: false,
      showedit: false,
      currentvalue: this.props.content
    }
    this.onLikeClick = this.onLikeClick.bind(this);
    this.onEditInputChange= this.onEditInputChange.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
  }

  componentWillMount(){
    if(this.props.myInfo[0].user_auth_id === this.props.userid){
      this.setState({showarrow: true})
    }
  }

  onEditToggle(){
    this.setState({
      showedit: !this.state.showedit
    })
  }

  onEditInputChange(e){
    this.setState({
      currentvalue: e.target.value
    })
  }

  onEditClick(){
      // axios.put('/api/post',{ postid: this.props.id, newPostContent: this.state.currentvalue} )
      // .then(res => this.props.getPosts())
    // else if (this.props.thetype === 'comment'){
      axios.put('/api/comment',{ commentid: this.props.id, newCommentContent: this.state.currentvalue})
      .then(res => this.props.reload())
    // }
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

    var displayNone = {
      display: 'none'
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
            <ArrowKey thetype={this.state.element}
              theshow={this.state.showarrow}
              id={this.props.id}
              reload={this.props.reload}
              toggleEdit={this.onEditToggle.bind(this)}
            />
          </div>
          <div>
            <div className='comment_content'>
              <p style={this.state.showedit ? displayNone : null}>
                {this.props.content}</p>
              <div style={this.state.showedit ? null : displayNone}>
                <input className='comment_edit_field'
                  onChange={this.onEditInputChange}
                  value={this.state.currentvalue}
                  ></input>
                <button onClick={this.onEditClick}>Submit Edit</button>
              </div>
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

function mapStateToProps(state){
  return{
    myInfo: state.myinfo
  }
}

export default connect(mapStateToProps)(Comments)
