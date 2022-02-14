import json

import asyncio
import zmq
import zmq.asyncio

import notifier.abs
import typing as t


class NotificationClient(notifier.abs.NotificationClient):
    """
    Notification service client implementation.
    """

    def __init__(self, host: t.Optional[str] = None, port: t.Optional[int] = None):
        host = host or NotificationClient.host
        port = port or NotificationClient.port
        ctx = zmq.asyncio.Context.instance()
        self.socket = ctx.socket(zmq.REQ)
        self.socket.connect(f"tcp://{host}:{port}")

    async def send_by_email_after_registration(self, *address: str):
        await self.socket.send(json.dumps(address).encode('utf-8'))
        msg = await self.socket.recv()
        if msg:
            print(msg)


if __name__ == "__main__":
    import notifier.client

    async def run_all():
        a = notifier.client.NotificationClient(port=9900, host='localhost')
        await a.send_by_email_after_registration("artm-porjad@mail.ru")


    asyncio.run(run_all())
