from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.routing import Route
import notifier.client


async def send_by_email_after_registration(request):
    a = notifier.client.NotificationClient(port=9900, host='localhost')
    await a.send_by_email_after_registration("artm-porjad@mail.ru")
    return JSONResponse({'Спасибо за регистрацию'})


async def homepage(request):
    return JSONResponse({'hello': 'world'})


app = Starlette(debug=True, routes=[
    Route('/', homepage),
    Route('/registration-complete', send_by_email_after_registration)
])