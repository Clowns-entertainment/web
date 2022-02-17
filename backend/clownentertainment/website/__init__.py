from starlette.applications import Starlette
from starlette.routing import Route, Mount
from clownentertainment.website import example, users


class Application(Starlette):
    """ Web application
    """

    def __init__(self):
        Starlette.__init__(self, routes = [
            Mount('/api', routes=[
                Route('/login', users.LogIn, methods=["POST"]),
                Route('/', example.homepage),
                Route('/registration-complete', example.send_by_email_after_registration)
            ])
        ])
