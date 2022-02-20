from starlette.endpoints import HTTPEndpoint
from starlette.responses import JSONResponse
from utils import JsonParams, send_by_email_after_registration
from starlette.exceptions import HTTPException
from starlette.authentication import requires
from starlette.responses import Response

data = {
    '123':
        {
            'password': '123',
            'email': '123@mail.ru'
        }
}


class LogIn(HTTPEndpoint):
    """ Endpoint for user login """

    async def post(self, request):
        async with JsonParams(request) as params:
            password = params['password']
            nickname = params['nickname']
            remember_me = params.get('remember_me', False)
            try:
                if password == data[nickname]['password']:
                    user_data = {
                        'nickname': nickname,
                        'remember_me': remember_me
                    }
                    response = JSONResponse(user_data)
                    if remember_me:
                        response.set_cookie('auth', nickname, 300)
                        response.set_cookie('check_box', nickname, 30000000)
                    else:
                        response.set_cookie('auth', nickname, 300)
                    return response
            except KeyError:
                raise HTTPException(404)


class Register(HTTPEndpoint):
    """ Endpoint for user registration """

    async def post(self, request):
        async with JsonParams(request) as params:
            password = params['password']
            nickname = params['nickname']
            email = params['email']
            if nickname in data.keys():
                response = JSONResponse({'nickname is already taken'})
                return response
            else:
                try:
                    await send_by_email_after_registration(email)
                except Exception:
                    raise HTTPException(404)
                data[nickname] = {
                    'password': password,
                    'email': email
                }
                user_data = {
                    'nickname': nickname
                }
                response = JSONResponse(user_data)
                return response


@requires('authenticated')
async def check_user(request):
    response = Response(status_code=200)
    print(123321)
    if request.user:
        print(123321)
        response.set_cookie("auth", request.user.display_name, 300)
    return response


@requires('authenticated')
async def exit(request):
    response = Response(status_code=200)
    response.delete_cookie("auth")
    return response
