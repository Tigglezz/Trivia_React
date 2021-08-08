import React, { useState } from 'react';
import { Form, Col, Row, Dropdown } from 'react-bootstrap';

import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';

const TimeSlider = () => {

    const [ value, setValue ] = useState(60);
    const [ finalValue, setFinalValue ] = useState(null);

  return (
    <>
     <Form>
      <Form.Group as={Row}>
        <Dropdown.Header>Timer</Dropdown.Header>
        <Col xs="9">
          <RangeSlider
            value={value}
            onChange={changeEvent => setValue(changeEvent.target.value)}
            onAfterChange={e => setFinalValue(e.target.value)}//Sets when stop scrolling
            variant='danger'
            min={0}
            max={120}
            step={10}
            />
        </Col>
        <Col xs="3">
          <Form.Label>{value}</Form.Label>
        </Col>
      </Form.Group>
    </Form>
    </>
  );

};

export default TimeSlider