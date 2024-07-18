import { useEffect, useState } from 'react';

import BoardComponent from '../components/BoardComponent/BoardComponent';
import { Player } from '../models/Player';
import {Board} from "../models/Board";
import { Colors } from '../models/Colors';
import LostFigures from '../components/BoardComponent/LostFigures';
import Timer from '../components/BoardComponent/Timer';
import { useLocation } from 'react-router-dom';



export default function GamePage() {
    const [board, setBoard] = useState(new Board())
    const whitePlayer =  new Player(Colors.WHITE)
    const blackPlayer = new Player(Colors.BLACK)
    
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
    


    useEffect(() => {
        restart()
        setCurrentPlayer(whitePlayer);
    }, []);

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
    }

    function restart () {
        const newBoard = new Board();
        newBoard.initCells()
        newBoard.addFigures()
        setBoard(newBoard);
    }
    const {state} = useLocation();
    
    console.log(state)
    // useEffect(() => {
    //     // Здесь вы можете загрузить данные игры с сервера
    //     fetch(`http://localhost:5000/game/${id}`)
    //         .then(response => response.json())
    //         .then(data => setGame(data))
    //         .then(response=> console.log(response));
    // }, [id]);

    // if (!game) {
    //     return <div>Loading...</div>;
    // }

    return (
        
        <div className="app">
        <Timer restart={restart} currentPlayer={currentPlayer} gameTime={state.gameTime} timeForMove={state.timeForMove} />
        <BoardComponent 
        board={board} 
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
        />
        <div className='stat'>
        
        <LostFigures title={"Чёрные фигуры"} figures={board.lostBlackFigures} />
        
        
        <LostFigures title={"Белые фигуры"} figures={board.lostWhiteFigures} />
        
        </div>
        </div>
        
        );
}