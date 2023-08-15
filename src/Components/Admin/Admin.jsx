import React, { useState ,useEffect} from 'react';

import './Admin.css'
import ModalCategory from './ModalAddCategory';
//import ModalOrder from './ModalOrder';
import ModalRemoveCategory from './ModalRemoveCategory';
import ModalAddItem from './ModalAddItem';
import { Link } from 'react-router-dom';
/*
import americano_60percent_arabika from '../image/americano 60percent arabika.png'
import americano_100percent_arabika from '../image/americano 100percent arabika.png'
import apple_and_walnut_cake from '../image/apple and walnut cake.png'
import big_plain_croissant from '../image/big plain croissant.png'
import biscuit_cream_milkshake from '../image/biscuit cream milkshake.png'
import brewing_coffee from '../image/brewing coffee.png'
import cappuccino_60percent_arabika from '../image/cappuccino 60percent arabika.png'
import cappuccino_100percent_arabika from '../image/cappuccino 100percent arabika.png'
import caramel_machiato_60percent_arabika from '../image/caramel machiato 60 percent arabika.png'
import caramel_machiato_100percent_arabika from '../image/caramel machiato 100percent arabika.png'
import cheese_croissant from '../image/cheese croissant.png'
import cherry_crumble from '../image/cherry crumble.png'
import chocolate_twist from '../image/chocolate twist.png'
import cinnamon_honey_milk from '../image/cinnamon honey milk.png'
import cinnamon_roll from '../image/cinnamon roll.png'
import coffee_milkshake from '../image/coffee milkshake.png'
import cortado_60percent_arabika from '../image/cortado 60percent arabika.png'
import cortado_100percent_arabika from '../image/cortado 100percent arabika.png'
import denish_blackberry from '../image/denish blackberry.png'
import herbal_tea from '../image/herbal tea.png'
import hot_chocolate from '../image/hot chocolate.png'
import hot_milk from '../image/hot milk.png'
import ice_caramel_macchiato_60percent_arabika from '../image/ica caramel macchiato 60percent arabika.png'
import ice_americano_60percent_arabika from '../image/ice americano 60percent arabika.png'
import ice_americano_100percent_arabika from '../image/ice americano 100percent arabika.png'
import ice_caramel_macchiato_100percent_arabika from '../image/ice caramel macchiato 100percent arabika.png'
import ice_chocolate from '../image/ice chocolate.png'
import ice_latte_60percent_arabika from '../image/ice latte 60percent arabika.png'
import ice_latte_100percent_arabika from '../image/ice latte 100percet arabika.png'
import ice_mocha_60percent_arabika from '../image/ice mocha 60percent arabika.png'
import ice_mocha_100percent_arabika from '../image/ice mocha 100percent arabika.png'
import ice_tea from '../image/ice tea.png'
import latte_60percent_arabika from '../image/latte 60percent arabika.png'
import latte_100percent_arabika from '../image/latte 100percent arabika.png'
import lotus_cheese_cake from '../image/lotus cheese cake.png'
import mars_cheese_cake from '../image/mars cheese cake.png'
import mocha_60prcent_arabika from '../image/mocha 60prcent arabika.png'
import mocha_100prcent_arabika from '../image/mocha 100percent arabika.png'
import peanut_milkshake from '../image/peanut milkshake.png'
import pen_chocolate from '../image/pen chocolate.png'
import tea_masala from '../image/tea masala.png'
import tea from '../image/tea.png'
*/
const Admin = () => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState({});

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
      console.log(categories);
      console.log(menuItems)
    } catch (error) {
      console.error(error);
    }

  };

  const RemoveItem = async (menuItem) =>{
    const formData = new FormData();
    formData.append('name', menuItem.name);
    formData.append('picture',menuItem.picture);
    formData.append('ingredients', menuItem.ingredients);
    formData.append('price', menuItem.price);
    formData.append('category',menuItem.category)
    formData.append('size', menuItem.size);
    formData.append('coffeeCombination', menuItem.coffeeCombination);
  
    await fetch('/adminmenu/',{
      method:'DELETE',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(Object.fromEntries(formData))
      
    });
    await getMenu();
  };

  useEffect(() => {
    const fetchMenuData = async () => {
      await getMenu();
    };
    fetchMenuData();
  }, []);
