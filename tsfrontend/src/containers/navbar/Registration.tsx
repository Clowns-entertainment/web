import React from 'react';
import { Form, Button } from 'react-bootstrap';
import LoginFormComponent from './formcomponents/LoginFormComponent';
import EmailFormComponent from './formcomponents/EmailFormComponent';
import PasswordFormComponent from './formcomponents/PasswordFormComponent';
import CheckFormComponent from './formcomponents/CheckFormComponent';
import ButtonFormComponent from './formcomponents/ButtonFormComponent';

export default function Registration() {
  return (
    <Form>
      <LoginFormComponent />
      <EmailFormComponent />
      <PasswordFormComponent />
      <CheckFormComponent />
      <ButtonFormComponent />
    </Form>
  );
}
