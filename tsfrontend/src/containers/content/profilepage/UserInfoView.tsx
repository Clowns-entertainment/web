import React from 'react';
import UserInfo from './UserInfo';

export default function UserInfoView(props: any) {
  return (
    <>
      <UserInfo username={props.user.username} email={props.user.email} />
    </>
  );
}
