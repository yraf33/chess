from app import *

active_rooms = set()
@socketio.on('connect', namespace='/Menu')
def handle_connect():
    userId = get_or_create_userId(request.cookies)
    join_room(userId)
    active_rooms.add(userId)


# @socketio.on('join', namespace='/Menu')
# def on_join(data):
#     join_room(data)
#     emit()

@socketio.on('create-game', namespace='/Menu')
def on_create_game(data):
    add_game_to_file(data)
    games = get_active_games()['active-games']
    self_game = get_game_data({'userId': data['userId']}, games)
    join_room(self_game['gameId'])

@socketio.on('update-games', namespace='/Menu')
def on_update_games():
    print('active_rooms', active_rooms)
    join_room('active-games')
    games = get_active_games()['active-games']
    for user in active_rooms:
        for game in games:
            if user == game['userId']:
                # emit('redirect-on-game', game, room=user)
                print('ggg')
    emit('update-games', {'games': games}, room='active-games')     
    
    

@socketio.on('leave-active-games', namespace='/Menu')
def on_leave():
    leave_room('active-games')

@socketio.on('join-game', namespace='/Menu')
def on_join_game(game_data):
    join_room(f'gggg{game_data['gameId']}')
    leave_room('active-games')
    players_data = players_format(request, game_data)
    Game.add_game(game_data['gameId'], players_data.white, players_data.black)
    emit('redirect-on-game', players_data.first_player, room=players_data.first_player['userId'])
    emit('redirect-on-game', players_data.second_player, room=request.cookies['userId'])


# board = ChessBoard()

