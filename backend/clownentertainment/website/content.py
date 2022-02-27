from starlette.endpoints import HTTPEndpoint
from datetime import datetime, timedelta
from starlette.responses import JSONResponse

from clownentertainment.website.utils import JsonParams

quotes = [
    {
        'login': '321',
        'text': '123'
    }
]

online_dict = {}


async def quotes_post(request):
    async with JsonParams(request) as params:
        add_quote = {
            'login': request.user.display_name,
            'text': params['text']
        }
    quotes.append(add_quote)
    return JSONResponse(quotes)


async def quotes_get(request):
    return JSONResponse(quotes)


async def online_list_add(user, user_data):
    print(user_data)
    n = len(online_dict)
    if user in online_dict.keys():
        del online_dict[user]
    online_dict[user] = user_data
    print(online_dict)
    return 'Ok'


async def online_list_get(request):
    online_send = []
    print(online_dict)
    if request.user:
        for i in online_dict:
            if datetime.now() - i['expired'] < timedelta(seconds=300):
                online_send.append(i['user_data'])
            else:
                del i['user_data']
    print(online_dict)
    return JSONResponse(online_send)
