import {v4 as uuidv4}  from 'uuid';
// import { socket } from '../../pages/MainMenuPage';
// import { socket } from '../App';


export default function getUserId() {
    // let userId = document.coockie
    let userId = uuidv4();
    // document.coockie = `userId=${userId}; path=/`;
    // console.log(userId, document.coockie);
    
    
    if (!userId) {
        userId = uuidv4();
        document.coockie = 'userId=' + userId;
    }
    
    
    
    return userId;
}