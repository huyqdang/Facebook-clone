import React, { Component } from 'react';


class Navbar extends Component {
  render(){
    console.log('hello')
    return(
      <div className="bar">
        <i className="fa fa-facebook-official" aria-hidden="true"></i>
  			<div className="inner">
  				<input id="search" type="search" className="search-input" Placeholder="Search for people, places and things"/>
  				{/* <span className="fa fa-search" aria-hidden="true" className="search-btn" >
  					<input type="submit" className="searchsubmit" value="" />
  				</span> */}
          <button className="fa fa-search" aria-hidden="true"></button>
  			</div>
        <div>
          Profile
        </div>
        <button>Logout</button>

		</div>
    )
  }
}

export default Navbar
