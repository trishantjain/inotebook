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


function App() {


  const [mode, setMode] = useState('light')

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

  return (
    <>
      <NoteState>
        <Router>
          <Navbar mode={mode} toggleMode={toggleMode} />
          <Alert message="This is amazing REACT APP"/>
          <Routes>
            <Route exact path="/" element={<Home mode={mode} />}></Route>
            <Route exact path="/about" element={<About mode={mode} />}></Route>
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
