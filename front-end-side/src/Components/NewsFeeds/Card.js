import React, {Component} from 'react';

class Cards extends Component {
  render(){
    return (
      <div>

        <div className="blog-container">

          <div className="blog-header">
            <div className="blog-author--no-cover">
                <div className='avatar'></div>
                <h3>This is my name</h3>
            </div>
          </div>

          <div className="blog-body">
            <div className="blog-title">
              <h1><a href="#">This Post Has No Cover Image</a></h1>
            </div>
            <div className="blog-summary">
              <p>Here is an example of a post without a cover image. You don't always have to have a cover image. In fact, leaving them out from time to time and disrupt the predictive flow and make the overall design more interesting. Something to think about.</p>
            </div>
            <div className="blog-tags">
              {/* <ul>
                <li><a href="#">design</a></li>
                <li><a href="#">web dev</a></li>
                <li><a href="#">css</a></li>
              </ul> */}
            </div>
          </div>

          <div className="blog-footer">
            <ul >
              <li>

                <i className="fa fa-thumbs-o-up" aria-hidden="true"> 20 </i>
                <i className="fa fa-comment-o" aria-hidden="true"> 30 </i>
              </li>
              
            </ul>
          </div>

        </div>

      </div>
    )

  }
}

export default Cards
