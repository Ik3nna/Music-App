import React from "react";
import Home from "./pages/Home/home";
import Header from "./components/header";
import Album from "./pages/Albums/album";
import Collection from "./pages/Collections/collections";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/collections" element={<Collection />} />
          <Route path="/album/:id" element={<Album />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
        </Routes>
        
      </BrowserRouter>
    </>  
  );
}

export default App;
