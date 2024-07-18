import  { FC, useEffect, useRef, useState } from "react";
import { Player } from "../../models/Player";
import { Colors } from "../../models/Colors";


interface TimerProps {
    currentPlayer: Player | null; //
    gameTime: string  //
    timeForMove: string
    restart: () => void; //
    

}
function convertTime (gameTime: number): string {
    const hours = Math.floor(gameTime / 60 / 60);
    const minutes = Math.floor(gameTime / 60) - hours*60;
    const seconds = gameTime % 60;
    return `${hours > 0 ? hours + ':' : ''}${minutes}:${seconds < 10? '0' : ''}${seconds}`;

}

function timeFormat (gameTime: string): number{
    const value = gameTime
    if (value.includes('/')) {
        const [numerator, denominator] = value.split('/').map(Number);
        return numerator / denominator
    }  else {
        return Number(value);
    }
    
}

const Timer: FC<TimerProps> = ({currentPlayer, gameTime, timeForMove, restart}) => {
    const newGameTime = timeFormat(gameTime)
    const newTimeForMove = timeFormat(timeForMove)
    const [blackTime, setBlackTime] = useState(newGameTime*60);
    const [whiteTime, setWhiteTime] = useState(newGameTime*60);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        
        startTimer()
        currentPlayer?.color === Colors.WHITE ? setBlackTime(prev => prev + newTimeForMove) : setWhiteTime(prev => prev + newTimeForMove)
    },[currentPlayer])

    function startTimer () {
        if (timer.current) {
            
            clearInterval(timer.current)
            
        }
        
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)
    }

    function decrementWhiteTimer () {
        setWhiteTime(prev => prev - 1)
    }

    function decrementBlackTimer () {
        setBlackTime(prev => prev - 1)
    }

    function handleRestart () {
        
        setWhiteTime(newGameTime*60)
        setBlackTime(newGameTime*60)
        restart()
    }
    
    return (
        <div>
            <button onClick={handleRestart}>Restart game</button>
            <h2>Чёрные {convertTime(blackTime)}  </h2>
            <h2>Белые {convertTime(whiteTime)}</h2>
        </div>
    )
}

export default Timer;