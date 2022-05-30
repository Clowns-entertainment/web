import React from 'react';
import { Button } from 'react-bootstrap';
import { useSearchParams, useNavigate } from 'react-router-dom';
// eslint-disable-next-line
type Inputs = {
  SearchStr: string;
};

export default function Searching() {
  // eslint-disable-next-line
  let [searchParams, setSearchParams] = useSearchParams();
  let user = searchParams.get('user');
  const navigate = useNavigate();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let newUser = formData.get('user') as string;
    if (!newUser) return;
    navigate('/searching?request=' + newUser);
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <label>
          <input defaultValue={user ?? undefined} type="text" name="user" placeholder="Поиск цитат по нику" />
        </label>
        <Button variant="primary" type="submit">
          Поиск
        </Button>
      </form>
    </>
  );
}
