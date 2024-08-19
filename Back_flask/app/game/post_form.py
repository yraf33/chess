from typing import Dict
from pydantic import BaseModel, create_model

# from Back_flask.app.game.chess_board import ChessBoard


# class Coords(BaseModel):
#     x: int
#     y: int
class GameForm(BaseModel):
    white: str
    black: str
    first_player: dict
    second_player: dict
    
    # board: ChessBoard

class MoveForm(BaseModel):
    gameId: str
    f: dict
    t: dict
    piece: str
    color: str




