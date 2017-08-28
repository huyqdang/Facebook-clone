import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import LockScreen from './Components/Lock';
import Newsfeed from './Components/NewsFeeds/NewsFeeds';
import Search from './Components/Search/Search';
import Profile from './Components/Profile/Profile';
import {Provider} from 'react-redux';
import store from './ducks/store';
import FriendProfile from './Components/Profile/FriendProfile'
import VideoChat from './Components/VideoChat'




ReactDOM.render(
  <Router>
   <Provider store={store}>
     <div>
     <Route exact path='/' component={LockScreen}></Route>
     <Route path='/newsfeed' render={(props) => (
       <App {...props} >
         <Switch>
           <Route path='/newsfeed/search' component={Search} />
           <Route path='/newsfeed/profile' component={Profile} />
           <Route path='/newsfeed/friend/:id/:authid' component={FriendProfile} />
           <Route component={Newsfeed} />
         </Switch>
       </App>

     )}>

     </Route>
     <Route path='/videochat' component={VideoChat} />

     </div>
   </Provider>
  </Router>
  , document.getElementById('root'));
