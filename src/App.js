import {BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Header from './Components/Header/Header';


import Admin from './Components/Admin/Admin';
import React, { Component } from 'react';
import Order from './Components/Admin/Order';
import Customer from './Components/Admin/Customer';


class App extends Component {
  
  render() { 
    return ( 
     
    <Router> 
      
      <Routes>
      <Route path='/' Component={Header}/>
      <Route path='/adminmenu' Component={Admin}/>
      <Route path='/adminmenu/Order' Component={Order}/>
      <Route path='/adminmenu/Order/customer' Component={Customer}/>
      </Routes>
   </Router> 
    
     );
  }
}
 
export default App;

