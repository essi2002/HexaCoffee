import React from 'react';
import './product.css'
const Products = ({Category,data}) => {
    return (
        <div className='ProductsContainer'>
           <h1 style={{fontStyle :'italic'}} className='ProductsHeading'>{Category}</h1>
           <div className='ProductWrapper'>
            {data.map((product,index)=>{
                return(
                    <div className='productCard' key={index}>
                        <img src={product.img}  className='ProductImg'/>
                        <div className='ProductInfo'>
                           <h2 className='ProductTitle'>{product.name}</h2>
                           <p className='ProductDesc'>{product.desc}</p>
                           <p className='ProductPrice'>{product.price}</p>
                           <button className='ProductButton'>{product.button}</button>
                        </div>
                    </div>

                );
            })};
           </div>
        </div>
      );
}
 
export default Products;