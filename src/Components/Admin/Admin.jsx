import React, { useState ,useEffect} from 'react';

import './Admin.css'
import ModalCategory from './ModalAddCategory';
import ModalOrder from './ModalOrder';
import ModalRemoveCategory from './ModalRemoveCategory';
const Admin = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
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
      console.log(data);
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <nav>
        <ModalCategory />
        <ModalOrder />
      </nav>
      {categories.map((category, index) => {
        return (
          <div className="ProductsContainer" key={index}>
          <div className="ProductsHeader">
            <div className="ButtonsContainer">
              <ModalRemoveCategory name={category.name}/>
              <h1 style={{ fontStyle: 'italic' }} className="ProductsHeading">
                {category.name}
              </h1>
              <button className="AddButton">Add MenuItem</button>
            </div>
          </div>
        </div>
        );
      })}
    </div>
  );
};

export default Admin;