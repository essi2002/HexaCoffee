import React from 'react';
import { Modal } from 'react-bootstrap';
import { useState} from 'react';
import Button from 'react-bootstrap/Button';

import './ModalRemoveCategory.css'

const ModalRemoveCategory = ({name}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    const handleSubmit = async () =>{
       await fetch(``,{
        method:'DELETE',
        headers:{
          'Content-Type': 'application/json'
      },
      body:JSON.stringify(name)
    })
       handleClose();
    };
    return (
      <>
        <button onClick={handleShow}  className="RemoveButton">Remove Category</button>
       
        <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Remove category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this category?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button   variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
        </Modal>
      </>
    );
}
 
export default ModalRemoveCategory;