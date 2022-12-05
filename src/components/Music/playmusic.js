import React, { useState, useEffect } from "react";
import { Next, Play, Pause, Previous, RepeateOne, Shuffle, VolumeHigh } from "iconsax-react";
import { useGlobalContext } from "../context";
import styles from "./playmusic.module.css"

function PlayMusic () {
    const [playingNow, setPlayingNow] = useState({});

    const { volume, forward, handleChange, playing, nextMusic, prevMusic, audioRef, isPlaying, handlePlay,
    isRepeat, isShuffle, handleRepeat, handleShuffle, timer, forwardRef } = useGlobalContext();

    const { artist, title, duration, cover, audio } = playingNow;

    useEffect(() => {
        if (playing) {
          setPlayingNow(playing);
        }
    }, [playing]);

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

            <article className={styles.controls}>
                <button onClick={handleShuffle} >
                    <Shuffle variant="Bold" size="20" color={isShuffle ? "#FACD66" : "#ffffff"} />
                </button>

                <button onClick={prevMusic}>
                    <Previous variant="Bold" size="20" color="#ffffff" />
                </button>

                <button onClick={handlePlay}>
                    {!isPlaying ? <Play variant="Bold" /> : <Pause variant="Bold" />}
                </button>

                <button onClick={nextMusic}>
                    <Next variant="Bold" size="20" color="#ffffff" />
                </button>

                <button onClick={handleRepeat}>
                    <RepeateOne variant="Bold" size="20" color={isRepeat ? "#FACD66" : "#ffffff"} />
                </button>
            </article>

            <article className={styles.forward}>
                <div>
                    {timer.minute}:{timer.second}
                </div>

                <input
                    type="range"
                    value={forward}
                    onChange={(e) => handleChange(e, "forward")}
                    ref={forwardRef}
                />

                <div>{duration}</div>
            </article>

            <article className={styles.volume}>
                <button onClick={volume}>
                    <VolumeHigh variant="Bold" size="20" color="#ffffff" />
                </button>

                <input
                    type="range"
                    value={volume}
                    onChange={(e) => handleChange(e, "volume")}
                />
            </article>
        </section>
    );
}

export default PlayMusic;