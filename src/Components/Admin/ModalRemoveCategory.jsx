import React from 'react';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';


import './ModalRemoveCategory.css';

const ModalRemoveCategory = ({ name, getMenu}  ) => {
  const [show, setShow] = useState(false);
 

  const handleShow = () => {
  
    setShow(true);
  };

  const handleClose = () => {
   
    setShow(false);
  };

  const handleSubmit = async () => {
    await fetch(`/adminmenu`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ body: name }), // Send the name in the request body
    });
    getMenu();
    handleClose();
  };

  return (
    <>
      <button onClick={handleShow} className="RemoveButton">
        -
      </button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Remove category</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this category?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalRemoveCategory;