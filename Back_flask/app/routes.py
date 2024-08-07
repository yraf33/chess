from app import *


@socketio.on('connect')
def handle_connect():
    sid = request.sid
    response = make_response()
    response.set_cookie('sid', sid, path='/')
    emit('set-cookie', {'sid': sid})
    print('New client connected with SID:', sid)

@socketio.on('join')
def on_join(data):
    join_room(data)
    emit()

@socketio.on('create-game')
def on_create_game(data):
    print(data)
    data['userId'] = request.sid
    add_game_to_file(data)

@socketio.on('update-games')
def on_update_games():
    join_room('active-games')
    games = active_games()['active-games']
    self_game = get_game_data(games, request.sid)
    if self_game:
        join_room('game'+self_game['gameId'])
        for items in games:
            if items['userId'] == self_game['userId']:
                items['highlight'] = True
            items.pop('userId')
    print(rooms('active-games'))        
    emit('update-games', {'games': games}, room='active-games')
    

@socketio.on('leave-active-games')
def on_leave():
    leave_room('active-games')

@socketio.on('join-game')
def on_join_game(gameData):
    join_room(gameData['gameId'])
    leave_room('active-games')
    gameData['color'] = color_detection(gameData['color'])
    emit('redirect-on-game', gameData, room=gameData['gameId'])
    
