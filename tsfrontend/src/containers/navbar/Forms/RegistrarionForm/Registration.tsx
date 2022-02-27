import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import UsernameFormComponent from '../FormComponents/UsernameFormComponent/';
import EmailFormComponent from '../FormComponents/EmailFromComponent/';
import PasswordFormComponent from '../FormComponents/PasswordFormComponent/';
import ButtonFormComponent from '../FormComponents/ButtonFromComponent';
import UserContext from '../../../UserContext/UserContext';
import { Navigate } from 'react-router-dom';

type Inputs = {
  Email: string;
  Nickname: string;
  Password: string;
};

function Registration() {
  const [show, setShow] = useState(false);
  const [typeOfMessage, setTypeOfMessage] = useState('');
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    const data = new FormData();
    data.append('email', formData['Email']);
    data.append('password', formData['Password']);
    data.append('nickname', formData['Nickname']);
    fetch('/api/register', {
      method: 'POST',
      body: data,
    })
      .then((resp) => {
        if (resp.status === 200) {
          console.log('Регистрация прошла успешно');
          setShow(false);
          document.location.reload();
        } else if (resp.status === 403) {
          console.log('EMail занят');
          setShow(true);
          setTypeOfMessage('email is taken');
          console.log(resp.status);
        } else if (resp.status === 504) {
          console.log('Соединение с почтовым сервером не установлено, попробуйте позднее');
          setShow(true);
          setTypeOfMessage('email server not available');
          console.log(resp.status);
        }
      })
      .catch((err) => {
        document.location.reload();
        console.error(err);
      });
  };
  // @ts-ignore
  const { userContext } = React.useContext(UserContext);
  if (userContext.isAuthorized) return <Navigate to="/" replace />;
  else {
    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <EmailFormComponent register={register} />
        <UsernameFormComponent register={register} />
        <PasswordFormComponent register={register} />
        <ButtonFormComponent type={typeOfMessage} show={show} />
      </Form>
    );
  }
}

export default Registration;
