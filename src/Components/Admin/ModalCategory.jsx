import React from 'react';
import { Modal } from 'react-bootstrap';
import { useState ,useRef} from 'react';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import './ModalCategory.css'
const ModalCategory = () => {
    const [show, setShow] = useState(false);
    const [nameCategory,setName] = useState('')
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const inputRef = useRef();

    const handleSubmit = async () =>{
       const inputValue = inputRef.current.value;
       setName(inputValue);
      let response = await fetch(`/adminmenu/`,
       {
        method:"POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ body: nameCategory })
       }
       );
       console.log(response);
       handleClose();
    };
    return (
      <>
        
        <button onClick={handleShow} className='addCategory'> add Category</button>
        <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>name</Form.Label>
              <Form.Control as="textarea" rows={1} ref={inputRef} />
            </Form.Group>
          </Form>
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
 
export default ModalCategory;