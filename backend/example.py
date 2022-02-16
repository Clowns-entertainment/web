import time

from starlette.authentication import AuthenticationBackend, AuthCredentials, SimpleUser
from starlette.routing import Route
from starlette.middleware import Middleware
from starlette.applications import Starlette
from starlette.middleware.authentication import AuthenticationMiddleware
from starlette.responses import JSONResponse
import notifier.client


async def send_by_email_after_registration(request):
    a = notifier.client.NotificationClient(port=9900, host='localhost')
    try:
        await a.send_by_email_after_registration("artm-porjad@mail.ru")
    except Exception:
        return JSONResponse('Сервер не отвечает')
    return JSONResponse('Спасибо за регистрацию')


async def homepage(request):
    return JSONResponse({'hello': 'world'})


class BasicAuthBackend(AuthenticationBackend):
    async def authenticate(self, request):
        if not request.cookies.get("auth"):
            return
        login = request.cookies.get("auth")
        return AuthCredentials(["authenticated"]), SimpleUser(login)


routes = [
    Route('/', homepage),
    Route('/registration-complete', send_by_email_after_registration)
]





middleware = [
    Middleware(AuthenticationMiddleware, backend=BasicAuthBackend())
]

app = Starlette(routes=routes, middleware=middleware)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app)