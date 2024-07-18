// https://jsonplaceholder.typicode.com/users
// import './ActiveGames.css'
import { useEffect, useState } from "react"
import getOrCreateUserId from "../hooks/uid"
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import './ActiveGames.css'

export default function ActiveGamesSection() {
    const [games, setGames] = useState([])
    const userId = getOrCreateUserId()
    const navigate = useNavigate()
    
    useEffect(()=> {
    fetchGames()
    const interval = setInterval(() => {fetchGames()}, 1000)
    
    return () => clearInterval(interval)
    }, [])

    async function fetchGames() {
        const response = await fetch('http://127.0.0.1:5000/games');
        const games = await response.json();
        
        setGames(games['active-games']);
        console.log('games: ', games)
    }
    const sortedGames = games.slice().sort((a, b) => {
        if (a.userId === userId) return -1;
        if (b.userId === userId) return 1;
        return 0;
    });
    

    const joinGame = (gameData) => {
        const socket = io('http://127.0.0.1:5000');
        console.log(gameData)

        socket.on('connect', () => {
            console.log('WebSocket connection established', gameData.gameId);
            socket.emit('join',  gameData.gameId );
        });

        socket.on('message', (message) => {
            console.log('Received message:', message.gameId);
            if (message.message === 'joined') {
                
                navigate(`/game/${message.gameId}`, { state:  gameData });
            }
        });

        socket.on('disconnect', () => {
            console.log('WebSocket connection closed');
        });
    };

    return (
        <div id='active-games-menu' >     
                
                {sortedGames.map((game) => <button 
                className={`game-list  ${game.userId === userId ? 'highlight': ''   } 
                ${game.color} `}
                   key={game.userId} 
                   onClick={() => joinGame(game)}> 
                   {game.gameTime}+{game.timeForMove}</button>)}
                
        </div>
    )
}