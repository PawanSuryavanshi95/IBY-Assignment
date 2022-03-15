import { useEffect, useRef, useState } from 'react';
import './App.css';

import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

import Home from './screens/Home';
import Login from './screens/Login';
import Analytics from './screens/Analytics';

function App() {

  const isAuthenticated = () => {
    const token = localStorage.getItem("userToken");
    if(token) return true;
    else return false;
  }

  var navigate = useNavigate();

  return (
    <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/analytics" element={<Analytics navigate={navigate} />}></Route>
        <Route path="/" element={<Home />}></Route>
    </Routes>
  );
}

export default App;
