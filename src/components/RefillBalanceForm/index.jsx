import React, { useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

import './styles.css';

import Alert from '../../utils/Alert';

import { operators } from '../../utils/constans';

const RefillBalanceForm = () => {
  const params = useParams();
  const navigate = useNavigate();

  const savedOperators = localStorage.operators
    ? JSON.parse(localStorage.operators)
    : operators;
  const operator = savedOperators.find(
    (item) => String(item.id) === params.operatorId
  );

  const [paymentInformation, setPaymentInformation] = useState({
    phone: '+7',
    amount: '',
  });
  const [alert, setAlert] = useState({ isShow: false, text: '', variant: '' });

  const getPhoneMask = (value) => {
    let phoneNumber = value;
    const input = phoneNumber.replace(/\D/g, '').substring(1, 11);
    const zip = input.substring(0, 3);
    const first = input.substring(3, 6);
    const middle = input.substring(6, 8);
    const last = input.substring(8, 10);

    if (input.length > 8) {
      phoneNumber = `+7 (${zip}) ${first}-${middle}-${last}`;
    } else if (input.length > 6) {
      phoneNumber = `+7 (${zip}) ${first}-${middle}`;
    } else if (input.length > 3) {
      phoneNumber = `+7 (${zip}) ${first}`;
    } else if (input.length > 0) {
      phoneNumber = `+7 (${zip}`;
    } else if (input <= 0) {
      phoneNumber = '+7 ';
    }
    return phoneNumber;
  };

  const getAmountMask = (value) => {
    let amountOfRefill = value;
    const input = amountOfRefill.replace(/\D/g, '').substring(0, 5);
    const total = input.substring(0, 3);

    if (total > 1 && total < 1000) {
      if (input.length > 0) {
        amountOfRefill = `${total} RUB`;
      } else {
        amountOfRefill = '';
      }
    } else {
      setAlert({
        isShow: true,
        text: 'The amount of replenishment must be from 1 ruble to 1000 rubles',
        variant: 'danger',
      });
      amountOfRefill = `${total} RUB`;
    }
    return amountOfRefill;
  };

  const handleChange = (value, type) => {
    if (type === 'amount') {
      value = getAmountMask(value);
    }

    if (type === 'phone') {
      value = getPhoneMask(value);
    }

    const payment = { ...paymentInformation };
    payment[type] = value;
    setPaymentInformation(payment);
  };

  const sendData = () => {
    const params = { ...paymentInformation };
    if (params.amount < 1 || params.amount > 1000) {
      setAlert({
        isShow: true,
        text: 'The amount of replenishment must be from 1 ruble to 1000 rubles',
        variant: 'danger',
      });
      return;
    }

    params.operatorId = operator.id;
    const res = [200, 400];
    const random = Math.floor(Math.random() * res.length);

    if (res[random] === 200) {
      setTimeout(() => navigate('/'), 3000);
    } else if (res[random] === 400) {
      setTimeout(
        () =>
          setAlert({
            isShow: true,
            text: 'Oops... Something was wrong',
            variant: 'danger',
          }),
        3000
      );
    }
  };

  return (
    <>
      <Alert alert={alert} setAlert={setAlert}/>
      <Container>
        <Row>
          <Col xs={6} md={6}>
            <h4>{operator.name}</h4>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Phone number +7 (XXX) XXX-XX-XX</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                value={paymentInformation.phone}
                onChange={(e) => handleChange(e.target.value, 'phone')}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Amount of refill (RUB)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter amount of refill"
                value={paymentInformation.amount}
                onChange={(e) => handleChange(e.target.value, 'amount')}
              />
            </Form.Group>

            <Button variant="primary" onClick={sendData}>
              Submit
            </Button>
          </Col>

          <Col xs={6} md={6} className="d-flex">
            <img
              src={operator.icon}
              alt={`${operator.name} icon`}
              width="100%"
              className="operator-img"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RefillBalanceForm;
