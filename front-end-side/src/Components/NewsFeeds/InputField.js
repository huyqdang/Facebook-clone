import React, {Component} from 'react'

class InputField extends Component {
  render(){
    return(

      <div className='input_card'>

        <div className="blog-container">

          <div className="blog-header">
            <div className="blog-author--no-cover">
                <div className='avatar'></div>
                <h3>Hello</h3>
            </div>
          </div>

          <div className="blog-body">
                <div className="form-group">
                  <textarea className="form-control status-box" rows="2" placeholder="What's on your mind?"></textarea>
                </div>

          </div>

          <div className="blog-footer">
            <ul >
              <button href="#" className="post-btn">Post</button>
            </ul>
          </div>

      </div>




    </div>

    )
  }
}

export default InputField
