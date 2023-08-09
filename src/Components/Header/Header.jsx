import React from 'react';
import './Header.css'


import {Link } from 'react-router-dom';


import '../Navigation/Navigation.css'

function Header() {


  return (
    <div className="container-fluid main">
      
    
      <nav>
        <ul class="nav-type">
        <Link to='/adminmenu'>
          <li><p className='active'>Admin</p></li>
        </Link>
        <Link to='/usermenu' >
          <li><p className='active1'>User</p></li>
        </Link>
        <Link to='/admin'>
          <li><p className='active2'>About</p></li>
        </Link>

       
    

          
          <div class="line"></div>
          
        </ul>
      </nav>
      
  
  
  <div  className="carousel carousel-fade slide">
    <div className="carousel-inner" role="listbox">
    <div class="item active background a"></div>
    
    </div>
  </div>
   
  <div className="covertext">
    <div className="col-lg-10" style={{ float: 'none', margin: '0 auto' }}>
      <h1 style={{ fontStyle: 'italic' }} className="title">HexaCoffee</h1>
      <h3 className="subtitle">A Tidy, Clean, Easy-to-Use, and Responsive coffee shop with Humble waiters</h3>
    </div>
    <div className="col-xs-12 explore">
     
    </div>
  </div>
  
</div>
  );
}

export default Header;