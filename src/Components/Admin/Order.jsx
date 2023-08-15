import React, { useState, useEffect } from 'react';
import './Order.css';

import {  Link } from 'react-router-dom';

const Order = () => {
  let [categories, setCategories] = useState([]);
  let [menuItems, setMenuItems] = useState({});
  let [selectedItems, setSelectedItems] = useState([]);
  
 
  const getMenu = async () => {
   
    try {
      
      const response = await fetch('/adminmenu/Order/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        
      });

      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }

      const data = await response.json();
      setCategories(data.map((category) => category.category));
      setMenuItems(
        data.reduce((accumulator, category) => {
          accumulator[category.category] = category.menu_items;
          return accumulator;
        }, {})
      );
    } catch (error) {
      console.error(error);
    }
  };


  
  useEffect(() => {
    const fetchData = async () => {
      await getMenu();
      
      
    };
  
    fetchData();
  }, []);
  
  

  console.log(categories);
  console.log(menuItems);
  console.log(selectedItems);




  const handleAddToCart = (item) => {
    if (!selectedItems.find((selectedItem) => selectedItem.name === item.name)) {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  const handleIncreaseQuantity = (item) => {
    const updatedItems = selectedItems.map((selectedItem) => {
      if (selectedItem.name === item.name) {
        return { ...selectedItem, quantity: selectedItem.quantity + 1 };
      }
      return selectedItem;
    });
    setSelectedItems(updatedItems);
   
  };

  const handleDecreaseQuantity = (item) => {
    const updatedItems = selectedItems.map((selectedItem) => {
      if (selectedItem.name === item.name) {
        const updatedQuantity = selectedItem.quantity - 1;
        if (updatedQuantity <= 0) {
          return null; // Remove the item from the list
        }
        return { ...selectedItem, quantity: updatedQuantity };
      }
      return selectedItem;
    });
    setSelectedItems(updatedItems.filter(Boolean)); // Filter out null values
  };

  const handleDeleteItem = (item) => {
    const updatedItems = selectedItems.filter(
      (selectedItem) => selectedItem.name !== item.name
    );
    setSelectedItems(updatedItems);
  };

  const isItemSelected = (item) => {
    return selectedItems.some((selectedItem) => selectedItem.name === item.name);
  };

  
  return (
    <div>
<nav>
  <Link
    to={'/adminmenu/Order/customer'}
    state= {{
      selectedItems: selectedItems,
      categories: categories,
      menuItems: menuItems,
    }}
  >
    <button className='butti'>Place Order</button>
  </Link>
</nav>

      {categories.map((category, index) => {
        return (
          <div className="ProductsContainer" key={index}>
            <div className="ProductsHeader">
              <div className="ButtonsContainer">
                <h1 style={{ fontStyle: 'italic' }} className="ProductsHeading">
                  {category}
                </h1>
              </div>
            </div>

            <div className="ProductWrapper">
              {menuItems[category]?.map((menuitem, Itemindex) => {
                const selectedItem = selectedItems.find(
                  (item) => item.name === menuitem.name
                );

                return (
                  <div className="productCard" key={Itemindex}>
                    <img src={menuitem.picture} alt="" className="ProductImg" />
                    <div className="ProductInfo">
                      <h2 className="ProductTitle">{menuitem.name}</h2>
                      <p className="ProductDesc">{menuitem.ingredients}</p>
                      <p className="ProductPrice">{menuitem.price}</p>
                      <div className="ProductButtonGroup">
                        {isItemSelected(menuitem) && (
                          <>
                            <button
                              className="ProductButton"
                              onClick={() => handleIncreaseQuantity(menuitem)}
                            >
                              +
                            </button>
                            <span >{selectedItem.quantity}</span>
                            <button
                              className="ProductButton"
                              onClick={() => handleDecreaseQuantity(menuitem)}
                            >
                              -
                            </button>
                            <button
                              className="ProductButton"
                              onClick={() => handleDeleteItem(menuitem)}
                            >
                              DELETE
                            </button>
                            
                          </>
                        )}
                        {!isItemSelected(menuitem) && !selectedItem && (
                           <button className="ProductButton" onClick={() => handleAddToCart(menuitem)}>
                            Add to Cart
                           </button>
                         )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Order;

