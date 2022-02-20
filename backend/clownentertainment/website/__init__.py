from starlette.applications import Starlette
from starlette.routing import Route, Mount
from clownentertainment.website import users
from starlette.middleware import Middleware
from starlette.middleware.authentication import AuthenticationMiddleware
import utils


class Application(Starlette):
    """ Web application
    """

    def __init__(self):
        middleware = [
            Middleware(AuthenticationMiddleware, backend=utils.BasicAuthBackend())
        ]
        Starlette.__init__(self, routes=[
            Mount('/api', routes=[
                Route('/register', users.Register, methods=["POST"]),
                Route('/login', users.LogIn, methods=["POST"]),
                Route("/check_user", endpoint=users.check_user, methods=["GET"]),
                Route("/exit", endpoint=users.exit, methods=["GET"]),
            ])
        ], middleware=middleware)
