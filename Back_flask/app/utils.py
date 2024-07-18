import json
import uuid

def active_games():
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
    data = active_games()
    for game in data['active-games'].copy():
        if game_data['userId'] == game['userId']:
             data['active-games'].remove(game)
    return data



