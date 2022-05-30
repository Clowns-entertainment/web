import React from 'react';

type propsType = {
  username: string;
};

export default function Comment(props: propsType) {
  return (
    <div>
      <div className="UserInfo-name">{props.username}</div>
    </div>
  );
}
