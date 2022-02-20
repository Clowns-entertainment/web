import React from 'react';
import { Form } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import CheckFormComponent from '../FormComponents/CheckFromComponent/';
import ButtonFormComponent from '../FormComponents/ButtonFromComponent';
import UsernameFormComponent from '../FormComponents/UsernameFormComponent';
import PasswordFormComponent from '../FormComponents/PasswordFormComponent';
import { Navigate } from 'react-router-dom';
import UserContext from '../../../UserContext/UserContext';

type Inputs = {
  Nickname: string;
  Password: string;
  Check: boolean;
};

function Enter() {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (formData, event) => {
    const data = new FormData();
    data.append('password', formData['Password']);
    data.append('nickname', formData['Nickname']);
    // @ts-ignore
    data.append('remember_me', formData['Check']);
    fetch('/api/login', {
      method: 'POST',
      body: data,
    })
      .then((resp) => {
        if (resp.status === 200) {
          console.log('Логин и пароль верны');
          document.location.reload();
        } else {
          console.log('Логин или пароль не верны');
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
        <UsernameFormComponent register={register} />
        <PasswordFormComponent register={register} />
        <CheckFormComponent register={register} />
        <ButtonFormComponent />
      </Form>
    );
  }
}

export default Enter;
