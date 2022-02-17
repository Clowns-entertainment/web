import React, { ReactNode } from 'react';
import { Form } from 'react-bootstrap';
import { defineMessage, FormattedMessage, useIntl } from 'react-intl';

const msgEnterPassword = defineMessage({ defaultMessage: 'Enter your password' });

function PasswordFormComponent(setPassword: any, password: any) {
  const intlPassword = useIntl();

  return (
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
  );
}

export default PasswordFormComponent;
