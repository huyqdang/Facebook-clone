import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getPosts, getMyPosts} from '../../ducks/reducer';
import axios from 'axios';
import Comments from './Comment';
import ArrowKey from './ArrowKey';


class Cards extends Component {
  constructor(props){
    super(props)

    this.state = {
      like: null,
      comment: [],
      commentDisplay: false,
      postsElement: 'post',
      showarrow: false,
      showedit: false,
      currentvalue: this.props.content
    }
    this.onLikeClick = this.onLikeClick.bind(this);
    this.onCommentClick = this.onCommentClick.bind(this);
    this.onInputSubmit = this.onInputSubmit.bind(this);
    this.onEditInputChange= this.onEditInputChange.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
  }
  onEditClick(){
      axios.put('/api/post',{ postid: this.props.id, newPostContent: this.state.currentvalue} )
      .then(res => this.props.getPosts())
    // else if (this.props.thetype === 'comment'){
    //   axios.put('/api/comment',{ commentid: this.props.id, newCommentContent: 'SubjectChange'})
    //   .then(res => console.log('sent Successfully'))
    // }
    this.onEditToggle()
  }

  onShowEditInput(){
    this.setState({
      showeditInput: !this.state.showeditInput
    })
  }

  onEditInputChange(e){
    this.setState({
      currentvalue: e.target.value
    })
  }
  onEditToggle(){
    this.setState({
      showedit: !this.state.showedit
    })
  }

  onLikeClick(){
    this.setState({
      like: !this.state.like
    })
    if(!this.state.like) {
      axios.post(`/api/like/${this.props.id}`).then(res => {
        this.props.getPosts()
        this.props.getMyPosts()
      })
    }
    else if (this.state.like){
      axios.post(`/api/unlike/${this.props.id}`).then(res => {
        this.props.getPosts()
        this.props.getMyPosts()
      })
    }
  }

  componentDidMount(){
    axios.get(`/api/comment/${this.props.id}`).then(res => {
      this.setState({comment: res.data})
    })
  }

  componentWillMount(){
    if(this.props.myInfo[0].user_auth_id === this.props.userid){
      this.setState({showarrow: true})
    }
  }

  onCommentClick(){
    this.setState({
      commentDisplay: !this.state.commentDisplay
    })
  }

  onInputSubmit(e){
    if(e.which === 13) {
      axios.post(`/api/comment/${this.props.id}`, {commentContent: e.target.value})
      .then(res => {
        axios.get(`/api/comment/${this.props.id}`).then(res => {
          this.setState({comment: res.data})
        })
      })

      e.target.value = '';
    }
  }

  changeCommentState(){
    axios.get(`/api/comment/${this.props.id}`).then(res => {
      this.setState({comment: res.data})
    })
  }

  render(){

    var likestyle = {
      color: '#4C66A4'
    }

    var editbtn = {
      backgroundColor: '#4C66A4',
      border: 'none',
      width: '100px',
      height: '30px',
      color:'white',
      borderRadius: '4px',
      fontSize: '14px',
    }

    var image = {
      backgroundImage: `url('${this.props.image}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100%',
      height: '500px',
      marginTop: '20px'
    }

    var style = {
    backgroundImage: `url('${this.props.profilePic}')`,
    backgroundSize: 'cover',
    borderRadius: '4px',
    // marginRight: '.5rem',
    position: 'relative',
    top: '8px',
    width: '50px',
    height: '50px',
    marginRight: '10px',
    }
    var style2 = {
    backgroundImage: `url('${this.props.profilePic}')`,
    backgroundSize: 'cover',
    width: '30px',
    height: '30px',
    marginLeft: '10px',
    }
    var displayNone = {
      display: 'none'
    }

    var comments = this.state.comment.map(comment => (
      <Comments key={comment.comment_id}
      id={comment.comment_id}
      profilePic={comment.profile_pic}
      name={comment.user_name}
      content={comment.comment_content}
      likes={comment.comment_like}
      reload={this.changeCommentState.bind(this)}
      userid={comment.user_auth_id}
      />
    ))

    return (

      <div className='card_wrapper'>

        <div className="blog-container">
          <div className="blog-header">
            <div className="blog-author--no-cover">
                <div style={style}></div>
                <h3>{this.props.name}</h3>
                <ArrowKey thetype={this.state.postsElement}
                  theshow={this.state.showarrow}
                  reloadPosts={this.props.getPosts}
                  id={this.props.id}
                  toggleEdit={this.onEditToggle.bind(this)}
                />
            </div>
          </div>

          <div className="blog-body">
            <div className="blog-title">

            </div>
            <div className="blog-summary">
              <div style={this.props.image ? image : displayNone}></div>
              <p style={this.state.showedit ? displayNone : null}>{this.props.content}</p>
              <div style={this.state.showedit ? null : displayNone}>
              <textarea className='post_edit_field'
                onChange={this.onEditInputChange}
                value={this.state.currentvalue}
                ></textarea>
                <button className='editbtn01'
                  style={editbtn}
                  onClick={this.onEditClick}>Submit Edit</button>
              </div>
            </div>
            <div className="blog-tags">
              {/* <ul>
                <li><a href="#">design</a></li>
                <li><a href="#">web dev</a></li>
                <li><a href="#">css</a></li>
              </ul> */}
            </div>
          </div>

          <div className="blog-footer">
            <ul >
              <li>

                <i className="fa fa-thumbs-o-up"
                  aria-hidden="true"
                  style={this.state.like ? likestyle : null}
                  onClick={this.onLikeClick}
                  > {this.props.likes} </i>
                <i className="fa fa-comment-o"
                  aria-hidden="true"
                  style={this.state.commentDisplay ? likestyle : null}
                  onClick={this.onCommentClick}
                  >{this.state.comment.length}</i>
              </li>

            </ul>
          </div>

        </div>
        <div className='comment_section' style={this.state.commentDisplay ? null : displayNone}>
          <div className='comment_input'>
            <div style={style2}></div>
            <input placeholder='Write a comment...'
                  onKeyPress={this.onInputSubmit}
            />
          </div>
          <div>
          {comments}
          </div>
        </div>


      </div>
    )

  }
}

function mapStateToProps(state){
  return{
    myInfo: state.myinfo
  }
}

export default connect(mapStateToProps,{getPosts, getMyPosts})(Cards)
