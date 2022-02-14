import json
import os

import zmq
import zmq.asyncio
import asyncio
import logging
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig


class NotifierServer():
    def __init__(self, port: int):
        ctx = zmq.asyncio.Context()
        self.socket = ctx.socket(zmq.REP)
        self.socket.bind("tcp://*:%s" % port)
        logging.info(f'listen on 0.0.0.0:{port}')

        self.conf = ConnectionConfig(
            MAIL_USERNAME='12312312qwerq@gmail.com',
            MAIL_PASSWORD='1qaz2wsx.',
            MAIL_FROM='12312312qwerq@gmail.com',
            MAIL_PORT='587',
            MAIL_SERVER='smtp.gmail.com',
            MAIL_FROM_NAME='Clowns Entertainment',
            MAIL_TLS=True,
            MAIL_SSL=False,
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
