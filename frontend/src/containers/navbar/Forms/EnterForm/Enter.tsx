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
          setShow(false);
          document.location.reload();
        } else if (resp.status === 403) {
          setShow(true);
          setTypeOfMessage('login or password is not correct');
        } else if (resp.status === 410) {
          setShow(true);
          setTypeOfMessage('unexpected error');
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
