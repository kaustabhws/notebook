import './App.css';
import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import NoteState from './context/notes/NoteState';
import Welcome from './components/Home/Welcome';

function App() {

  const [myMode, setMyMode] = useState('light');
  const [myStat, setMyStat] = useState('Enable');

  const toggleBtn = () => {
    if (myMode === 'light') {
      setMyMode('dark');
      setMyStat('Disable');
      document.body.style.color = 'white';
      document.body.style.backgroundColor = '#131313';
    } else {
      setMyMode('light');
      setMyStat('Enable');
      document.body.style.color = '#131313';
      document.body.style.backgroundColor = 'white';
    }
  }

  return (
    <>
      <NoteState>
        <Router>
          <div className="App">
            <Navbar mode={myMode} toggleMode={toggleBtn} myStat={myStat} />
          </div>
          <Routes>
            <Route exact path='/' element={<Home mode={myMode} toggleMode={toggleBtn} myStat={myStat} />} />} />
            <Route exact path='/login' element={<Login mode={myMode} toggleMode={toggleBtn} myStat={myStat} />} />
            <Route exact path='/signup' element={<Signup mode={myMode} toggleMode={toggleBtn} myStat={myStat} />} />
            <Route exact path='/welcome' element={<Welcome mode={myMode} toggleMode={toggleBtn} myStat={myStat} />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
