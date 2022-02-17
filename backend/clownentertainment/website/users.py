from starlette.endpoints import HTTPEndpoint
from utils import JsonParams
from clownentertainment import jwtua
from starlette.exceptions import HTTPException
data ={
    'username': '123',
    'password': '123'
}


class LogIn(HTTPEndpoint):
    """ Endpoint for user login """

    async def post(self, request):
        async with JsonParams(request) as params:
            password = params['password']
            username = params['username']
            remember_me = params.get('remember_me', False)
            if password == data['password'] and username == data['username']:
                user_data = {
                    'username': username,
                    'remember_me': remember_me
                }
                credentials = ['authenticated']
                response = jwtua.make_login_response(user_data, credentials)
                return response
            else:
                raise HTTPException(404)