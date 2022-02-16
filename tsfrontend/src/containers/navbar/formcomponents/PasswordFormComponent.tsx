import React, { ReactNode } from 'react';
import { Form } from 'react-bootstrap';
import { defineMessage, FormattedMessage, useIntl } from 'react-intl';

const msgEnterPassword = defineMessage({ defaultMessage: 'Enter your password' });

export default function PasswordFormComponent() {
  const intlPassword = useIntl();

  return (
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>
        <FormattedMessage defaultMessage={'{password}'} values={{ password: (chunks: ReactNode) => '{chunks}' }} />
      </Form.Label>
      <Form.Control type="password" placeholder={intlPassword.formatMessage(msgEnterPassword)} name="password" />
    </Form.Group>
  );
}
