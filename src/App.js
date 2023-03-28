import './App.css';
import {
  BrowserRouter as Router,
  Routes, Route,
} from "react-router-dom"
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {


  const [mode, setMode] = useState('light')
  const [alert, setAlert] = useState(null);
  const toggleMode = () => {
    if (mode === 'light') {
      setMode("dark");
      document.body.style.backgroundColor = 'black';
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  }

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar mode={mode} toggleMode={toggleMode} />
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} mode={mode} />}></Route>
            <Route exact path="/about" element={<About showAlert={showAlert} mode={mode} />}></Route>
            <Route exact path="/login" element={<Login showAlert={showAlert} mode={mode} />}></Route>
            <Route exact path="/signup" element={<Signup showAlert={showAlert} mode={mode} />}></Route>
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
