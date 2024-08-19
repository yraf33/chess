import { useState } from "react";
import './CreateGameSection.css';
import { timeOnGame } from "../../data";
import { timeOnMove } from "../../data";
import  Button  from "../../hooks/Button";
import { addGame } from "../../hooks/utils";



export default function CreateGameSection({ children, setActive, setNewTab}) {

    const [inputClasses, setInputClasses] = useState('range')
    const [timeForm, setTimeForm] = useState({gameTime: 3, timeForMove: 0})

    function valueHandler ({event, name}) {
        setTimeForm(prev  => {
            const newTimeForm = {...prev, [name]: event}
            
            if (newTimeForm["gameTime"] == 0 & newTimeForm["timeForMove"] == 0) {
                setInputClasses('range error')
            } else { 
                setInputClasses('range')
            }
            return newTimeForm;})
    }
    
    function selectGameTime(color) {
        const newGameTime = `${timeOnGame[timeForm['gameTime']]}+${timeOnMove[timeForm['timeForMove']]}`;
        console.log(setNewTab)
        addGame(newGameTime, {setNewTab}, color)
        setActive(false)
    }
    
        
    return (
        <>
        <div className="time-choice range">Минут на игру: 
            <span> {timeOnGame[timeForm["gameTime"]]}</span>
        <input className={inputClasses} 
               type="range" min="0" max="38" 
               value={timeForm["gameTime"]} 
               onChange={(event)=> valueHandler({event: event.target.value, name: "gameTime"})} ></input>
        </div>
        <div className="increment-choice range">Секунд за ход: 
            <span> {timeOnMove[timeForm["timeForMove"]]}</span>
        <input className={inputClasses}  
               type="range" min="0" max="30" 
               value={timeForm["timeForMove"]} 
               onChange={(event)=> valueHandler({event: event.target.value, name: "timeForMove"})}></input>
        </div>
        <div className="color-select">
        
        <Button variant="black" className="choose-color black" onClick={() => selectGameTime('black')}><i></i></Button>
        <Button variant="random" className="choose-color random" onClick={()=> selectGameTime()}><i></i></Button>
        <Button variant="white" className="choose-color white" onClick={()=> selectGameTime('white')}><i></i></Button>
       </div>
        
        </>
        
    )
}