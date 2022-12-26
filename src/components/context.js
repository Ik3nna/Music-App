import React, { useState, useEffect, useContext, useRef } from "react";

const AppContext = React.createContext();
const baseURL = "https://musica-api.onrender.com/";
const prevLikes = JSON.parse(localStorage.getItem("my-likes"));
const prevCol = JSON.parse(localStorage.getItem("my-collection"));

export const AppProvider = ({ children })=>{
    const [active, setActive] = useState(false);
    const [newRelease,setNewRelease] = useState([]);
    const [popular,setPopular] = useState([]);
    const [playlist,setPlaylist] = useState([]);

    const [musics, setMusics] = useState([]);
    const [playing, setPlaying] = useState(null);
    const [playingPosition, setPlayingPostion] = useState(0);
    const [playingAlbumType, setPlayingAlbumType] = useState("new");

    const [isPlaying, setIsPlaying] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);

    const audioRef = useRef();

    const [searchText, setSearchText] = useState("");
    const [likes, setLikes] = useState(prevLikes ? prevLikes : []);
    const [collections, setCollections] = useState(prevCol ? prevCol : []);

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
              setPlaying(data[0]);
              setMusics(data);
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


// Music functionalities
    const playMusic = () => {
        setTimeout(() => {
          audioRef.current.play();
          setIsPlaying(true);
        }, 500);
    };
    
    const resetPlaybar = () => {
        forwardRef.current.style.backgroundSize = "0% 100%";
        setForward(0);
    };
    

    // FOR NEXT BUTTON
    const nextMusic = () => {
        resetPlaybar();
    
        if (isShuffle) {
          const random = Math.floor(Math.random() * musics.length);
          setPlaying(musics[random]);
          setPlayingPostion(random);
    
          if (isPlaying) {
            playMusic();
          }
          return;
        }
    
        if (playingPosition === musics.length - 1) {
          setPlaying(musics[0]);
          setPlayingPostion(0);
        } else {
          setPlaying(musics[playingPosition + 1]);
          setPlayingPostion(playingPosition + 1);
        }
    
        if (isPlaying) {
          playMusic();
        }
    };
    
    // FOR PREVIOUS BUTTON
    const prevMusic = () => {
        resetPlaybar();
    
        if (isShuffle) {
          const random = Math.floor(Math.random() * musics.length);
          setPlaying(musics[random]);
          setPlayingPostion(random);
    
          if (isPlaying) {
            playMusic();
          }
          return;
        }
    
        if (playingPosition === 0) {
          setPlaying(musics[musics.length - 1]);
          setPlayingPostion(musics.length - 1);
        } else {
          setPlaying(musics[playingPosition - 1]);
          setPlayingPostion(playingPosition - 1);
        }
    
        if (isPlaying) {
          playMusic();
        }
    };
    
    // FOR PLAY AND PAUSE BUTTONS
    const handlePlay = () => {
        if (!isPlaying) {
          setIsPlaying(true);
          audioRef.current.play();
        } else {
          setIsPlaying(false);
          audioRef.current.pause();
        }
    };
    
    // FOR REPEAT BUTTON
    const handleRepeat = () => {
        setIsRepeat(!isRepeat);
    };
    
    // FOR SHUFFLE BUTTON
    const handleShuffle = () => {
        setIsShuffle(!isShuffle);
    };
    
    // PLAY A MUSIC FROM THE HOMEPAGE
    const selectMusic = (id, playId) => {
        resetPlaybar();
    
        const [type, tempIndex1] = id.split("-");
        const index = +tempIndex1 - 1;
    
        if (playId) {
          const [type2, tempIndex2] = playId.split("-");
          const index2 = +tempIndex2 - 1;

          setPlayingAlbumType(type2);
          setMusics(playlist[index2].files);
          setPlaying(playlist[index2].files[index]);
          setPlayingPostion(index);

        }
    
        if (type === playingAlbumType && !playId) {

          setPlaying(musics[index]);
          setPlayingPostion(index);

        } else if (type === "new") {

          setPlayingAlbumType(type);
          setMusics(newRelease);
          setPlaying(newRelease[index]);
          setPlayingPostion(index);

        } else if (type === "popular") {

          setPlayingAlbumType(type);
          setMusics(popular);
          setPlaying(popular[index]);
          setPlayingPostion(index);
        }
    
        playMusic();
    };
    
    // PLAY WITH SPACEBAR ON KEYBOARD
    const playWithKeyboard = (e) => {
        if (e.key === " ") {
          e.preventDefault();
          handlePlay();
        }
    };
    
    useEffect(() => {
        window.addEventListener("keydown", playWithKeyboard);
        return () => window.removeEventListener("keydown", playWithKeyboard);
    }, [playWithKeyboard]);
    
    // FOR VOLUME AND FORWARD
    const [forward, setForward] = useState(0);
    const [volume, setVolume] = useState(100);
    const [timer, setTimer] = useState({});
    const forwardRef = useRef();
    
    const updateNextSong = () => {
        if (isRepeat) {
          playMusic();

          return;
        } 
        else if (isShuffle) {
          const random = Math.floor(Math.random() * musics.length);
          setPlaying(musics[random]);
          setPlayingPostion(random);
          playMusic();

          return;
        } 
        else {
          nextMusic();
        }
    };
    
    // function for updating the forward range
    const updateRange = (value) => {
        setTimeout(() => {
          const currentTime = Math.floor(audioRef.current.currentTime);
          const minute = Math.floor(currentTime / 60);
          let second = Math.floor(currentTime % 60);
          if (second < 10) second = "0" + second;
    
          setTimer({ minute, second });
    
          const duration = Math.floor(audioRef.current.duration);
    
          if (!value) {
            value = Math.floor((currentTime / duration) * 100);
    
            forwardRef.current.style.backgroundSize = value + "% 100%";
            setForward(value ? value : 0);
          } else {
            audioRef.current.currentTime = (value / 100) * duration;
          }
    
          forwardRef.current.style.backgroundSize = value + "% 100%";
          setForward(value ? value : 0);
    
          if (currentTime === duration) {
            updateNextSong();
          }
        }, 300);
      };
    
    // handling volume and forward change
    const handleChange = (e, type) => {
        const target = e.target;
        const value = target.value;
    
        if (type === "volume") {
          target.style.backgroundSize = value + "% 100%";
          audioRef.current.volume = volume / 100;
          setVolume(value);
        } 
        else if (type === "forward") {
          setForward(value);
          updateRange(value);
        }
    };
    
    // update timer and forward range
    useEffect(() => {
      setTimeout(updateRange, 400);
    }, [isPlaying, audioRef.current?.currentTime, updateRange]);


// Likes
    const addToLikes = (playlist)=> {
        if (likes.find((item)=> item.id === playlist.id)) {
            const newLikes = likes.filter((item)=>item.id !== playlist.id);
            setLikes(newLikes);
            localStorage.setItem("my-likes", JSON.stringify(newLikes));
        } else {
            const newLikes = [...likes, playlist] 
            setLikes(newLikes)
            localStorage.setItem("my-likes", JSON.stringify(newLikes));
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
            searchMusic, closeSearch, openSearch, searchData, searchText, setSearchText, forward, volume,
            handleChange, playing, nextMusic, prevMusic, audioRef, isPlaying, handlePlay, isRepeat, isShuffle,
            handleRepeat, handleShuffle, selectMusic, forwardRef, timer
        }}>
            {children}
        </AppContext.Provider>
    );
}

export const useGlobalContext = ()=>{
    return useContext(AppContext);
}
