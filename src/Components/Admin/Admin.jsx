import React, { useState ,useEffect} from 'react';

import './Admin.css'
import ModalCategory from './ModalAddCategory';
//import ModalOrder from './ModalOrder';
import ModalRemoveCategory from './ModalRemoveCategory';
import ModalAddItem from './ModalAddItem';
import { Link } from 'react-router-dom';


const Admin = () => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState({});
  const RemoveItem = async () =>{

  };



  const getMenu = async () => {
    try {
      const response = await fetch('/adminmenu/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }

      const data = await response.json();
      setCategories(data.map(category => category.category));
      setMenuItems(data.reduce((accumulator, category) => {
        accumulator[category.category] = category.menu_items;
        return accumulator;
      }, {}));
    } catch (error) {
      console.error(error);
    }
  };

  
  useEffect(() => {
    const fetchMenuData = async () => {
      await getMenu();
    };
    fetchMenuData();
  }, []);
  return (
    <div>
      <nav>
      
        <ModalCategory getMenu={getMenu} />
        <Link to='/adminmenu/Order'>
         <button className='Ordering'>Ordering</button>
         </Link>
       
        
      </nav>
      {categories.map((category, index) => {
        return (
          <div className="ProductsContainer" key={index}>
          <div className="ProductsHeader">
            <div className="ButtonsContainer">
             <ModalRemoveCategory name={category}  getMenu={getMenu} />
              <h1 style={{ fontStyle: 'italic' }} className="ProductsHeading">
                {category}
              </h1>
             <ModalAddItem name = {category} getMenu={getMenu}/>
            </div>
          </div>
          
          <div className='ProductWrapper'>
            {menuItems[category]?.map((menuitem,Itemindex)=>{
                return(
                    <div className='productCard' key={Itemindex}>
                        <img src={menuitem.picture} alt=''  className='ProductImg'/>
                        <div className='ProductInfo'>
                           <h2 className='ProductTitle'>{menuitem.name}</h2>
                           <p className='ProductDesc'>{menuitem.ingredients}</p>
                           <p className='ProductPrice'>{menuitem.price}</p>
                           <button className='ProductButton' onClick={RemoveItem}>Remove Item</button>
                        </div>
                    </div>

                );
            })};
           </div>
        </div>
        );
      })}
    </div>
  );
};

export default Admin;