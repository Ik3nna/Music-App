import React, { useState, useEffect, useContext } from "react";

const AppContext = React.createContext();
const baseURL = "https://musica-api.onrender.com/";
const prevLikes = JSON.parse(localStorage.getItem("my-likes"));
const prevCol = JSON.parse(localStorage.getItem("my-collection"));

export const AppProvider = ({ children })=>{
    const [active, setActive] = useState(false);
    const [newRelease,setNewRelease] = useState([]);
    const [popular,setPopular] = useState([]);
    const [playlist,setPlaylist] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [likes, setLikes] = useState(prevLikes ? prevLikes : []);
    const [collections, setCollections] = useState(prevCol ? prevCol : [])

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

// Search for songs
    const [searchData, setSearchData] = useState([]);
    const [openSearch, setOpenSearch] = useState(false);

    useEffect(()=>{
        setSearchData([...newRelease, ...popular]);
    },[newRelease, popular]);

    const searchMusic = (data)=> {
        const searched = [...newRelease, ...popular].filter((music) =>
            music.artist.toLowerCase().includes(data.toLowerCase()) ||
            music.title.toLowerCase().includes(data.toLowerCase())
        );
        setSearchData(searched);
        setOpenSearch(true);
    }

    const closeSearch = () => {
        setOpenSearch(false);
    };

// Likes
    const addToLikes = (playlist)=> {
        if (likes.find((item)=> item.id === playlist.id)) {
            const newLikes = likes.filter((item)=>item.id !== playlist.id);
            setLikes(newLikes);
            localStorage.setItem("my-collection", JSON.stringify(newLikes));
        } else {
            const newLikes = [...likes, playlist] 
            setLikes(newLikes)
            localStorage.setItem("my-collection", JSON.stringify(newLikes));
        }
    }

//  Collection
    const addToCollection = (playlist)=> {
        if (collections.find((item)=> item.id === playlist.id)) {
            const newcol = collections.filter((item)=>item.id !== playlist.id);
            setCollections(newcol);
            localStorage.setItem("my-collection", JSON.stringify(newcol));
        } else {
            const newcol = [...collections, playlist] 
            setCollections(newcol);
            localStorage.setItem("my-collection", JSON.stringify(newcol));
        }
    }

    return(
        <AppContext.Provider value={{
            active, setActive, newRelease, popular, playlist, likes, collections, addToLikes, addToCollection,
            searchMusic, closeSearch, openSearch, searchData, searchText, setSearchText
        }}>
            {children}
        </AppContext.Provider>
    );
}

export const useGlobalContext = ()=>{
    return useContext(AppContext);
}