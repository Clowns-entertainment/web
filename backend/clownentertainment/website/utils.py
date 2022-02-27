import os
from contextlib import asynccontextmanager
from starlette.requests import Request
import logging
from starlette.exceptions import HTTPException
from starlette.authentication import (
    AuthenticationBackend,
    SimpleUser,
    AuthCredentials
)
from starlette.responses import JSONResponse
import notifier.client


@asynccontextmanager
async def JsonParams(request: Request):
    """ Helps to use parameters received in JSON body.
    """
    try:
        params = await request.form()
        yield params
    except (AttributeError, KeyError, ValueError) as exc:
        msg = f"Bad request parameters. {exc}"
        if logging.root.isEnabledFor(logging.DEBUG):
            logging.exception(msg)
        else:
            logging.warning(msg)
        raise HTTPException(400, msg)


async def send_by_email_after_registration(request):
    a = notifier.client.NotificationClient(port=9900, host='localhost')
    try:
        await a.send_by_email_after_registration("artm-porjad@mail.ru")
    except Exception:
        raise Exception('Server is not available')


def get_bool_var(value):
    if value.upper() in ['Y', 'YES', 'TRUE', '1']:
        return True
    elif value.upper() in ['N', 'NO', 'FALSE', '0']:
        return False
    else:
        raise ValueError(f"Invalid value of ${value}")


class BasicAuthBackend(AuthenticationBackend):
    async def authenticate(self, request):
        if not request.cookies.get('auth'):
            return
        login = request.cookies.get('auth')
        return AuthCredentials(['authenticated']), SimpleUser(login)

