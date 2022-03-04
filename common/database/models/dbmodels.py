from dataclasses import dataclass, field
from datetime import datetime
from typing import List

from sqlalchemy import DateTime, Integer, String, Text, ForeignKey
from sqlalchemy import Table, Column

from .bases import mapper_registry, metadata


@dataclass
class User:
    """ User profile
        """
    id: int = field(init=False)
    accounts: List['Accounts'] = field(default_factory=list)
    quotes: List['Quotes'] = field(default_factory=list)


@dataclass
class Accounts:
    """ User account
        """
    username: str
    password: str
    email: str
    user: User = field(init=False)
    user_id: int = field(init=False)
    expired: datetime = datetime.now()


@dataclass
class Quotes:
    """ Users quotes
        """
    text: str
    user: User = field(init=False)
    user_id: int = field(init=False)
    user_username: str = field(init=False)


accounts = Table(
    'accounts',
    metadata,
    Column('id', Integer, primary_key=True),
    Column('password', String, nullable=False),
    Column('username', String, unique=True),
    Column('email', String, unique=True),
    Column('expired', DateTime)
)


quotes = Table(
    'quotes',
    metadata,
    Column('id', Integer, primary_key=True, autoincrement=True),
    Column('username', String, ForeignKey('accounts.username')),
    Column('text', Text),
)


mapper_registry.map_imperatively(Accounts, accounts)

mapper_registry.map_imperatively(Quotes, quotes)

