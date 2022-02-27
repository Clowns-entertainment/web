import React from 'react';

type propsType = {
  login: string;
};

export default function Comment(props: propsType) {
  return (
    <div>
      <div className="UserInfo-name">{props.login}</div>
    </div>
  );
}
