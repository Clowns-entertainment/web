import React, { ReactNode } from 'react';
import { Form } from 'react-bootstrap';
import { defineMessage, FormattedMessage, useIntl } from 'react-intl';

const msgEnterEmail = defineMessage({ defaultMessage: 'Enter your email' });

// @ts-ignore
function EmailFormComponent({ register }) {
  const intlEmail = useIntl();

  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>
        <FormattedMessage defaultMessage={'{email}'} values={{ email: (chunks: ReactNode) => '{chunks}' }} />
      </Form.Label>
      <Form.Control
        type="email"
        placeholder={intlEmail.formatMessage(msgEnterEmail)}
        {...register('Email', { required: true })}
      />
      <Form.Text className="text-muted">
        <FormattedMessage defaultMessage={'{emailtext}'} values={{ emailtext: (chunks: ReactNode) => '{chunks}' }} />
      </Form.Text>
    </Form.Group>
  );
}

export default EmailFormComponent;
