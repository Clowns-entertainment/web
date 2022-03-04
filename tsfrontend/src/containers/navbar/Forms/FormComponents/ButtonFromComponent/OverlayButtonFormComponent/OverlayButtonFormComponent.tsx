import { Overlay } from 'react-bootstrap';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

// @ts-ignore
function OverlayButtonFormComponent(props) {
  console.log(props.type);
  return (
    <div>
      {props.type === 'email is taken' ? (
        <Overlay target={props.target.current} show={props.show} placement="right">
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div
              {...props}
              style={{
                backgroundColor: 'rgba(255, 100, 100, 0.85)',
                padding: '2px 10px',
                color: 'white',
                borderRadius: 3,
                ...props.style,
              }}
            >
              EMail занят
            </div>
          )}
        </Overlay>
      ) : props.type === 'email server not available' ? (
        <Overlay target={props.target.current} show={props.show} placement="right">
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div
              {...props}
              style={{
                backgroundColor: 'rgba(255, 100, 100, 0.85)',
                padding: '2px 10px',
                color: 'white',
                borderRadius: 3,
                ...props.style,
              }}
            >
              Соединение с почтовым сервером не установлено, попробуйте позднее
            </div>
          )}
        </Overlay>
      ) : props.type === 'username is taken' ? (
        <Overlay target={props.target.current} show={props.show} placement="right">
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div
              {...props}
              style={{
                backgroundColor: 'rgba(255, 100, 100, 0.85)',
                padding: '2px 10px',
                color: 'white',
                borderRadius: 3,
                ...props.style,
              }}
            >
              Введенный логин занят
            </div>
          )}
        </Overlay>
      ) : props.type === 'unexpected error' ? (
        <Overlay target={props.target.current} show={props.show} placement="right">
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div
              {...props}
              style={{
                backgroundColor: 'rgba(255, 100, 100, 0.85)',
                padding: '2px 10px',
                color: 'white',
                borderRadius: 3,
                ...props.style,
              }}
            >
              Неизвестная ошибка сервера
            </div>
          )}
        </Overlay>
      ) : (
        <Overlay target={props.target.current} show={props.show} placement="right">
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div
              {...props}
              style={{
                backgroundColor: 'rgba(255, 100, 100, 0.85)',
                padding: '2px 10px',
                color: 'white',
                borderRadius: 3,
                ...props.style,
              }}
            >
              Логин или пароль не верны
            </div>
          )}
        </Overlay>
      )}
    </div>
  );
}

export default OverlayButtonFormComponent;
