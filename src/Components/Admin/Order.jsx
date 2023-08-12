import React, { useState ,useEffect} from 'react';



const Order = () => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState({});
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
              
              <div className='ProductWrapper'>
                {menuItems[category]?.map((menuitem,Itemindex)=>{
                    return(
                        <div className='productCard' key={Itemindex}>
                            <img src={menuitem.picture} alt=''  className='ProductImg'/>
                            <div className='ProductInfo'>
                               <h2 className='ProductTitle'>{menuitem.name}</h2>
                               <p className='ProductDesc'>{menuitem.ingredients}</p>
                               <p className='ProductPrice'>{menuitem.price}</p>
                               <button className='ProductButton'>Remove Item</button>
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
}
 
export default Order;