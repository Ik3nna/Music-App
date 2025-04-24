import React, { useEffect, useRef } from "react";
import Home from "./pages/Home/home";
import Header from "./components/header";
import Album from "./pages/Albums/album";
import PlayMusic from "./components/Music/playmusic";
import Collection from "./pages/Collections/collections";
import Radio from "./pages/Radio/radio";
import Video from "./pages/Video/video";
import Profile from "./pages/Profile/profile";
import { MutatingDots } from "react-loader-spinner";
import { useGlobalContext } from "./components/context";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

function App() {
  const { newRelease, popular, playlist } = useGlobalContext();
  const hasMounted = useRef(false);
  const reloadTimeout = useRef(null);
  const dataIsMissing = !newRelease || newRelease.length === 0 || !popular || popular.length === 0 || !playlist || playlist.length === 0

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;

      reloadTimeout.current = setTimeout(() => {
        if (dataIsMissing) {
          window.location.reload();
        }
      }, 5000);
    }

    if (!dataIsMissing && reloadTimeout.current) {
      clearTimeout(reloadTimeout.current);
    }

    return () => {
      if (reloadTimeout.current) {
        clearTimeout(reloadTimeout.current);
      }
    };
  }, [dataIsMissing]);

  return (
    <>
      {dataIsMissing ?
        <div className="spinner">
          <MutatingDots 
            visible={true}
            height="100"
            width="100"
            color="#FACD66"
          />
        </div> :
        <BrowserRouter>
          <Header />
            
          <AnimatePresence onExitComplete>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/collections" element={<Collection />} />
              <Route path="/album/:id" element={<Album />} />
              <Route path="/radio" element={<Radio />} />
              <Route path="/video" element={<Video />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Navigate replace to="/home" />} />
            </Routes>
          </AnimatePresence>
            
          <PlayMusic />
        </BrowserRouter>
      }
    </>  
  );
}

export default App;
