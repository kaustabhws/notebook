import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import NoteState from './context/notes/NoteState';
import Welcome from './components/Home/Welcome';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <div className="App">
            <Navbar />
          </div>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/welcome' element={<Welcome />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
