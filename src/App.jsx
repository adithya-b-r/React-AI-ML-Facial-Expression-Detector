import React from 'react';
import './App.css';
import { FaceAI } from './FaceAI';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageNotFound } from './PageNotFound';
import { Admin } from './Admin';

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<FaceAI/>} />
        <Route path="/fa" element={<Admin/>} />
        <Route path="*" element={<PageNotFound/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
