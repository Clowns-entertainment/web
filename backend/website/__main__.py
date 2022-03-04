import uvicorn
import backend.website
port = 5000

app = backend.website.Application()

uvicorn.run(app, port=port)
