import typing as t
from starlette.responses import JSONResponse


def make_login_response(self) -> JSONResponse:
    """ Generates response for success auth
    """
    response = JSONResponse({
        # 'access_token': credentials,
        'username': 'aaaaaaaaaaaaa'
    })
    response.set_cookie('jwtua', httponly=True, secure=True)
    return response
