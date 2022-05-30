FROM python:3.10.4

WORKDIR /server

COPY . .

RUN pip wheel . -w .wheels --no-deps

RUN pip install .wheels/Paket-*

WORKDIR /server/common

CMD ["alembic", "upgrade", "head"]