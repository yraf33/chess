from app import *


@app.route("/")
def index():
    return render_template('main_menu.html', title='ШААААААХМАТЫ')

@app.route("/add_game", methods=['POST'])
def add_game():
    print(request.get_json())
    request_data = request.get_json()
    
    add_game_to_file(request_data)
    return jsonify({"message": "Game added successfully"})


@app.route('/games', methods=['GET'])
def get_active_games():
    
    return jsonify(active_games())

@socketio.on('join')
def on_join(data):
    print('fdgfdgfdgfdgfdgfdg', data)
    
    
    join_room(data)
    send({"message":"joined", 'gameId': data}, room=data)

@socketio.on('leave')
def on_leave(data):
    game_id = data['gameId']
    leave_room(game_id)
    send(f'User has left the room {game_id}', room=game_id)