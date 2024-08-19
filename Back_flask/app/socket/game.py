from app import *

@socketio.on('connect', namespace='/Game')
def handle_connect():
    # print(request.args)
    # join_room(request.args.get('url').replace(GAME_PAGE_URL, ''))
    # print(f'User connected to game room: {request.args.get("url").replace(GAME_PAGE_URL, "")}')
    print(request.cookies.get('gameId'))
    userId = get_or_create_userId(request.cookies)
    join_room(userId)
    gameData = Game._get_game(request.cookies.get('gameId'))
    gameData = gameData['board'].board
    emit('newBoard', gameData, room=userId)
    

@socketio.on('move', namespace='/Game')
def on_move(moveData):
    print(rooms(request.sid))
    moveData = MoveForm.model_validate(moveData)
    move = {'f':{'x':moveData.f['x'], 'y':moveData.f['y']}, 
            't':{'x':moveData.t['x'], 'y':moveData.t['y']},
            'piece': moveData.piece,
            'color': moveData.color}
    moveData.piece = f'w{moveData.piece}' if moveData.color == 'white' else f'b{moveData.piece}'
    # moveData = MoveForm.parse_obj(moveData)
    
    gameData = Game._get_game(moveData.gameId)
    print(gameData['board'])
    board = gameData['board']
    board.get_moves(moveData)
    emit('change', move, 
         room=gameData['black'] if moveData.color == 'white' else gameData['white'], namespace='/Game')
    # if board.get_moves(moveData):
    #     socketio.send('enemy', 11111)