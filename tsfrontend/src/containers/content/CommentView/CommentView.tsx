import React from 'react';
import Comment from './Comment';
import Col from 'react-bootstrap/Col';

type propsTypes = {
  login: string;
  text: string;
};

export default function CommentView(props: any) {
  return (
    <Col>
      {props.comments.map((comment: propsTypes, i: number) => {
        return <Comment text={comment.text} login={comment.login} key={i} />;
      })}
    </Col>
  );
}
