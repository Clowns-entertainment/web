import json

import asyncio

import zmq.asyncio

import notifier.abs
import typing as t
import logging


class NotificationClient(notifier.abs.NotificationClient):
    """
    Notification service client implementation.
    """

    def __init__(self, host: t.Optional[str] = None, port: t.Optional[int] = None):
        host = host or NotificationClient.host
        port = port or NotificationClient.port
        timeout = 5000
        self.ctx = zmq.asyncio.Context()
        self.ctx.setsockopt(zmq.SNDTIMEO, timeout)
        self.ctx.setsockopt(zmq.RCVTIMEO, timeout)
        self.socket = self.ctx.socket(zmq.REQ)
        self.socket.connect(f"tcp://{host}:{port}")

    async def send_by_email_after_registration(self, *address: str):
        try:
            await self.socket.send(json.dumps(address).encode('utf-8'))
            msg = await self.socket.recv()
            if msg:
                print(msg)
        except zmq.error.Again:
            raise Exception('Server is not available')


if __name__ == "__main__":
    import notifier.client


    async def run_all():
        a = notifier.client.NotificationClient(port=9900, host='localhost')
        # await a.send_by_email_after_registration("artm-porjad@mail.ru")

        await a.send_without_template("AxeCooperChannel", "artm-porjad@mail.ru",
                                      "check.email.sending01@gmail.com", "AxeCooperChat",
                                      subject='example subject',
                                      text='no template text')


    asyncio.run(run_all())
