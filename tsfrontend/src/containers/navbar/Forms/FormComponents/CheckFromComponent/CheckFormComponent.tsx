import React from 'react';
import { Form } from 'react-bootstrap';
import { defineMessage, useIntl } from 'react-intl';

const msgCheck = defineMessage({ defaultMessage: 'Check me out' });

function CheckFormComponent() {
  const intlCheck = useIntl();

  return (
    <Form.Group className="mb-3" controlId="formBasicCheckbox">
      <Form.Check type="checkbox" label={intlCheck.formatMessage(msgCheck)} />
    </Form.Group>
  );
}

export default CheckFormComponent;
