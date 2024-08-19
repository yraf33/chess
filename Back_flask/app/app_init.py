from app import *

app = Flask(__name__)

app.config.from_object(Config)
CORS(app)

socketio = SocketIO(app, 
                    async_mode='eventlet', 
                    cors_allowed_origins="*", 
                     )