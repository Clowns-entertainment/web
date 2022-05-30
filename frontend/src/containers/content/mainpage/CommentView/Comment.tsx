import React from 'react';

type propsType = {
  username: string;
  text: string;
};

export default function Comment(props: propsType) {
  return (
    <div>
      <a href={'/profile/' + props.username}>{props.username}</a>
      <div className="Comment-text">{props.text}</div>
    </div>
  );
}
