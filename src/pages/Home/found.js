import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../components/context";
import styles from "./home.module.css"

function Found ({ artist, title, cover, id }){
    const { selectMusic, playing } = useGlobalContext();
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (playing.id === id) {
            setIsPlaying(true);
        } 
        else {
            setIsPlaying(false);
        }
    }, [playing, id]);

    return(
        <div onClick={()=>selectMusic(id)} className={`${styles.content} ${isPlaying && styles.active}`}>
            <img src={cover} alt={title}  />

            <p>
                {title}
            </p>

            <p>
                {artist}
            </p>
        </div>
    );

}

export default Found;