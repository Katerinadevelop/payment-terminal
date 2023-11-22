import React, { useState } from 'react';
import { operators } from '../../utils/constans';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Container } from 'react-bootstrap';
import Alert from '../../utils/Alert';

import AddModal from './Modals/AddModal';

import './styles.css';

const MainPage = () => {
  const savedOperators = localStorage.operators
    ? JSON.parse(localStorage.operators)
    : operators;

  const [allOperators, setAllOperators] = useState(savedOperators);
  const [isOpenAddModal, setIsAddOpenModal] = useState(false);
  const [alert, setAlert] = useState({ isShow: false, text: '', variant: '' });

  const navigate = useNavigate();

  const handleCloseModal = () => setIsAddOpenModal(false);

  const saveOperator = (newOperator) => {
    if (newOperator && newOperator.name) {
      const operator = { ...newOperator };
      operator.value = operator.name.toLowerCase();
      if (!operator.icon)
        operator.icon = 'https://static.thenounproject.com/png/1852834-200.png';
      operator.id = Math.floor(Math.random() * 100) + Date.now();
      const newOperators = [...allOperators];
      newOperators.concta([operator]);
      localStorage.setItem('operators', JSON.stringify(newOperators));
      setAllOperators(newOperators);
      setAlert({
        isShow: true,
        text: 'Operator successfully added',
        variant: 'success',
      });
      setIsAddOpenModal(false);
    } else {
      setAlert({
        isShow: true,
        text: 'Please enter a custom operator name',
        variant: 'warning',
      });
    }
  };

  return (
    <>
      <Alert alert={alert} setAlert={setAlert} />
      <Container>
        <h4>Select an operator to refill the balance</h4>
        <Row xs={12}>
          {allOperators.map((operator) => (
            <Col xs={12} md={4} key={operator.id}>
              <Card
                text="dark"
                className="mb-2 card"
                onClick={() => navigate(`payment/${operator.id}`)}
              >
                <Card.Header>{operator.name}</Card.Header>
                <Card.Body className="d-flex align-items-center justify-content-center card-body">
                  <img
                    src={operator.icon}
                    alt={operator.name}
                    width="100%"
                    className="img custom-operator-img"
                  />
                </Card.Body>
              </Card>
            </Col>
          ))}
          <Col xs={12} md={4}>
            <Card
              text="dark"
              className="mb-2 card"
              onClick={() => setIsAddOpenModal(true)}
            >
              <Card.Header>Add custom operator</Card.Header>
              <Card.Body className="d-flex align-items-center justify-content-center card-body">
                <img
                  src="https://cdn3.iconfinder.com/data/icons/stroke/53/Button-512.png"
                  alt="Add operator icon"
                  className="img custom-operator-img"
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <AddModal
        isOpen={isOpenAddModal}
        handleClose={handleCloseModal}
        saveOperator={saveOperator}
      />
    </>
  );
};

export default MainPage;
