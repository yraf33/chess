from app.game import *

class Game:

    _activeGames = {}

    
    @classmethod
    def add_game(cls, game_id, white_player, black_player):
        cls._activeGames[game_id] = {'white': white_player, 
                                     'black': black_player, 
                                     'board': ChessBoard()}
        
    @classmethod
    def _get_game(cls, game_id):
        return cls._activeGames.get(game_id)
        
    @classmethod
    def move_figure(cls, moveData):
        gameData = cls._get_game(moveData.gameId)
        print(gameData, 'fgdgdfg')
            
