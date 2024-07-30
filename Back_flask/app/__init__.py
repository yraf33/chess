from flask import Flask, render_template, jsonify, \
                send_from_directory, request, url_for, \
                    make_response, redirect, before_render_template, session,\
                    Response
from flask_cors import CORS
from flask_socketio import SocketIO, join_room, leave_room, send, emit
from .utils import add_game_to_file, active_games
from config import Config
import eventlet

app = Flask(__name__)

app.config.from_object(Config)
CORS(app)

socketio = SocketIO(app, async_mode='eventlet', cors_allowed_origins="*" )
from app import routes

if '__name__' == '__main__':
    socketio.run(app, debug=True)

