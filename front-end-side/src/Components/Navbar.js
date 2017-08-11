import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'

class Navbar extends Component {
  render(){
    console.log('hello')
    return(
      <div className="bar">
        <Link to='/newsfeed'>
          <span className='icon is-medium'>
            <i className="fa fa-facebook-official" aria-hidden="true"></i>
          </span>
        </Link>


  			<div className="inner">
  				<input id="search" type="search" className="search-input" placeholder="Search for people, places and things"/>
  				{/* <span className="fa fa-search" aria-hidden="true" className="search-btn" >
  					<input type="submit" className="searchsubmit" value="" />
  				</span> */}
          <Link to='/newsfeed/search'>
            <button className="search-btn">
              <span className='icon is-small'>
                <i className="fa fa-search" aria-hidden="true"></i>
              </span>
            </button>
          </Link>

  			</div>

        <Link to='/newsfeed/profile'>
          <button> Go to Profile </button>
        </Link>

        <a href='http://localhost:8080/auth/logout'>
          <button onClick={() => {
            axios.get('/auth/logout')
            .then( res => console.log(res,'client logout')).catch(err=> console.log(err))
          }}> Logout </button>
        </a>


		</div>
    )
  }
}

export default Navbar
