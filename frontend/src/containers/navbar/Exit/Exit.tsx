import React from 'react';
import UserContext from '../../UserContext/UserContext';
// @ts-ignore
import { Navigate } from 'react-router-dom';

function Exit() {
  // @ts-ignore
  const { setUserContext } = React.useContext(UserContext);

  fetch('/api/exit').then((resp) => {
    if (resp.status === 200) {
      setUserContext({ isAuthorized: false });
    }
  });
  return <Navigate to="/" replace />;
}

export default Exit;
