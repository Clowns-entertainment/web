import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  Text: string;
};

export default function FormView() {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (formData, event) => {
    const data = new FormData();
    data.append('text', formData['Text']);
    fetch('/api/quote_post', {
      method: 'POST',
      body: data,
    }).finally(() => document.location.reload());
    // @ts-ignore
    event.preventDefault();
  };

  return (
    <Row>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Комментарий</Form.Label>
          <Form.Control as="textarea" rows={3} type="text" {...register('Text', { required: true })} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Закоментить
        </Button>
      </Form>
    </Row>
  );
}
