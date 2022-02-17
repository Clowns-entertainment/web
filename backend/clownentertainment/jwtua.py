import typing as t
from starlette.responses import JSONResponse


def make_login_response(self, user_data: t.Dict[str, t.Any], credentials: t.Sequence[str]) -> JSONResponse:
    """ Generates response for success auth
    """
    response = JSONResponse({
        'access_token': credentials,
        'username': user_data['username']
    })
    response.set_cookie('jwtua', httponly=True, secure=True)
    return response
