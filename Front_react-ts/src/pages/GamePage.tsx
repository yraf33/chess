import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import BoardComponent from '../components/BoardComponent/BoardComponent';
import { Player } from '../models/Player';
import {Board} from "../models/Board";
import { Colors } from '../models/Colors';
import LostFigures from '../components/BoardComponent/LostFigures';
import Timer from '../components/BoardComponent/Timer';
import { useLocation } from 'react-router-dom';
// import { io } from 'socket.io-client';
import {gameSocket} from '../services/socketService.js'
import { Queen } from '../models/figures/Queen.js';






export default function GamePage() {
    const {state} = useLocation();
    const player = new Player(state.color)
    console.log(player)
    
    const [board, setBoard] = useState(new Board())
    // const socket = io('ws://127.0.0.1:5000')
    
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
    
    useEffect(() => {
        gameSocket.connect()
        gameSocket.on('newBoard', newBoardHandler)
        return () => {
            gameSocket.off('newBoard', newBoardHandler);
        }
    }, [board])
    const newBoardHandler = (remoteBoard) => {
        
                board.cells.forEach(row =>{
                    row.forEach(cell =>{
                    if (remoteBoard[cell.y][cell.x] !== ' '){
                        console.log('new figure', remoteBoard[cell.y][cell.x][0])
                        const color = remoteBoard[cell.y][cell.x][0] == 'w' ? Colors.WHITE  : Colors.BLACK
                        cell.setFigure(new Queen(color, cell))
                        
                    }
                    const newBoard = board.getCopyBoard()
        
                    setBoard(newBoard)
                    console.log(remoteBoard[cell.x][cell.y], cell)

                })})
            
    }

    useEffect(() => {
        const newBoard = new Board();
        newBoard.initCells()
        setBoard(newBoard)
        
        state.color == 'white' ? setCurrentPlayer(player) : console.log('enemy')
        return () => {
            gameSocket.disconnect();
        }
        // socket.connect()
        
    }, []);

    // function swapPlayer() {
    //     setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
    // }

    function restart () {
        const newBoard = new Board();
        newBoard.initCells()
        newBoard.addFigures()
        setBoard(newBoard);
    }


    return (
        
        <div className="app">
        <Timer restart={restart} 
            currentPlayer={currentPlayer} 
            gameTime={state.gameTime} 
            timeForMove={state.timeForMove} 
        />
        <BoardComponent 
        socket={gameSocket}  // добавить socket в компонент
        gameId={state.gameId}
        board={board} 
        setBoard={setBoard}
        player={player}
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        // swapPlayer={swapPlayer}
        />
        <div className='stat'>
        
        <LostFigures title={"Чёрные фигуры"} figures={board.lostBlackFigures} />
        
        
        <LostFigures title={"Белые фигуры"} figures={board.lostWhiteFigures} />
        
        </div>
        
        </div>
        
        );
}
