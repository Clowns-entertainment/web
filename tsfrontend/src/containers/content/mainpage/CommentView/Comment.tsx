import React from 'react';

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
      <div className="UserInfo-name">{props.username}</div>
      <div className="Comment-text">{props.text}</div>
    </div>
  );
}
