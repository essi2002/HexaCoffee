import React from 'react';
import { Modal } from 'react-bootstrap';
import { useState ,useRef} from 'react';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import './ModalAddItem.css'


const ModalAddItem = ({category, getMenu }) => {
    const [show, setShow] = useState(false);
  
    const handleClose = () =>{
 
      setShow(false);
    }
    const handleShow = () => {
      
      setShow(true);
    }

    const inputName = useRef();
    const inputImage = useRef();
    const inputIngredients = useRef();
    const inputPrice = useRef();
    const selectSize = useRef(); 
    const selectCoffee = useRef();

    

    const handleSubmit = async () => {
      const nameOf = inputName.current.value;
      const ingredients = inputIngredients.current.value;
      const price = inputPrice.current.value;
      const pic = inputImage.current.value[0];
      const size = selectSize.current.value;
      const coffee = selectCoffee.current.value;
    
      const formData = new FormData();
      formData.append('name', nameOf);
      formData.append('pic',pic)
      formData.append('ingredients', ingredients);
      formData.append('price', price);
      formData.append('category',category)
      formData.append('size', size);
      formData.append('coffeeCombination', coffee);
    
       await fetch('/adminmenu/', {
          method: 'POST',
          // headers: {
          //   'Content-Type': 'application/json',
          //  },
          body:formData, //JSON.stringify(Object.fromEntries(formData)),
      });
      getMenu();
      handleClose();
    };
       
    
    
    const sizeChoices = ["S",
    "M"];
    const coffeeCombinationChoices = ["S","R"]
    return ( 
        <>
              
        <button onClick={handleShow} className='addCategory'> add menuItem</button>
        <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add MenuItem</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form enctype="multipart/form-data">
            
            <Form.Group
            
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>name</Form.Label>
              <Form.Control  as="textarea" rows={1} ref={inputName}  />
            </Form.Group>


            <Form.Group controlId="exampleForm.ControlInput2">
              <Form.Label>Upload Picture</Form.Label>
              <Form.Control type="file" accept="image/*" ref={inputImage} />
              <Form.Text className="text-muted">
                Please select an image file (jpg, png, gif).
              </Form.Text>
            </Form.Group>



            <Form.Group
            
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>ingredients</Form.Label>
              <Form.Control  as="textarea" rows={2} ref={inputIngredients} />
            </Form.Group>
            <Form.Group
            
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>price</Form.Label>
              <Form.Control  as="textarea" rows={1} ref={inputPrice} />
            </Form.Group>
            <Form.Group controlId='exampleForm.ControlSelect1'>
              <Form.Label>sizeChoices</Form.Label>
              <Form.Control as='select' ref={selectSize}>
                {/* Map through categories array and render option for each category */}
                {sizeChoices.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='exampleForm.ControlSelect1'>
              <Form.Label>CoffeeCombination</Form.Label>
              <Form.Control as='select' ref={selectCoffee}>
                {/* Map through categories array and render option for each category */}
                {coffeeCombinationChoices.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button    variant="primary" onClick={handleSubmit} >
            Submit
          </Button>
        </Modal.Footer>
        </Modal>
        </>
     );
}
 
export default ModalAddItem;