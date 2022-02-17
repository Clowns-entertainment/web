import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import LoginFormComponent from '../FormComponents/LoginFormComponent/';
import PasswordFormComponent from '../FormComponents/PasswordFormComponent/';
import CheckFormComponent from '../FormComponents/CheckFromComponent/';
import ButtonFormComponent from '../FormComponents/ButtonFromComponent';

function Enter() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const formSend = (event: any) => {
    const data = new FormData();
    data.append('password', password);
    data.append('username', username);
    // data.append("img", img);

    fetch('/api/enter', {
      method: 'POST',
      body: data,
    })
      .then((resp) => {
        if (resp.status === 200) {
          console.log('Логин и пароль верны');
        } else {
          console.log('Логин или пароль не верны');
        }
      })
      .catch((err) => {
        document.location.reload();
        console.error(err);
      });
    event.preventDefault();
  };
  return (
    <Form onSubmit={formSend}>
      <LoginFormComponent setUsername={setUsername} username={username} />
      <PasswordFormComponent setPassword={setPassword} username={password} />
      <CheckFormComponent />
      <ButtonFormComponent />
    </Form>
  );
}

export default Enter;
