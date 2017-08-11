import React, {Component} from 'react';
import Cards from '../NewsFeeds/Card';
import InputField from '../NewsFeeds/InputField';

class Profile extends Component {
  render() {
    return(
      <div className='profile_wrapper'>

        <div className='profile_banner'>
          <div className='profile_avatar'>
          </div>
        </div>

        <div className='profile_bottom_part'>

          <div className='profile_left_side'>
            <div className='info'></div>
            <div className='info'></div>
          </div>

          <div className='profile_right_side'>
            <InputField />
            <Cards />

          </div>

        </div>

      </div>
    )
  }
}

export default Profile
