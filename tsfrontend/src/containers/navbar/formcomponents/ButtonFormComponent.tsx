import React, { ReactNode } from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

export default function ButtonFormComponent() {
  return (
    <Button variant="primary" type="submit">
      <FormattedMessage defaultMessage={'{buttontext}'} values={{ buttontext: (chunks: ReactNode) => '{chunks}' }} />
    </Button>
  );
}
