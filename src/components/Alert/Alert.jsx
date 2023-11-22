import React from 'react';
import { ToastContainer, Toast } from 'react-bootstrap';

const Alert = ({ alert, setAlert }) => {
  return (
    <ToastContainer position="top-end">
      <Toast
        onClose={() => setAlert({ isShow: false, text: '', variant: '' })}
        show={alert.isShow}
        delay={3000}
        bg={alert.variant}
        autohide
      >
        <Toast.Body>{alert.text}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default Alert;
