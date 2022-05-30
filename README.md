# Clowns-entertainment forum
The forum was created for communication and discussion of various topics for community members.
This is an old version of the project. The new version is at the [link](https://github.com/Artm-porjad/citatiNext) 
#Requirements
docker-compose version 1.21.2
# Installation
```console
$ git clone git@github.com:Clowns-entertainment/web.git .
$ make
```
or
```console
$ docker-compose build
$ docker-compose up
```
# Dependencies
[Starlette](https://www.starlette.io/) - framework, which is ideal for building async web services for my project  
[Uvicorn](https://www.uvicorn.org/) - an ASGI web server implementation for Python  
[ZeroMQ](https://zeromq.org/) - an open-source universal messaging library for notifier service  
[databases](https://github.com/encode/databases) - python library for simple asyncio support for a range of databases.  
[fastapi_mail](https://github.com/sabuhish/fastapi-mail) - python library for simple lightweight mail system, sending emails and attachments(individual && bulk)  
[sqlalchemy](https://www.sqlalchemy.org/) - the Python SQL Toolkit and Object Relational Mapper  
[alembic](https://alembic.sqlalchemy.org/en/latest/) - is a lightweight database migration tool for usage with the SQLAlchemy Database Toolkit for Python.  
[React](https://reactjs.org/) - a JavaScript library for building user interfaces  
[craco](https://www.npmjs.com/package/@craco/craco) - is an easy and comprehensible configuration layer for create-react-app.
