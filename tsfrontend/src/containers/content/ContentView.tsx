import CommentView from './CommentView/CommentView';
import FormView from './FormView';
import React, { useEffect, useState } from 'react';
import UserContext from '../UserContext/UserContext';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// @ts-ignore
import Cookies from 'js-cookie';
import OnlineView from './OnlineView/OnlineView';

export default function ContentView() {
  // @ts-ignore
  const { userContext } = React.useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [online, setOnline] = useState([]);

  const getComments = async (url: string) => {
    const response = await fetch(url);
    return await response.json();
  };
  const getOnline = async (url: string) => {
    const response = await fetch(url);
    return await response.json();
  };

  useEffect(() => {
    getComments('/api/quote_get').then((data) => setComments(data));
    getOnline('/api/online_get').then((data) => setOnline(data));
  }, []);

  return (
    <Container>
      <Row>
        {comments.length > 0 || online.length > 0 ? (
          <>
            <Col>
              <h1>В онлайне</h1>
              <OnlineView online={online} />
            </Col>
            <Col xs={9}>
              <h1>Цитаты</h1>
              <CommentView comments={comments} />
            </Col>
            {userContext.isAuthorized && <div>Здравствуйте {Cookies.get('auth')}</div>}
          </>
        ) : (
          <b>Loading...</b>
        )}
      </Row>
      {userContext.isAuthorized ? <FormView /> : <div>Для того чтобы оставить комментарий авторизируйтесь</div>}
    </Container>
  );
}
