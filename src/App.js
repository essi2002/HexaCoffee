import {BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Header from './Components/Header/Header';


import Admin from './Components/Admin/Admin';
import React, { Component } from 'react';

class App extends Component {
  
  render() { 
    return ( 
     
    <Router> 
     
      <Routes>
      <Route path='/' element={<Header/>}/>
      <Route path='/adminmenu' element={<Admin/>}/>
      
      </Routes>
   </Router> 
    
     );
  }
}
 
export default App;

