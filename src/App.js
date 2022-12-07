import React from "react";
import Home from "./pages/Home/home";
import Header from "./components/header";
import Album from "./pages/Albums/album";
import PlayMusic from "./components/Music/playmusic";
import Collection from "./pages/Collections/collections";
import Radio from "./pages/Radio/radio";
import Video from "./pages/Video/video";
import Profile from "./pages/Profile/profile";
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
          <Route path="/radio" element={<Radio />} />
          <Route path="/video" element={<Video />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
        </Routes>
        
        <PlayMusic />
      </BrowserRouter>
    </>  
  );
}

export default App;
