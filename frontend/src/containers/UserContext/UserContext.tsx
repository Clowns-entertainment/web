import React from 'react';

export const anonymous = {
  isAuthorized: false,
};

export const UserContext = React.createContext(anonymous);

export default UserContext;
