import React, { ReactNode } from 'react';
import { Form } from 'react-bootstrap';
import { defineMessage, FormattedMessage, useIntl } from 'react-intl';

const msgEnterLogin = defineMessage({ defaultMessage: 'Enter your login' });

export default function LoginFormComponent() {
  const intlLogin = useIntl();

  return (
    <Form.Group className="mb-3" controlId="formBasicLogin">
      <Form.Label>
        <FormattedMessage defaultMessage={'{login}'} values={{ login: (chunks: ReactNode) => '{chunks}' }} />
      </Form.Label>
      <Form.Control type="text" placeholder={intlLogin.formatMessage(msgEnterLogin)} name="login" />
    </Form.Group>
  );
}
