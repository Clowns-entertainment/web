import json
import os

import zmq
import zmq.asyncio
import asyncio
import logging
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig


def get_bool_envar(name, default=False):
    value = os.environ.get(name)
    if value is None:
        return default
    if value.upper() in ['Y', 'YES', 'TRUE', '1']:
        return True
    elif value.upper() in ['N', 'NO', 'FALSE', '0']:
        return False
    else:
        raise ValueError(f"Invalid value of ${name}")


class NotifierServer():
    def __init__(self, port: int):
        ctx = zmq.asyncio.Context()
        self.socket = ctx.socket(zmq.REP)
        self.socket.bind("tcp://*:%s" % port)
        logging.info(f'listen on 0.0.0.0:{port}')
        mail_tls = get_bool_envar('MAIL_TLS')
        mail_ssl = get_bool_envar('MAIL_SSL')

        self.conf = ConnectionConfig(
            MAIL_USERNAME=os.environ["MAIL_USERNAME"],
            MAIL_PASSWORD=os.environ["MAIL_PASSWORD"],
            MAIL_FROM=os.environ["MAIL_FROM"],
            MAIL_PORT=int(os.environ.get("MAIL_PORT", 587)),
            MAIL_SERVER=os.environ["MAIL_SERVER"],
            MAIL_FROM_NAME=os.environ["MAIL_FROM_NAME"],
            MAIL_TLS=mail_tls,
            MAIL_SSL=mail_ssl,
            USE_CREDENTIALS=True,
        )
        self.fm = FastMail(self.conf)

    async def mailing(self, task_message):
        logging.info(task_message)
        message = MessageSchema(
            subject='Вы зарегистрированы',
            recipients=task_message,
            body='Поздравляем Вас'
        )
        await self.fm.send_message(message)

    async def start(self):
        while True:
            try:
                msg = await self.socket.recv()
                await self.socket.send(b'')
                await self.mailing(json.loads(msg.decode('utf-8')))
            except KeyboardInterrupt:
                await self.socket.send(b'Message not received')
                break


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    env_port = os.environ.get("PORT", 9900)
    notifier = NotifierServer(int(env_port))
    asyncio.run(notifier.start())
