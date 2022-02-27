import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import CheckFormComponent from '../FormComponents/CheckFromComponent/';
import ButtonFormComponent from '../FormComponents/ButtonFromComponent';
import EmailFormComponent from '../FormComponents/EmailFromComponent/';
import PasswordFormComponent from '../FormComponents/PasswordFormComponent';
import { Navigate } from 'react-router-dom';
import UserContext from '../../../UserContext/UserContext';

type Inputs = {
  Email: string;
  Password: string;
  Check: boolean;
};

function Enter() {
  const [typeOfMessage, setTypeOfMessage] = useState('');
  const [show, setShow] = useState(false);
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (formData, event) => {
    const data = new FormData();
    data.append('password', formData['Password']);
    data.append('email', formData['Email']);
    // @ts-ignore
    data.append('remember_me', formData['Check']);
    fetch('/api/login', {
      method: 'POST',
      body: data,
    })
      .then((resp) => {
        if (resp.status === 200) {
          console.log('Логин и пароль верны');
          setShow(false);
          document.location.reload();
        } else if (resp.status === 403) {
          console.log('Exception on the server');
          setShow(true);
          setTypeOfMessage('exception on the server');
          console.log(resp.status);
        } else {
          console.log('Логин или пароль не верны');
          setShow(true);
          setTypeOfMessage('login or password is not correct');
          console.log(resp.status);
        }
      })
      .catch((err) => {
        document.location.reload();
        console.error(err);
      });
    // @ts-ignore
    event.preventDefault();
  };
  // @ts-ignore
  const { userContext } = React.useContext(UserContext);
  if (userContext.isAuthorized) return <Navigate to="/" replace />;
  else {
    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <EmailFormComponent register={register} />
        <PasswordFormComponent register={register} />
        <CheckFormComponent register={register} />
        <ButtonFormComponent type={typeOfMessage} show={show} />
      </Form>
    );
  }
}

export default Enter;
