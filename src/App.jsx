import './App.css'
import React,{useState} from 'react'
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route } from 'react-router-dom';
import Details from './components/Details';

function App() {
  const [id, setId] = useState(0);

  const updateId = (id) => {
    setId(id);
  }

  return (
    <div className="container">
      <div className="app">
        <Routes>
          <Route path="/" element={<Home setid={updateId} />} />
          <Route path="/details" element={<Details id={id} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
