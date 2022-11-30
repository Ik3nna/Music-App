import React from "react";
import styles from "./home.module.css"

function Found ({ artist, title, cover, audio, duration }){

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

export default Found;