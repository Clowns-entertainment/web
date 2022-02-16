import React from 'react';
import { Form } from 'react-bootstrap';
import LoginFormComponent from './formcomponents/LoginFormComponent';
import PasswordFormComponent from './formcomponents/PasswordFormComponent';
import CheckFormComponent from './formcomponents/CheckFormComponent';
import ButtonFormComponent from './formcomponents/ButtonFormComponent';

export default function Enter() {
  return (
    <Form>
      <LoginFormComponent />
      <PasswordFormComponent />
      <CheckFormComponent />
      <ButtonFormComponent />
    </Form>
  );
}
