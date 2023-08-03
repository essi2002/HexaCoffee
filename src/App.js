import Header from './Components/Header/Header';
import Products from './Components/Products/Product';
import { productsData, productsDataTwo } from './Components/Products/data'
import React, { Component } from 'react';

function App() {
  return (
    <React.Fragment>
      <Header/>
      <Products Category='Warm' data={productsData}/>

    </React.Fragment>
     
      
     
      
    
    
  );
}

export default App;
