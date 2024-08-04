import Button from "../hooks/Button";
import './TimePick.css'
import { addGame } from "../hooks/utils";
import { socket } from "../../pages/MainMenuPage";
import { useEffect } from "react";



export default function TimePickupSection ({setNewTab}){
    const timeSelectArray = ['5+0','10+0','15+0','30+0',
        '5+3','10+2','15+3','30+5',
        '5+5','10+5','15+10','30+30'];
        
    useEffect(() => {
        socket.emit('leave-active-games');
    },[])
    

    return(
    <div id="menu-background">
            {timeSelectArray.map((item,index) => (
                <Button key={index} className='time-pickup-btn' onClick={()=> (addGame(item, {setNewTab}))} >{item}</Button>
            ))}
            </div>)}

            