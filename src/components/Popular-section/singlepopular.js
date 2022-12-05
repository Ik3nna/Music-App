import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import styles from "./popular.module.css"

function SinglePopular ({ artist, title, cover, id }){
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
        <div className={`${styles.content} ${isPlaying && styles.active}`} onClick={()=>selectMusic(id)}>
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

export default SinglePopular;