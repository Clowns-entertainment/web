import React, { ReactNode, useState } from 'react';
import { Form } from 'react-bootstrap';
// import LoginFormComponent from '../FormComponents/LoginFormComponent/';
// import PasswordFormComponent from '../FormComponents/PasswordFormComponent/';
import CheckFormComponent from '../FormComponents/CheckFromComponent/';
import ButtonFormComponent from '../FormComponents/ButtonFromComponent';
import { defineMessage, FormattedMessage, useIntl } from 'react-intl';

const msgEnterPassword = defineMessage({ defaultMessage: 'Enter your password' });
const msgEnterUsername = defineMessage({ defaultMessage: 'Enter your username' });

function Enter() {
  const intlPassword = useIntl();
  const intlUsername = useIntl();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const formSend = (event: any) => {
    const data = new FormData();
    data.append('password', password);
    data.append('username', username);
    // data.append("img", img);

    fetch('/api/login', {
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
      <Form.Group className="mb-3" controlId="formBasicLogin">
        <Form.Label>
          <FormattedMessage defaultMessage={'{login}'} values={{ login: (chunks: ReactNode) => '{chunks}' }} />
        </Form.Label>
        <Form.Control
          type="text"
          placeholder={intlUsername.formatMessage(msgEnterUsername)}
          name="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>
          <FormattedMessage defaultMessage={'{password}'} values={{ password: (chunks: ReactNode) => '{chunks}' }} />
        </Form.Label>
        <Form.Control
          type="password"
          placeholder={intlPassword.formatMessage(msgEnterPassword)}
          name="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </Form.Group>
      <CheckFormComponent />
      <ButtonFormComponent />
    </Form>
  );
}

export default Enter;