/*
  const getImagePath = (imageName) => {
    switch (imageName) {
      case 'americano 60percent arabika':
        return americano_60percent_arabika;
      case 'americano 100percent arabika':
        return americano_100percent_arabika;
      case 'apple and walnut cake':
        return apple_and_walnut_cake;
      case 'big plain croissant':
        return big_plain_croissant;
      case 'biscuit cream_milkshake':
        return biscuit_cream_milkshake;
      case 'brewing coffee':
        return brewing_coffee;
      case 'cappuccino 60percent arabika':
        return cappuccino_60percent_arabika;
      case 'cappuccino 100percent arabika':
        return cappuccino_100percent_arabika;
      case 'caramel machiato 60percent arabika':
        return caramel_machiato_60percent_arabika;
      case 'caramel machiato 100percent arabika':
        return caramel_machiato_100percent_arabika;
      case 'cheese croissant':
        return cheese_croissant;
      case 'cherry crumble':
        return cherry_crumble;
      case 'chocolate twist':
        return chocolate_twist
      case 'cinnamon honey milk':
        return cinnamon_honey_milk
      case 'cinnamon roll':
        return cinnamon_roll;
      case 'coffee milkshake':
        return coffee_milkshake;
      case 'cortado 60percent arabika':
        return cortado_60percent_arabika;
      case 'cortado 100percent arabika':
        return cortado_100percent_arabika;
      case 'denish blackberry':
        return denish_blackberry;
      case 'herbal tea':
        return herbal_tea;
      case 'hot chocolate':
        return hot_chocolate;
      case 'hot milk':
        return hot_milk;
      case 'ice caramel macchiato 60percent arabika':
        return ice_caramel_macchiato_60percent_arabika;
      case 'ice americano 60percent arabika':
        return ice_americano_60percent_arabika;
      case 'ice americano 100percent arabika':
        return ice_americano_100percent_arabika;
      case 'ice caramel macchiato 100percent arabika':
        return ice_caramel_macchiato_100percent_arabika;
      case 'ice chocolate':
        return ice_chocolate;
      case 'ice latte 60percent arabika':
        return ice_latte_60percent_arabika;
      case 'ice latte 100percent arabika':
        return ice_latte_100percent_arabika;
      case 'ice_mocha_60percent_arabika':
        return ice_mocha_60percent_arabika;
      case 'ice mocha 100percent arabika':
        return ice_mocha_100percent_arabika;
      case 'ice tea':
        return ice_tea;
      case 'latte 60percent arabika':
        return latte_60percent_arabika;
      case 'latte 100percent arabika':
        return latte_100percent_arabika;
      case 'lotus cheese cake':
        return lotus_cheese_cake;
      case 'mars cheese cake':
        return mars_cheese_cake;
      case 'mocha 60prcent arabika':
        return mocha_60prcent_arabika;
      case 'mocha 100prcent arabika':
        return  mocha_100prcent_arabika;
      case 'peanut milkshake':
        return peanut_milkshake;
      case 'pen chocolate':
        return pen_chocolate;
      case 'tea masala':
        return tea_masala;
      case 'tea':
        return tea;

     
    
      default:
        return ''; // Return a default image path if the image name is not found
    }
  };
*/
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
             <ModalRemoveCategory category={category}  getMenu={getMenu} />
              <h1 style={{ fontStyle: 'italic' }} className="ProductsHeading">
                {category}
              </h1>
              <ModalAddItem category = {category} getMenu={getMenu}/>
            </div>
          </div>
          
          <div className='ProductWrapper'>
            {menuItems[category]?.map((menuitem,Itemindex)=>{
                return(
                    <div className='productCard' key={Itemindex}>
                        <img src={menuitem.picture} alt='' className='ProductImg' />
                        <div className='ProductInfo'>
                           <h2 className='ProductTitle'>{menuitem.name}</h2>
                           <p className='ProductDesc'>{menuitem.ingredients}</p>
                           <p className='ProductPrice'>{menuitem.price}</p>
                           <button onClick={() => RemoveItem(menuitem)} className='ProductButton'>Remove Item</button>
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