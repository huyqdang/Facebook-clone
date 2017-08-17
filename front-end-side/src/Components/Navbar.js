import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {search} from '../ducks/reducer';
import io from 'socket.io-client';
const socket = io('http://localhost:8080');


class Navbar extends Component {
  constructor(props){
    super(props)
    this.state = {
      input: ''
    }
  }
  searchForTerm(e){
    if(e.which === 13){
      this.props.search(this.state.input);
      this.setState({
        input: ''
      })
    }
  }

  onInputChange(e){
    this.setState({
      input: e.target.value
    })
  }

  onSearchClick(){
    this.props.search(this.state.input);
    this.setState({
      input: ''
    })
  }

  render(){

      var style2 = {
      backgroundImage: `url('${this.props.profilepic}')`,
      backgroundSize: 'cover',
      width: '25px',
      height: '25px',
      borderRadius: '2px'
      }

    return(
      <div className="bar">
        <Link to='/newsfeed'>
          <span className='icon is-medium'>
            <i className="fa fa-facebook-official" aria-hidden="true"></i>
          </span>
        </Link>


  			<div className="inner">
  				<input id="search"
            onChange={this.onInputChange.bind(this)}
            type="search"
            className="search-input"
            value={this.state.input}
            placeholder="Search for people, places and things"
            onKeyPress={this.searchForTerm.bind(this)}
          />

          <Link to='/newsfeed/search'>
            <button className="search-btn" onClick={this.onSearchClick.bind(this)}>
              <span className='icon is-small'>
                <i className="fa fa-search" aria-hidden="true"></i>
              </span>
            </button>
          </Link>

  			</div>

        <Link to='/newsfeed/profile'>
          <div className='profile_btn'>
            <div style={style2}></div>
            <p> {this.props.name} </p>
          </div>
        </Link>


        <a href='http://localhost:8080/auth/logout'>
          <div className='logoutbtn'>

            <button onClick={() => {
            axios.get('/auth/logout')
            .then( res => console.log(res,'client logout')).catch(err=> console.log(err))
            socket.emit('logout', this.props.currentUser);
          }}><i className="fa fa-power-off" aria-hidden="true"></i> Logout </button>
          </div>
        </a>


		</div>
    )
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
  }
}

export default connect (mapStateToProps, {search})(Navbar)
