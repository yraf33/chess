from app import *

@app.route("/add_game", methods=['POST'])
def add_game():
    print(request.get_json())
    request_data = request.get_json()
    
    add_game_to_file(request_data)
    return jsonify({"message": "Game added successfully"})


# @app.route('/games', methods=['GET'])
def get_active_games():
    
    return jsonify(active_games())