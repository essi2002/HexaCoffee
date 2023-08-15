import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import './Customer.css';


const Customer = () => {
  const location = useLocation();
  const state = location.state;
  console.log(location.pathname);
  console.log(state)

  
 
  const categories = state.categories;
  const selectedItems = state.selectedItems;
  const menuItems =  state.menuItems;
  console.log(selectedItems);
  console.log(categories);
  console.log(menuItems);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [showFirstForm,setShowFirstForm] = useState(true);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [name, setName] = useState('');
  const [showReceipt,setReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);


  const [customers, setCustomers] = useState([]);

const addOrder = async() =>{
  const formData = new FormData();
  formData.append('phoneNumber',phoneNumber);
  formData.append('items',receiptData);
   const response = await fetch('adminmenu/Order/customer',{
    method:'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(Object.fromEntries(formData)),
   })
}
const getCustomers = async () => {
  try {
    const response = await fetch('/adminmenu/Order/customer', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch customers');
    }

    const data = await response.json();
    setCustomers(data);
  } catch (error) {
    console.error(error);
  }
};


 const addCustomer = async()=>{
    const formData = new FormData();
    formData.append('fullName',name);
    formData.append('phoneNumber',phoneNumber)
    const response = await fetch('/adminmenu/Order/customer/',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)),
    });
    const data = response.json();
    console.log(data)
 }


useEffect(() => {
    getCustomers();
      const updatedReceiptData = selectedItems.map((item) => {
     
      const quantity = item.quantity;
      const price = item.price;
     
      console.log(price);
      const subtotal = quantity * price;
  
      return {
        id: item.id,
        name: item.name,
        quantity,
        price,
        subtotal,
      };
    });
  
    const totalPrice = updatedReceiptData.reduce((total, item) => total + item.subtotal, 0);
  
    setReceiptData(updatedReceiptData);
    setTotalPrice(totalPrice);
  }, [selectedItems, menuItems]);

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if a customer with the entered phone number exists
    const customer = customers.find((customer) => customer.phoneNumber === phoneNumber);
    if (customer) {
      // Customer found
      console.log('Customer found:', customer);
      setName(customer.fullName);
      setShowFirstForm(false);
      setShowSecondForm(false);
      setIsHeaderVisible(false);
      setReceipt(true);
      addOrder();
    } else {
      
      console.log('Customer not found');
    
      setName('');
      setShowFirstForm(false);
      setShowSecondForm(true);
    }
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  
  const handleSecondFormSubmit = (event) => {
    event.preventDefault();
   
    console.log('Name:', name);
    
    
    addCustomer();
    setIsHeaderVisible(false);
    setShowSecondForm(false);
    setShowFirstForm(false);
    setReceipt(true);
    addOrder();
  };


  return (
    <div className="form-container">
      {isHeaderVisible && <h2>Phone Number Search</h2>}
      {showFirstForm && (
        <Form onSubmit={handleSubmit} className="search-form">
          <Form.Group controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </Form.Group>
         
        </Form>
      )}
      {showSecondForm && (
        <Form onSubmit={handleSecondFormSubmit} className="second-form">
          <Form.Group controlId="name">
            <Form.Label> full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter fullname"
              value={name}
              onChange={handleNameChange}
            />
          </Form.Group>
          <Form.Group controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </Form.Group>
          
          <Button  variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
      {showReceipt && (
        <>
        <h1 className='name'>{name}</h1>
        <h2 className='phone'>{phoneNumber}</h2>
        <h3>Receipt:</h3>
        <div class="table-wrapper">  
 <table class="fl-table">
  <thead>
    <tr>
      <th>picture</th>
      <th>Name</th>
      <th>Quantity</th>
      <th>Price</th>
      <th>Subtotal</th>
    </tr>
  </thead>
  <tbody>
    {receiptData.map((item) => (
      <tr key={item.name}>
        <td>{item.picture}</td>
        <td>{item.name}</td>
        <td>{item.quantity}</td>
        <td>{item.price}</td>
        <td>{item.subtotal}</td>
      </tr>
    ))}
    </tbody>
       </table>
         </div>
        <h3>Total Price: {totalPrice}</h3>
        </>
      )

      }
    </div>
  );
};

export default Customer;