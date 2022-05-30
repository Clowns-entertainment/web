FROM python:3.10.4

WORKDIR notifiers_server

COPY . .

RUN pip wheel . -w .wheels --no-deps

RUN pip install .wheels/Paket-*

EXPOSE $PORT

CMD ["python3", "notifier/server.py"]