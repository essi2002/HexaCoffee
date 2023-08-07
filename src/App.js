import {Routes,Route } from 'react-router-dom';
import Header from './Components/Header/Header';


import Admin from './Components/Admin/Admin';
import React, { Component } from 'react';

class App extends Component {
  
  render() { 
    return ( 
      <React.Fragment>
      <Header/>
      <Routes>
        <Route path='/admin' Component={Admin}/>
      </Routes>
      </React.Fragment>
     );
  }
}
 
export default App;

