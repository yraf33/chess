import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import './ActiveGames.css'
import { menuSocket, updateGames, onUpdateGames, onRedirectOnGame } from "../../services/socketService";
import { getCookie } from "../../hooks/utils";


export default function ActiveGamesSection() {
    const [games, setGames] = useState([])
    const navigate = useNavigate()
    
    // обновляем список активных игр при открытии вкладки
    useEffect(() => {
        updateGames();
    }, []);

    // обновляем список игр, когда другой пользователь создал новую игру
    useEffect(() => {
        const handleUpdateGames = (gameData) => {
            if (JSON.stringify(gameData.games) !== JSON.stringify(games)) {
                setGames(gameData.games);
            }
        };

        onUpdateGames(handleUpdateGames);

        return () => {
            menuSocket.off('update-games', handleUpdateGames);
        };
    }, [games]);

    useEffect(() => {
        const handleRedirect = (gameData) => {
            menuSocket.disconnect()
            navigate(`/game/${gameData['gameId']}`, { state: gameData });
            document.cookie = `gameId=${gameData['gameId']}; path=/`;
            console.log('Redirect')
        };

        onRedirectOnGame(handleRedirect);

        return () => {
            console.log('redirect-off')
            menuSocket.off('redirect-on-game', handleRedirect);
        };
    }, [navigate]);

    
 
    const sortedGames = games.slice().sort((a, b) => {
        console.log(a,b)
        if (a.userId === getCookie('userId')) return -1;
        if (b.userId === getCookie('userId')) return 0;
        return -1;
    });

    const joinGame = (gameData) => {
        console.log('join-game', gameData)
        menuSocket.emit('join-game', gameData)
    };
    
    return (
        <div id='active-games-menu' >     
                {sortedGames.map((game) => <button 
                className={`game-list  ${game.userId === getCookie('userId') ? 'highlight': ''   } 
                ${game.color} `}
                   key={game.gameId} 
                   onClick={() => joinGame(game)}> 
                   {game.gameTime}+{game.timeForMove}</button>)}
                
        </div>
    )
}