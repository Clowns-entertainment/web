import uvicorn
import clownentertainment.website

port = 5000
app = clownentertainment.website.Application()

uvicorn.run(app, port=port)