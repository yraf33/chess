import getOrCreateUserId from "./uid";
import { socket } from "../../App";
// import { userId } from "../../pages/MainMenuPage";


export async function addGame(gameTiming, {setNewTab}, color ) {
    gameTiming = gameTiming.split('+')
    const  gameTime  = gameTiming[0]
    const timeForMove = gameTiming[1]
    console.log(gameTiming, gameTime, timeForMove)
    const finalColor = color || 'random';
    socket.emit('create-game', 
        {
            gameTime: gameTime,
            timeForMove: timeForMove,
            color: finalColor,
            // userId: userId
        }, 
        (response) => {
            console.log('Game created:', response);
            // socket.emit('update-games');
            setNewTab('active-games');
        }
    );
}
    // const response =  await fetch('http://127.0.0.1:5000/add_game', {
    //     method: 'POST',
    //     // mode: 'no-cors',
    //     headers: {
    //         'Content-Type': 'application/json; charset=UTF-8',
    //         },
    //     body: JSON.stringify({
    //         gameTime: gameTime,
    //         timeForMove: timeForMove,
    //         color: finalColor,
    //         userId: userId
    //         }),
    //     });
        
    // if (response.ok) {
    //     socket.emit('create-game', 
    //         {
    //         gameTime: gameTime,
    //         timeForMove: timeForMove,
    //         color: finalColor,
    //         userId: userId
    //         })
    //     socket.emit('update-games', userId)
    //     setNewTab('active-games');
        
    //     }

