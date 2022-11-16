import React, { useState, useEffect, useContext } from "react";

const AppContext = React.createContext();
const baseURL = "https://musica-api.up.railway.app/";

export const AppProvider = ({ children })=>{
    const [active, setActive] = useState(false);
    const [newRelease,setNewRelease] = useState([]);
    const [popular,setPopular] = useState([]);
    const [playlist,setPlaylist] = useState([]);
    const Arr = {
        likes: [],
        collections: []
    };

// Consumption of API
    const fetchData = (type)=>{
        fetch(baseURL + type)
        .then(response => {
            if (response.ok) {
              return response;
            }
            else {
              let error = new Error("Error " + response.status + ": " + response.statusText);
              error.response = response;
              throw error;
            }
          }, error => {
            let errmess = new Error(error.message);
            throw errmess;
          })
        .then(response => response.json())
        .then(data =>{
            if (type === "new") {
                setNewRelease(data);
            }
            if (type === "popular") {
                setPopular(data);
            }
            if (type === "playlist") {
                setPlaylist(data);
            }
        })
        .catch(error =>{
            console.log(error.message)
        })
    }

    useEffect(()=>{
        fetchData("new");
        fetchData("popular");
        fetchData("playlist");
    },[]);

// Likes
    const addToLikes = (playlist)=> {
        if (Arr.likes.find((item)=> item.id === playlist.id)) {
            Arr.likes = Arr.likes.filter((item)=>item.id !== playlist.id);
        } else {
            Arr.likes.push(playlist); 
        }
    }

//  Collection
    const addToCollection = (playlist)=> {
        if (Arr.collections.find((item)=> item.id === playlist.id)) {
            Arr.collections = Arr.collections.filter((item)=>item.id !== playlist.id);
        } else {
            Arr.collections.push(playlist); 
        }
    }

    return(
        <AppContext.Provider value={{
            active, setActive, newRelease, popular, playlist, Arr, addToLikes, addToCollection
        }}>
            {children}
        </AppContext.Provider>
    );
}

export const useGlobalContext = ()=>{
    return useContext(AppContext);
}