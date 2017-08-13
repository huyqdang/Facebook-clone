import React, {Component} from 'react';
import Cards from './Card';
import InputField from './InputField';
import {connect} from 'react-redux';
import {getFriend, getPosts} from '../../ducks/reducer';
// import axios from 'axios';

class Newsfeed extends Component {


  componentDidMount(){
    this.props.getFriend();
    this.props.getPosts();
  }

  render() {
    console.log('these are posts:',this.props.posts);
    var newsfeedCards = this.props.posts.map((person, index) => {
      return (
        <Cards key={index}
          name={person.user_name}
          profilePic={person.profile_pic}
          likes={person.post_like}
          content={person.post_content}
          id={person.post_id}
          userid={person.user_auth_id}
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
          <InputField />
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
  }
}



export default connect(mapStateToProps, {getFriend, getPosts})(Newsfeed)
