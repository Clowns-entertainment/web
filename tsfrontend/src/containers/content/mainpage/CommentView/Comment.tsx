import React from 'react';
// @ts-ignore
import Cookies from 'js-cookie';

// function formatDate(date) {
//   return date.toLocaleDateString();
// }

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
