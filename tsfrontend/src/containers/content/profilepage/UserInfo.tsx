import React from 'react';

type propsTypes = {
  username: string;
  email: string;
};

export default function UserInfo(props: propsTypes) {
  return (
    <div className="Online">
      <div className="UserInfo">
        {/*<img className="Avatar" src={'data:image/jpeg;base64, ' + props.img} />*/}
        <div className="UserInfo-name">{props.username}</div>
        <div className="UserInfo-name">{props.email}</div>
      </div>
    </div>
  );
}
