 import React, {Component} from 'react';
 import axios from 'axios';
 import onClickOutSide from 'react-onclickoutside';

 class ArrowKey extends Component {
  constructor(props){
    super(props)
    this.state = {
      showedit: false
    }
  }
  handleClickOutside(){
    this.setState({
      showedit: false
    })
  }

  onOpenMenu(){
    this.setState({
      showedit: !this.state.showedit
    })
  }


  onDeleteClick(){
    if(this.props.thetype === 'post'){
      axios.delete(`/api/post/${this.props.id}`)
      .then(res => {
        this.props.reloadPosts();
        console.log('sent Successfully')})

    }
    else if (this.props.thetype === 'comment'){
      axios.delete(`/api/comment/${this.props.id}`)
      .then(res => {
        this.props.reload();
        console.log('sent Successfully')})
    }
  }

  render(){
    var displayNone = {
      display: 'none'
    }

    var displayWhite = {
      backgroundColor: 'transparent',
      border: 'none'
    }
    return(

      <div  className='the_edit_arrow' style={this.state.showedit ? null : displayWhite}>
        <i className="fa fa-angle-down"
          onClick={this.onOpenMenu.bind(this)}
          aria-hidden="true"
          style={this.props.theshow ? null : displayNone}
          ></i>
        <div style={this.state.showedit ? null : displayNone} className='the_edit_menu'>
          <button onClick={this.props.toggleEdit}>Edit</button>
          <button onClick={this.onDeleteClick.bind(this)}>Delete</button>
        </div>
      </div>
    )
  }
 }

 export default onClickOutSide(ArrowKey)
