import React from 'react';
import { Form } from 'react-bootstrap';
import LoginFormComponent from '../FormComponents/LoginFormComponent/';
import PasswordFormComponent from '../FormComponents/PasswordFormComponent/';
import CheckFormComponent from '../FormComponents/CheckFromComponent/';
import ButtonFormComponent from '../FormComponents/ButtonFromComponent';

function Enter() {
  return (
    <Form>
      <LoginFormComponent />
      <PasswordFormComponent />
      <CheckFormComponent />
      <ButtonFormComponent />
    </Form>
  );
}

export default Enter;
