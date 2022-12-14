import React from "react";
import styles from "./main.module.css";
import { useGlobalContext } from "../context";
import NavIcons from "./Nav-icons";
import Playlist from "./singlePlaylist";
import { Heart } from "iconsax-react";

function Main () {
    const { playlist } = useGlobalContext();

    return(
        <section className={styles.container}>
            <NavIcons />
            
            <article>
                <div className={styles.content}>
                    <p className={styles.playlist}>Currated playlist</p>

                    <h2>R&nbsp;&&nbsp;B Hits</h2>

                    <p className={styles.ptext}>
                        All mine, Lie again, Petty call me everyday,<br />
                        Out of time, No love, Bad habit,<br />
                        and so much more
                    </p>

                    <div className={styles.innerDiv}>
                        <div className={styles.imageContainer}>
                            <img src="/assets/small-circle-1.svg" alt="circle-1" />
                            <img src="/assets/small-circle-2.svg" alt="circle-2" />
                            <img src="/assets/small-circle-1.svg" alt="circle-1" />
                            <img src="/assets/small-circle-2.svg" alt="circle-2" />
                        </div>

                        <Heart variant="Bold" size="20" color="#ffffff" className={styles.heart} />

                        <p>33k Likes</p>
                    </div>
                </div>

                <div className={styles.pexel}>
                    <img src="/assets/Vector.svg" alt="vector" />
                    <img src="/assets/Pexels-Photo.svg" alt="pexels" />
                    <img src="/assets/Vector-mobile.svg" alt="pexels-mobile" />
                </div>
            </article>

            <article className={styles.playlistContent}>
                <h2>Top charts</h2>

                <div className={styles.scroll}>
                    {playlist.map((item)=>{
                        return(
                            <Playlist key={item.id} data={item} {...item} />
                        );
                    })}
                </div>
            </article>
        </section>
    );
}

export default Main;