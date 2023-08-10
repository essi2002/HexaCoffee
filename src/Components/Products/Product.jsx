import React from 'react';
import './product.css'
const Products = ({Category,data}) => {
    return (
        <div className='ProductsContainer'>
          width:100vw;
  min-height: 100vh;
  padding: 5rem calc((100vw - 1300px) / 2);
  background: gray;
  color: #fff;
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