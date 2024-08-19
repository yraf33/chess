# from app import *


class ChessBoard:
    
    def __init__(self):
        self.board = [
            ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
            ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
            ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR']]
        
        self.move_pieces = {
            'R': self.is_valid_rook_move,
            'N': self.is_valid_knight_move,
            'B': self.is_valid_bishop_move,
            'Q': self.is_valid_queen_move,
            'K': self.is_valid_king_move,
            'P': self.is_valid_pawn_move
        }
        
    def get_moves(self, moveData):
        available_move = []
        print(moveData)
        for x in range(len(self.board)):
            for y in range(len(self.board[x])):
                if self.move_pieces[moveData.piece[1]](moveData.f, {'x': x, 'y': y}, moveData.piece[0]) and self.board[x][y][0] != moveData.piece[0]:
                    available_move.append({'x': x, 'y': y})
                    # print(f'Available move: {available_move}, {self.board[x][y][0]},{moveData.piece[0]}')
        if moveData.t in available_move:
            print(f'Available move: {available_move}')
            self.board[moveData.t['x']][moveData.t['y']] = moveData.piece
            print(self.board)
            return True
            
                    
                # if self.board[x][y] == moveData.piece:
                #     self.get_available_moves((x, y), self.board)


        # if self.move_pieces[moveData.piece[1]](moveData.f, moveData.t):
        #     self.board[moveData.t.y][moveData.t.x] = self.board[moveData.f.y][moveData.f.x]
        #     self.board[moveData.f.y][moveData.f.x] =' '
        #     print(self.board)

        
            


    def is_valid_rook_move(self, f_cell, t_cell, color):
        if f_cell['x'] == t_cell['x'] or f_cell['y'] == t_cell['y']:
            return True
        else:
            return False
        
    def is_valid_king_move(self, f_cell, t_cell, color):
        if abs(f_cell['x'] - t_cell['x']) <= 1 and abs(f_cell['y'] - t_cell['y']) <= 1:
            return True
        else:
            return False
    
    def is_valid_knight_move(self, f_cell, t_cell, color):
        if abs(f_cell['x'] - t_cell['x']) == 2 and abs(f_cell['y'] - t_cell['y']) == 1:
            return True
        elif abs(f_cell['x'] - t_cell['x']) == 1 and abs(f_cell['y'] - t_cell['y']) == 2:
            return True
        else:
            return False
        
    def is_valid_bishop_move(self, f_cell, t_cell, color):
        if abs(f_cell['x'] - t_cell['x']) == abs(f_cell['y'] - t_cell['y']):
            return True
        else:
            return False
        
    def is_valid_queen_move(self, f_cell, t_cell, color):
        return self.is_valid_rook_move(f_cell, t_cell, color) or self.is_valid_bishop_move(f_cell, t_cell, color)
    
    def is_valid_pawn_move(self, f_cell, t_cell, color):
        firstmove = True if f_cell['y'] == 6 and color == 'w' or f_cell['y'] == 1 and color == 'b' else False
        if f_cell['x'] != t_cell['x']:  
            return False
        if f_cell['y'] == t_cell['y'] + 1:
            return True
        elif firstmove and f_cell['y'] == t_cell['y'] + 2:
            return True
    

    
        
    