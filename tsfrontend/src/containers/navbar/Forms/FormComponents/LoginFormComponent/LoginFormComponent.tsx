import React, { ReactNode } from 'react';
import { Form } from 'react-bootstrap';
import { defineMessage, FormattedMessage, useIntl } from 'react-intl';

const msgEnterUsername = defineMessage({ defaultMessage: 'Enter your username' });

function LoginFormComponent(setUsername: any, username: any) {
  const intlUsername = useIntl();

  return (
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
  );
}

export default LoginFormComponent;
