from datetime import datetime

from starlette.endpoints import HTTPEndpoint
from starlette.responses import JSONResponse
from starlette.authentication import requires
from starlette.responses import Response
from sqlalchemy import select

from common.database.models.dbconnector import database as session
from common.database.models.dbmodels import accounts, quotes
from utils import JsonParams, send_by_email_after_registration


class LogIn(HTTPEndpoint):
    """ Endpoint for user login """

    async def post(self, request):
        async with JsonParams(request) as params:
            password = params['password']
            email = params['email']
            try:
                account_check = await session.execute(select(accounts).filter_by(email=email))
                password_check = await session.execute(select(accounts).filter_by(password=password))
                if account_check and password_check:
                    username = await session.fetch_one(accounts.select().where(accounts.c.email == email))
                    username = username["username"]
                    response = JSONResponse()
                    try:
                        query = accounts.update().values(expired=datetime.now()).where(accounts.c.username == username)
                        await session.execute(query)
                    except Exception as e:
                        print(e.args)
                        return Response(b'Unexpected error', status_code=410)
                    response.set_cookie('auth', username, 300)
                    return response
                else:
                    return Response(b'Login or password is not correct', status_code=403)
            except Exception as e:
                print(e.args)
                return Response(b'Unexpected error', status_code=410)


class Register(HTTPEndpoint):
    """ Endpoint for user registration """

    async def post(self, request):
        async with JsonParams(request) as params:
            password = params['password']
            username = params['username']
            email = params['email']
        try:
            await send_by_email_after_registration(email)
            try:
                query = accounts.insert().values(
                    password=password,
                    username=username,
                    email=email
                )
                await session.execute(query)
            except Exception as e:
                if 'duplicate key value violates unique constraint "accounts_email_key"' in e.args:
                    return Response(b'Email is already taken', status_code=403)
                elif 'duplicate key value violates unique constraint "accounts_username_key"' in e.args:
                    return Response(b'Username is already taken', status_code=409)
            user_data = {
                'username': username
            }
            response = JSONResponse(user_data)
            return response
        except Exception as e:
            if 'Server is not available' in e.args:
                return Response(b'Email server is not available', status_code=504)
            else:
                print(e.args)
                return Response(b'Unexpected error', status_code=410)


@requires('authenticated')
async def check_user(request):
    response = Response(status_code=200)
    if request.user:
        try:
            query = accounts.update().values(expired=datetime.now()).where(accounts.c.username == request.user.display_name)
            await session.execute(query)
        except Exception as e:
            print(e.args)
            return Response(b'Unexpected error', status_code=410)
        response.set_cookie("auth", request.user.display_name, 300)
    return response


@requires('authenticated')
async def exit(request):
    response = Response(status_code=200)
    response.delete_cookie("auth")
    return response


@requires('authenticated')
async def user_info_construct(request):
    async with JsonParams(request) as params:
        username = params['username']
    email = await session.fetch_one(accounts.select().where(accounts.c.username == username))
    user_data = {
        "username": username,
        "email": email["email"]
    }
    users_quotes_list = await session.fetch_all(quotes.select().where(quotes.c.username == username))
    user_quotes = [
        {
            "username": quote["username"],
            "text": quote["text"],
        }
        for quote in users_quotes_list
    ]
    return JSONResponse([user_data, user_quotes])