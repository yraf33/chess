from fastapi import FastAPI
from fastapi_socketio import SocketManager
import socketio
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')
sio_app = socketio.ASGIApp(socketio_server=sio, socketio_path='socket.io')
app.mount('/ws', sio_app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def read_root():
   return {
      "Hello": "World"
   }

@sio.on('/ws')
async def connect():
   print('connect')

if __name__ == '__main__':
    
    uvicorn.run("test:app", host = '127.0.0.1', port = 5000, reload = True)

