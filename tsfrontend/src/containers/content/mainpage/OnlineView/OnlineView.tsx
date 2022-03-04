import React from 'react';
import Online from './Online';

type propsTypes = {
  username: string;
};

export default function OnlineView(props: any) {
  return (
    <>
      {props.online.map((online: propsTypes, i: number) => {
        return <Online username={online.username} key={i} />;
      })}
    </>
  );
}
