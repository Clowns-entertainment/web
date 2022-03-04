import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cookies from 'js-cookie';
import UserInfoView from './UserInfoView';
import UserQuotsView from './UserQuotsView';

export default function Profile(props) {
  const [data, setData] = useState([]);

  const getData = async (url) => {
    const response = await fetch(url);
    return await response.json();
  };
  useEffect(() => {
    getData('/api/user_info_construct').then((data) => setData(data));
  }, []);

  return (
    <Row>
      {data.length > 0 ? (
        <>
          <Col>
            <h1>Информация о пользователе</h1>
            <UserInfoView user={data[0]} />
          </Col>
          <Col xs={9}>
            <h1>Цитаты {Cookies.get('auth')}</h1>
            <UserQuotsView comments={data[1][Cookies.get('auth')]} />
          </Col>
        </>
      ) : (
        <b>Loading...</b>
      )}
    </Row>
  );
}
