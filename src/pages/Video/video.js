import React from "react";
import NavIcons from "../../components/Hero-section/Nav-icons";
import Nothing from "../../components/Nothing/nothing";
import styles from "./video.module.css";

function Video () {
    return(
        <main className={styles.container}>
            <NavIcons />

            <Nothing />
        </main>
    );
}

export default Video;