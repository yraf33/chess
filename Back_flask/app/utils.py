import json
import uuid
import random
from app import *
# from .game import *
import re

def get_active_games():
    with open('./Active-games-data.json', encoding='utf-8') as f:
        return json.load(f)

def generate_game_id ():
    return str(uuid.uuid4())


def add_game_to_file (game_data: dict):
    data = copy_game_check(game_data)
    game_data = {'userId': game_data['userId'], 
                 'gameTime': game_data['gameTime'],
                 'timeForMove': game_data['timeForMove'],
                 'gameId': generate_game_id(), 
                 'color': game_data['color']}
    
    data['active-games'].append(game_data)
    with open('./Active-games-data.json', encoding='utf-8', mode='w+') as f:
        json.dump(data, f, ensure_ascii=False, indent=4) 

def copy_game_check(game_data: dict) -> dict:
    data = get_active_games()
    for game in data['active-games'].copy():
        if game_data['userId'] == game['userId']:
             data['active-games'].remove(game)
        
    return data


def get_game_data(game_key: dict, active_games:dict = None) -> dict:
    if not active_games:
        active_games = get_active_games()['active-games']
    for game in active_games:
        # print(game)
        if game[next(iter(game_key))] == game_key[next(iter(game_key))]:
            return game

def join_room_check(active_rooms, self_game):
    for active_room in active_rooms:
        if active_room['roomName'] == 'active-games':
            return True
        join_room('game '+self_game['gameId'])

def color_detection(color: str):
    if color == 'white':
        return ['white', 'black']
    elif color == 'random':
        color = ['white', 'black']
        random.shuffle(color)
        return color
    else:
        return ['black', 'white']
    
def get_or_create_userId(cookie):
    if 'userId' not in cookie:
        userId = str(uuid.uuid4())
        emit('connection', { 'userId': userId}, to=request.sid)
        return userId
    else:
        return cookie['userId']

def players_format(request, game_data):
    host_data = get_game_data({'gameId':game_data['gameId']})
    color = color_detection(game_data['color'])
    host_data['color'] = color[0]
    game_data['color'] = color[1]
    white_player = host_data['userId'] if 'white' in host_data['color'] else request.cookies['userId']
    black_player = host_data['userId'] if 'black' in host_data['color'] else request.cookies['userId']

    return GameForm.model_validate({'white': white_player, 
                                    'black': black_player, 
                                    'second_player': game_data, 
                                    'first_player': host_data})
    # if coockie and 'userId' in coockie :
    #     userId = re.search(r'userId=[0-9a-zA-Z\-]+[ ;]{0,1}', coockie).group(0)
    #     userId = userId.replace('userId=', '')
    #     return userId
    # else:
    #     userId = str(uuid.uuid4())
    #     return userId
    
