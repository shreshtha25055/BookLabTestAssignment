import React from 'react';
import {BrowserRouter as Router,Route,Redirect} from 'react-router-dom'
import LoginPage from './LoginPage';
import MainPage from './MainPage'
export default function AdminRouter(props) {
 return(
  <Router>
 
<div>

  <Route path='/' exact strict component={LoginPage}  history={props.history}/>
  <Route path='/MainPage' exact strict component={MainPage}  history={props.history}/>

</div>

  </Router>  

  

 )
}