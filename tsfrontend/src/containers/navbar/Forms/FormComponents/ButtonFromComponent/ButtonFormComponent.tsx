import React, { ReactNode, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import OverlayButtonFormComponent from './OverlayButtonFormComponent';

// @ts-ignore
function ButtonFormComponent(props) {
  const target = useRef(null);
  return (
    <div>
      <Button variant="primary" type="submit" ref={target}>
        <FormattedMessage defaultMessage={'{buttontext}'} values={{ buttontext: (chunks: ReactNode) => '{chunks}' }} />
      </Button>
      <OverlayButtonFormComponent target={target} show={props.show} type={props.type} />
    </div>
  );
}

export default ButtonFormComponent;
