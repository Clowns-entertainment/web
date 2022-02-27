from datetime import datetime

from starlette.endpoints import HTTPEndpoint
from starlette.responses import JSONResponse
from utils import JsonParams, send_by_email_after_registration, get_bool_var
from content import online_list_add
from starlette.exceptions import HTTPException
from starlette.authentication import requires
from starlette.responses import Response

data = {
    '123@mail.ru':
        {
            'nickname': '123',
            'password': '123',
        },
    'artm-porjad@mail.ru':
        {
            'nickname': 'qwe',
            'password': 'qwe'
        }
}


class LogIn(HTTPEndpoint):
    """ Endpoint for user login """

    async def post(self, request):
        async with JsonParams(request) as params:
            password = params['password']
            email = params['email']
            remember_me = get_bool_var(params.get('remember_me'))
        try:
            if password == data[email]['password']:
                user_data = {
                    'nickname': data[email]['nickname'],
                    'remember_me': remember_me
                }
                response = JSONResponse(user_data)
                if remember_me:
                    response.set_cookie('auth', data[email]['nickname'], 300)
                    response.set_cookie('check_box', data[email]['nickname'], 30000000)
                else:
                    response.set_cookie('auth', data[email]['nickname'], 300)
                await online_list_add({user_data['nickname']: {"nickname": user_data['nickname']}, "expired": datetime.now()})
                return response
            else:
                return Response(status_code=404)
        except Exception:
            return Response(b'Exception in the server', status_code=403)


class Register(HTTPEndpoint):
    """ Endpoint for user registration """

    async def post(self, request):
        async with JsonParams(request) as params:
            password = params['password']
            nickname = params['nickname']
            email = params['email']
        if email in data.keys():
            return Response(b'Email is already taken', status_code=403)
        else:
            try:
                await send_by_email_after_registration(email)
                data[email] = {
                    'password': password,
                    'nickname': nickname
                }
                user_data = {
                    'nickname': nickname
                }
                response = JSONResponse(user_data)
                return response
            except Exception as a:
                print('Соединение с почтовым сервисом не установлено')
                return Response(b'Email server is not available', status_code=504)


@requires('authenticated')
async def check_user(request):
    response = Response(status_code=200)
    if request.user:
        await online_list_add(request.user.display_name, {'user_data':{"nickname": request.user.display_name}, "expired": datetime.now()})
        response.set_cookie("auth", request.user.display_name, 300)
    return response


@requires('authenticated')
async def exit(request):
    response = Response(status_code=200)
    response.delete_cookie("auth")
    response.delete_cookie("check_box")
    return response
