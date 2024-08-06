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
    
    // обновляем список активных игр при открытии вкладки
    useEffect(()=> {
        socket.emit('update-games', userId);
     }, [])
    
    //  обновляем список игр, когда другой пользователь создал новую игру
     useEffect(() => {
        const handleUpdateGames = (gameData) => {
            console.log(gameData.games, games);
            if (JSON.stringify(gameData.games) !== JSON.stringify(games)) {
                console.log(JSON.stringify(gameData.games) !== JSON.stringify(games), 'fdsfsdf');
                setGames(gameData.games);
            }
        };
        socket.on('update-games', handleUpdateGames);
        return () => {
            socket.off('update-games', handleUpdateGames);
        };
    }, [games]);
 
    const sortedGames = games.slice().sort((a, b) => {
        if (a.userId === userId) return -1;
        if (b.userId === userId) return 1;
        return 0;
    });

    const joinGame = (gameData) => {
        if (userId !== gameData.userId) {
            socket.emit('join-game', gameData)
        }
        
    
    };
    socket.on('redirect-on-game', (gameData) => {
        console.log('redirect-on-game', gameData)
        navigate(`/game/${gameData['gameId']}`, { state:  gameData })
    })
    
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