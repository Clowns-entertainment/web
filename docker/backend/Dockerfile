FROM python:3.10.4

WORKDIR /server

COPY . .

RUN pip wheel . -w .wheels --no-deps

RUN pip install .wheels/Paket-*

EXPOSE 8000

CMD ["python3", "backend/website/__main__.py"]