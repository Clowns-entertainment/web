from starlette.applications import Starlette
from starlette.routing import Route, Mount
from starlette.middleware import Middleware
from starlette.middleware.authentication import AuthenticationMiddleware
import utils

from common.database.models.dbconnector import database
from backend.website import users, content


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
                Route('/quote_post', content.quotes_post, methods=["POST"]),
                Route('/quote_get', content.quotes_get, methods=["GET"]),
                Route('/online_get', content.online_list_get, methods=["GET"]),
                Route('/check_user', endpoint=users.check_user, methods=["GET", "POST"]),
                Route('/exit', endpoint=users.exit, methods=["GET"]),
                Route('/user_info_construct', endpoint=users.user_info_construct, methods=["GET", "POST"]),
                Route('/search', endpoint=content.search, methods=["POST", "GET"]),
            ], )
        ],
                           on_startup=[database.connect],
                           on_shutdown=[database.disconnect],
                           middleware=middleware)
