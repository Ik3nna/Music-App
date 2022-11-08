import React, { useState } from "react";
import styles from "./popular.module.css"

function SinglePopular ({ artist, title, cover, audio, duration }){

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

export default SinglePopular;