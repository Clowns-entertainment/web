import os

import databases
# from starlette.config import Config


# config = Config('.env')
# DATABASE_URL = config("DATABASE_URL")
DATABASE_URL = "postgresql://postgres:23456@localhost:5432/clowns-entertainment-db"
database = databases.Database(DATABASE_URL)
