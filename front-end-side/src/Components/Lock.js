import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function LockScreen() {
  return (
    <div>
      <div className="header">

  		<div className="logo">
  			<img src="http://gourmetlearning.com/wordpress/wp-content/uploads/2016/09/bam-facebook-logo.png" alt='logo' />
  		</div>

  		<div className="giris">
  			<input type="text" placeholder="username" />
  			<input type="password" placeholder="password" />
        {/* ==============IMPORTANT BUTTON================== */}


        <a href='http://localhost:8080/auth/callback'>
          <button> Login </button>
        </a>


          <button onClick={() => {
            axios.get('/api/hello')
            .then( res => console.log(res)).catch(err=> console.log(err))
          }}>Hollo</button>

  		</div>
  	</div>

  	<div className="container">
  		<div className="soltaraf">
  		<b>Facebook helps you connect and share with the people in yourlife.</b>
  		<img src="https://www.facebook.com/rsrc.php/v3/yx/r/pyNVUg5EM0j.png" alt='banner'/>
  		</div>

  		<div className="kayit">
  		<h1>Create An Account</h1>
  		<p>Its free and always be.</p>
  		<input className="kutus1" type="text" placeholder="First name" />
  		<input className="kutus1" type="text" placeholder="Surname" />
  		<input className="kutus2" type="text" placeholder="E-mail" />
  		<input className="kutus2" type="password" placeholder="password" />
  		<small className='policy'>By clicking Create an account, You agree to our term and condition and confirm that you have read our Data Policy, including our Cookie Policy. You may receive SMS from Facebook at anytime. </small>
  		<button><b>Sign Up</b></button>
  		</div>
  	</div>

  	<div className="footer">
  		This is a facebook clone page using
  		<a>React</a>
  		<a>Redux</a>
  		<a>Nodejs</a>
  		<a>Peerjs</a>
  		<a>Socket.io</a>
      <a>Amazon S3</a>
      <a>Web RTC</a>
  	</div>
  </div>
  )
}

export default LockScreen
