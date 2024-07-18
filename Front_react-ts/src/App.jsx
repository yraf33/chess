import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import MainMenuPage from './pages/MainMenuPage.jsx';
import GamePage from './pages/GamePage.tsx';
import Footer from './components/Footer/Footer.jsx';



export default function App() {

  return (
    <>
    <Router>
      <Header />
      <Routes>
        <Route path="" exact element={<MainMenuPage/>}/>
        <Route path="/game/:id" element={<GamePage/>} /> 
      </Routes>
      <Footer/>
      </Router>
      {/* <Route path="/game/:id" component={} /> */}
      
    </>
  )
}


