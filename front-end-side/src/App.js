import React, { Component } from 'react';
import './App.css';
import { Link } from "react-router-dom";
import Navbar from './Components/Navbar'

class App extends Component {
  render() {
    return (
      <div>

        <Navbar />

        {this.props.children}

        <Link to='/newsfeed/search'>
          <button> Go to search </button>
        </Link>
        <Link to='/newsfeed/profile'>
          <button> Go to Profile </button>
        </Link>

      </div>
    );
  }
}

export default App;
