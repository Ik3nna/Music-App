import React from "react";
import Home from "./pages/home";
import Header from "./components/header";
import Album from "./pages/Albums/album";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        
        <Routes>
          <Route path="/home" element={<Home />} />
          {/* <Route path="/collections" /> */}
          <Route path="/album/:id" element={<Album />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
        </Routes>
        
      </BrowserRouter>
    </>  
  );
}

export default App;
