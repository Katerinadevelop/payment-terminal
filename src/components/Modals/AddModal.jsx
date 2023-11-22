import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddModal = ({ isOpen, handleClose, saveOperator }) => {
  const [newOperator, setNewOperator] = useState({ name: '', icon: '' });

  const handleChange = (value, type) => {
    const operator = { ...newOperator };
    operator[type] = value;
    setNewOperator(operator);
  };

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      show={isOpen}
      onHide={handleClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add custom operator</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Operator name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter operator name"
            value={newOperator.name}
            onChange={(e) => handleChange(e.target.value, 'name')}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Operator icon</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter url"
            value={newOperator.icon}
            onChange={(e) => handleChange(e.target.value, 'icon')}
          />
          <Form.Text className="text-muted">
            Enter url for the custom operator icon
          </Form.Text>
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary">Close</Button>
        <Button
          variant="primary"
          type="button"
          onClick={() => saveOperator(newOperator)}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModal;
