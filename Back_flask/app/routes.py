from app import *


@socketio.on('join')
def on_join(data):
    join_room(data)


@socketio.on('update-games')
def on_update_games(userId ):
    join_room('active-games')
    games = active_games()['active-games']
    
    join_room(get_game_data(games, userId))
    print(get_game_data(games, userId), 'afdfd')
    emit('update-games', {'games': games}, room='active-games')
    

@socketio.on('leave-active-games')
def on_leave():
    leave_room('active-games')

@socketio.on('join-game')
def on_join_game(gameData):
    join_room(gameData['gameId'])
    leave_room('active-games')
    print(gameData['gameId'], 'vcxvxcvxcvxc')
    emit('redirect-on-game', gameData, room=gameData['gameId'])
    
