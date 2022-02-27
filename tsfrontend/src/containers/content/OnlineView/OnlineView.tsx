import React from 'react';
import Online from './Online';

type propsTypes = {
  login: string;
};

export default function OnlineView(props: any) {
  return (
    <>
      {props.online.map((online: propsTypes, i: number) => {
        return <Online login={online.login} key={i} />;
      })}
    </>
  );
}
