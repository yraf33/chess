import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import MainMenuPage from './pages/MainMenuPage.jsx';
import GamePage from './pages/GamePage.tsx';
import Footer from './components/Footer/Footer.jsx';
import io from 'socket.io-client';




// export const socket = io('ws://127.0.0.1:5000', {transport: ['websocket']})
// socket.emit('set-userId', document.cookie)
// socket.on('connection', (data) => {
//   console.log('fdsffd', data.userId, data.sid)
//   document.cookie = `sid=${data.sid}; path=/`;
//   document.cookie = `userId=${data.userId}; path=/;`;
// })
  


// socket.on(`connection`, (data) => {
//   console.log('fdsffd', data)
//    document.cookie = `sid=${data.sid}; path=/`;
//    document.cookie = `userId=${data.userId}; path=/`
//  });
 

export default function  App() {
  console.log('gggggxvc')
  return (
    <>
    <Router>
      <Header />
      <Routes>
        <Route path="" exact element={<MainMenuPage/>}/>
        <Route path="/game/:id" element={<GamePage/>} /> 
        
      </Routes>
      {/* <Outlet /> */}
      <Footer/>
      
      </Router>
      {/* <Route path="/game/:id" component={} /> */}
      
    </>
  )
}


