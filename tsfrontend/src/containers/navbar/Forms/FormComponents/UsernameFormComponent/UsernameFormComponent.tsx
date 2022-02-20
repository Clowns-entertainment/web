import React, { ReactNode } from 'react';
import { Form } from 'react-bootstrap';
import { defineMessage, FormattedMessage, useIntl } from 'react-intl';

const msgEnterUsername = defineMessage({ defaultMessage: 'Enter your username' });

// @ts-ignore
function UsernameFormComponent({ register }) {
  const intlUsername = useIntl();

  return (
    <Form.Group className="mb-3" controlId="formBasicLogin">
      <Form.Label>
        <FormattedMessage defaultMessage={'{username}'} values={{ username: (chunks: ReactNode) => '{chunks}' }} />
      </Form.Label>
      <Form.Control
        type="text"
        placeholder={intlUsername.formatMessage(msgEnterUsername)}
        {...register('Nickname', { required: true, maxLength: 15, min: 3 })}
      />
    </Form.Group>
  );
}

export default UsernameFormComponent;
