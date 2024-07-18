import getOrCreateUserId from "./uid";


export async function addGame(gameTiming, {setNewTab}, color ) {
    gameTiming = gameTiming.split('+')
    const  gameTime  = gameTiming[0]
    const timeForMove = gameTiming[1]
    console.log(gameTiming, gameTime, timeForMove)
    const finalColor = color || 'random';
    const userId = getOrCreateUserId();
        
    const response =  await fetch('http://127.0.0.1:5000/add_game', {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            },
        body: JSON.stringify({
            gameTime: gameTime,
            timeForMove: timeForMove,
            color: finalColor,
            userId: userId
            }),
        });
    if (response.ok) {
        setNewTab('active-games');
        }

}