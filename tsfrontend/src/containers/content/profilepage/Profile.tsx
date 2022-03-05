import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserInfoView from './UserInfoView';
import CommentView from '../mainpage/CommentView/CommentView';
import { useParams } from 'react-router-dom';

export default function Profile() {
  // @ts-ignore
  let { id } = useParams();
  const username = id;
  const [info, setInfo] = useState([]);
  const data = new FormData();
  // @ts-ignore
  data.append('username', username);
  const getData = async (url: string) => {
    const response = await fetch(url, {
      method: 'POST',
      body: data,
    });
    return await response.json();
  };
  useEffect(() => {
    getData('/api/user_info_construct').then((data) => setInfo(data));
  }, []);

  return (
    <Row>
      {info.length > 0 ? (
        <>
          <Col>
            <h1>Информация о пользователе</h1>
            <UserInfoView user={info[0]} />
          </Col>
          <Col>
            <h1>Цитаты {username}</h1>
            <CommentView comments={info[1]} />
          </Col>
        </>
      ) : (
        <b>Данные отсутствуют</b>
      )}
    </Row>
  );
}
