import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Route, HashRouter as Router, Switch} from 'react-router-dom';
import LockScreen from './Components/Lock'

import Newsfeed from './Components/NewsFeeds/NewsFeeds'
import Search from './Components/Search/Search'
import Profile from './Components/Profile/Profile'





ReactDOM.render(
  <Router>
   <div>
     <Route exact path='/' component={LockScreen}></Route>
     <Route path='/newsfeed' render={() => (
       <App>
         <Switch>
           <Route path='/newsfeed/search' component={Search} />
           <Route path='/newsfeed/profile' component={Profile} />
           <Route component={Newsfeed} />
         </Switch>
       </App>
     )}>

     </Route>
   </div>
  </Router>
  , document.getElementById('root'));
registerServiceWorker();
