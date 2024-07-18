import React, { FC, useEffect, useState }  from "react";
import './BoardComponent.css';
import {Board} from "../../models/Board";
import CellComponent from "./CellComponent";
import { Cell } from "../../models/Cell";
import { Player } from "../../models/Player";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;


}
 const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

    useEffect(() => {highlightCells()}, [selectedCell])

    function click (cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell)
            swapPlayer()
            setSelectedCell(null)
            updateBoard()
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