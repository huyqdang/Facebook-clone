 import React, {Component} from 'react';
 import axios from 'axios';

 class ArrowKey extends Component {
  constructor(props){
    super(props)
    this.state = {
      nothing: null
    }
  }


  render(){
    var displayNone = {
      display: 'none'
    }
    return(

      <div style={this.props.theshow ? null : displayNone}>
        <i className="fa fa-angle-down" aria-hidden="true"></i>
        <div>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
    )
  }
 }

 export default ArrowKey
