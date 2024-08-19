

import Button from "../../hooks/Button"
import { useState } from "react";
import CreateGameSection from "../CreateGameSection/CreateGameSection";
import Modal from "../Modal/Modal";
import './MenuButton.css'



export default function MenuButtonSection({active, setNewTab, children}) {
    const [modalActive, setModalActive] = useState(false)
    
    
    return (
        <>
        <section className="game-search">
        
        <div id="select-game-menu">
            <Button id="fast-game-btn" isActive={active==='main'} onClick={()=> setNewTab('main')}>Быстрый старт</Button>
            <Button id="create-game-btn" isActive={modalActive} onClick={() => setModalActive(true)}>Создать игру</Button> 
            <Button id="active-games-btn" isActive={active==='active-games'} onClick={()=> setNewTab('active-games')}>Активные игры</Button>
            
        </div>
            {children}
            
            </section>
            <Modal active={modalActive} setActive={setModalActive}>
              <CreateGameSection setNewTab={setNewTab} setActive={setModalActive}/>
            </Modal>
            
        </>

    )

}