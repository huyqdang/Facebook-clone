import React, {Component} from 'react'
import Cards from './Card'
import InputField from './InputField'

class Newsfeed extends Component {
  constructor() {
    super()

    this.state = {
      newsfeed: [1,2,3,4,5]
    }
  }
  render() {
    var newsfeedCards = this.state.newsfeed.map((i) => {
      return (
        <Cards />
      )
    })


    return(
      <div>
        <div>
          <InputField />
          {newsfeedCards}
        </div>
      </div>
    )
  }
}

export default Newsfeed
