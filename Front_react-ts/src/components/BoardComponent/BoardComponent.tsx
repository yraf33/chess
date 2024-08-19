import React, { FC, useEffect, useState }  from "react";
import './BoardComponent.css';
import {Board} from "../../models/Board";
import CellComponent from "./CellComponent";
import { Cell } from "../../models/Cell";
import { Player } from "../../models/Player.ts";

import { Figure } from "../../models/figures/Figure.ts";
import {getCookie} from "../../hooks/utils"
import { Colors } from "../../models/Colors.ts";
import { Socket } from "socket.io-client";



interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    player: Player;
    currentPlayer: Player | null;
    setCurrentPlayer: (player: Player) => void;

    gameId: string
    socket: Socket
    // swapPlayer: () => void;


}
 const BoardComponent: FC<BoardProps> = ({board, setBoard, player,
     currentPlayer, gameId, socket, setCurrentPlayer}) => {

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

    useEffect(() => {highlightCells()
        
    }, [selectedCell])

    useEffect(() => {
        const handleChangePlayer = (data: any) => {
            const { fromCell, toCell } = getEnemyMove(data.f, data.t);

            fromCell.moveFigure(toCell)
            setCurrentPlayer(player)
            
        }
        // setCurrentPlayer(player)
        socket.on('change', handleChangePlayer)
    return () => {
        socket.off('change', handleChangePlayer);
    };
    }, [board])

    function getEnemyMove(from: any, to: any) {
        let fromCell: object | null = null;
        let toCell: object | null = null;
        
        console.log(board)
        board.cells.forEach(row => {
            row.forEach(cell => {
                
                
                if (cell.x === to.x && cell.y === to.y) {
                    toCell = cell;
                }
                if (cell.x === from.x && cell.y === from.y) {
                    fromCell = cell;
                }
                if (fromCell && toCell){
                    
                    return
                }
                    
            });   if (fromCell && toCell){
                
                return
            }
        });
        if (fromCell && toCell) {
            
            return { fromCell, toCell };
        }
    }

    function click (cell: Cell) {
        
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell)

            console.log(selectedCell, cell, getCookie('userId'))
            
            socket.emit('move', {gameId: gameId, 
                f:{x: selectedCell.x, y: selectedCell.y}, 
                t:{x: cell.x, y: cell.y},
                piece: cell.figure?.name,
                color: currentPlayer?.color, 
                userId: getCookie('userId')}
                )
            setSelectedCell(null)
            updateBoard()
            setCurrentPlayer(new Player(Colors.ENEMY))
            
            console.log('gggg')
        } else {
            if (cell.figure?.color === currentPlayer?.color)
            setSelectedCell(cell)
        }
        
    }
    

    

    function highlightCells () {
        board.highlightCells(selectedCell)
        updateBoard()
    }

    function updateBoard ( ) {
        const newBoard = board.getCopyBoard()
        
        setBoard(newBoard)
        
    }

    const vertCoord = ['1','2','3','4','5','6','7','8']
    const horzCoord = ['A','B','C','D','E','F','G','H']
    return (
        <>
        
        <div className="board-wrapper">
        
        <div className="board">
           {board.cells.map((row, index) =>  
           
           <React.Fragment key={index}>
            
            {row.map(cell =>
             
            <CellComponent
                click={click} 
                cell={cell} 
                key={cell.id}
                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y} 
                />)}
                
           </React.Fragment>
            )}
            
        </div>
        <div className="vert-coord">{vertCoord.map(index => <div key = {index} className="coord">{index}</div>)}</div>
        <div className="horz-coord">{horzCoord.map(index => <div key = {index} className="coord">{index}</div>)}</div>
        
        </div>
        
        </>
    )
}

export default BoardComponent;