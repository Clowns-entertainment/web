FROM python

WORKDIR notifiers_server

COPY . .

RUN pip install zmq fastapi_mail

EXPOSE $PORT

CMD ["python3", "services/notifier/server.py"]