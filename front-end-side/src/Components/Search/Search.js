import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


class Search extends Component {


  render() {
    if(this.props.searchResult.length) {
      var results = this.props.searchResult.map((item, i) => {
        var style = {
        backgroundImage: `url('${item.profile_pic}')`,
        backgroundSize: 'cover',
        // borderRadius: '4px',
        // marginRight: '.5rem',
        position: 'relative',
        top: '8px',
        width: '50px',
        height: '50px',
        marginRight: '10px',
        }
        return (
          <Link to={`/newsfeed/friend/${item.user_id}/${item.user_auth_id}`} key={i}>
          <div className='search_cards'>
            <div style={style} className='search_avatar'></div>
            <div>
              <h3>{item.user_name}</h3>
              <h5>'{item.bio}'</h5>
              <p>From: {item.user_location}</p>
            </div>
          </div>
        </Link>
        )
      })
    }
    else {
      var fail = (
          <div className='search_cards'>
            <div>
              <h3>Sorry, We Can't Find This Person In Our Database</h3>
            </div>
          </div>)

    }
    return(
      <div className='search_wrapper'>

        <h1> People</h1>
        <div>
          {/* {console.log(this.state.loaded)} */}
          {this.props.searchResult.length ? results : fail}
        </div>
      </div>
    )

  }
}

function mapsStatetoProps(state){
  return {
    searchResult: state.search,
    loading: state.loadingSearch,
    error: state.error
  }
}

export default connect(mapsStatetoProps)(Search)
