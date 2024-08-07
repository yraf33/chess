import {v4 as uuidv4}  from 'uuid';
// import { socket } from '../../pages/MainMenuPage';
import { socket } from '../../App';


export default function getUserId() {
    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = uuidv4();
        localStorage.setItem('userId', userId);
    }
    
    
    
    return userId;
}