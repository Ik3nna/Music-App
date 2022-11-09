import React, { useState } from "react";
import styles from "./release.module.css"

function SingleRelease ({ artist, title, cover, audio, duration }){
    const [isPlaying,setIsPlaying] = useState(false);


    return(
        <div className={styles.content}>
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

export default SingleRelease;