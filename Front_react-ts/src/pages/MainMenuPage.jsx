import MenuButtonSection from "../components/MenuButtonSection/MenuButtonSection"
import TimePickupSection from "../components/TimePickupBtns/TimePickBtns"
import ActiveGamesSection from "../components/ActiveGamesSection/ActiveGamesSection"
import { useEffect, useState } from "react"
import AsideMenu from "../components/AsideMenu/AsideMenu"
import PlayerStatComponent from "../components/PlayerStatComponent/PlayerStatComponent"
import ChatSection from "../components/ChatSection/ChatSection"
import { menuSocket } from "../services/socketService"




export default function MainMenuPage () {
    const [tab, setTab] = useState('main')
   useEffect(() => {
      menuSocket.connect()
   }, [])
    
    
 return (
    <>
    <main>
      <div className="wrapper">
      <div className="main-wrapper">
         <PlayerStatComponent/>
         <MenuButtonSection active={tab} setNewTab={(current) => setTab(current)}>
          {tab==='main' && <TimePickupSection setNewTab={(current) => setTab(current)}/>} 
          {tab==='active-games'&& <ActiveGamesSection/> }
        </MenuButtonSection>
        </div>
        <ChatSection/>
        </div>
        <AsideMenu/>
        </main>
        
    </>
 )
}