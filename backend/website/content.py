from datetime import datetime, timedelta
from starlette.responses import JSONResponse
from sqlalchemy import select

from common.database.models.dbconnector import database as session
from common.database.models.dbmodels import accounts, quotes
from backend.website.utils import JsonParams

quotes1 = [
    {
        'login': '321',
        'text': '123'
    }

]

online_dict = {}


async def quotes_post(request):
    async with JsonParams(request) as params:
        query = quotes.insert().values(
            username=request.user.display_name,
            text=params['text']
        )
    await session.execute(query)
    return JSONResponse("ok")


async def quotes_get(request):
    query = quotes.select()
    quotes_list = await session.fetch_all(query)
    quotes_send = [
        {
            "username": quote["username"],
            "text": quote["text"],
        }
        for quote in quotes_list
    ]
    return JSONResponse(quotes_send)


async def online_list_get(request):
    query = accounts.select().where(datetime.now()-accounts.c.expired < timedelta(seconds=300))
    online_list = await session.fetch_all(query)
    online_send = [
        {
            "username": online["username"]
        }
        for online in online_list
    ]
    return JSONResponse(online_send)


async def search(request):
    async with JsonParams(request) as params:
        query = quotes.select().where(quotes.c.text == params['search_str'] or quotes.c.username == params['search_str'])
        quotes_list = await session.fetch_all(query)
        quotes_send = [
            {
                "username": quote["username"],
                "text": quote["text"],
            }
            for quote in quotes_list
        ]
        print(quotes_send)
        return JSONResponse(quotes_send)
