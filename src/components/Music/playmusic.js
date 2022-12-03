import React, { useState, useEffect } from "react";
import { Next, Play, Pause, Previous, RepeateOne, Shuffle, VolumeHigh } from "iconsax-react";
import { useGlobalContext } from "../context";
import styles from "./playmusic.module.css"

function PlayMusic () {
    const [playingNow, setPlayingNow] = useState({});

    const { volume, forward, handleChange, playing, nextMusic, prevMusic, audioRef, isPlaying, handlePlay,
    isRepeat, isShuffle, handleRepeat, handleShuffle, timer, forwardRef } = useGlobalContext();

    const { artist, title, cover, audio } = playingNow;

    useEffect(() => {
        if (playing) {
          setPlayingNow(playing);
        }
    }, [playing]);

    console.log(playingNow);

    return(
        <section className={styles.audio}>
            <audio src={audio} ref={audioRef} />

            <article className={styles.deets}>
                <img src={cover} alt={title} />

                <div>
                    <p>{title}</p>
                    <p>{artist}</p>
                </div>
            </article>
        </section>
    );
}

export default PlayMusic;