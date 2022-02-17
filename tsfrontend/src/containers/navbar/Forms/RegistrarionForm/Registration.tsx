import React from 'react';
import { Form } from 'react-bootstrap';
import LoginFormComponent from '../FormComponents/LoginFormComponent/';
import EmailFormComponent from '../FormComponents/EmailFromComponent/';
import PasswordFormComponent from '../FormComponents/PasswordFormComponent/';
import CheckFormComponent from '../FormComponents/CheckFromComponent/';
import ButtonFormComponent from '../FormComponents/ButtonFromComponent';

function Registration() {
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

export default Registration;
