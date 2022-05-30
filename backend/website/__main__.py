import uvicorn
import backend.website
port = 5000

app = backend.website.Application()

uvicorn.run(app, host='0.0.0.0', port=port)
