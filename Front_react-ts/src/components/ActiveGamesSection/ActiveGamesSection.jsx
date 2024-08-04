// https://jsonplaceholder.typicode.com/users
// import './ActiveGames.css'
import { useEffect, useState } from "react"
import getOrCreateUserId from "../hooks/uid"
import { useNavigate } from 'react-router-dom';
import './ActiveGames.css'
import { socket } from "../../pages/MainMenuPage";

const userId = getOrCreateUserId()

export default function ActiveGamesSection() {
    const [games, setGames] = useState([])
    const navigate = useNavigate()
    
    
    useEffect(()=> {
        socket.emit('update-games');
     }, [])
    

     useEffect(() => {
        const handleUpdateGames = (gameData) => {
            console.log(gameData.games, games);
            if (JSON.stringify(gameData.games) !== JSON.stringify(games)) {
                console.log(JSON.stringify(gameData.games) !== JSON.stringify(games), 'fdsfsdf');
                setGames(gameData.games);
            }
        };

        socket.on('update-games', handleUpdateGames);

        // Очистка слушателя при размонтировании компонента
        return () => {
            socket.off('update-games', handleUpdateGames);
        };
    }, [games]);
    // async function fetchGames() {
    //     const response = await fetch('http://127.0.0.1:5000/games');
    //     const games = await response.json();
        
    //     setGames(games['active-games']);
    //     console.log('games: ', games)
    // }
    const sortedGames = games.slice().sort((a, b) => {
        if (a.userId === userId) return -1;
        if (b.userId === userId) return 1;
        return 0;
    });

    
        
    // socket.on('update-games', (gameData) => {
    //     console.log(gameData.games, games)
    //     if (JSON.stringify(gameData.games) !== JSON.stringify(games)) {
    //         console.log(JSON.stringify(gameData.games) !== JSON.stringify(games), 'fdsfsdf');
    //         setGames(gameData.games);
    //     }
        
    // });
    
    
    

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