import React from "react";
import styles from "./main.module.css";
import { useGlobalContext } from "../context";
import { NavLink } from "react-router-dom";
import { Home3, Radio, MusicLibrary2, VideoHorizontal, Profile, LogoutCurve, Heart } from "iconsax-react";

function Main () {
    const { playlist } = useGlobalContext();

    return(
        <section className={styles.container}>
            <aside>
                <ul className={styles.list}>
                    <li>
                        <NavLink to="/home" className={({isActive})=> isActive ? styles.activeLink : null}>
                            <Home3 variant="Bold" size="27" />
                            <span>Home</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/collections" className={({isActive})=> isActive ? styles.activeLink : null}>
                            <MusicLibrary2 variant="Bold" size="27" />
                            <span>My collections</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/radio" className={({isActive})=> isActive ? styles.activeLink : null}>
                            <Radio variant="Bold" size="27" />
                            <span>Radio</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/video" className={({isActive})=> isActive ? styles.activeLink : null}>
                            <VideoHorizontal variant="Bold" size="27" />
                            <span>Video</span>
                        </NavLink>
                    </li>
                </ul>

                <ul className={styles.secondList}>
                    <li>
                        <NavLink to="/profile" className={({isActive})=> isActive ? styles.activeLink : null}>
                            <Profile variant="Bold" size="27" />
                            <span>Profile</span>
                        </NavLink>
                    </li>

                    <li>
                        <button>
                            <LogoutCurve variant="Bold" size="27" />
                            <span>Logout</span>
                        </button>
                    </li>
                </ul>
            </aside>

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
                    <img src="/assets/Pexels-Photo.svg" alt="pexels-photo" />
                </div>
            </article>

            <article className={styles.playlistContent}>
                <h2>Top charts</h2>

                <div className={styles.scroll}>
                    {playlist.map((item)=>{
                        const { id, title, info, cover, files } = item;

                        const totalMin = files.reduce((total, file)=>{
                            const duration = +file.duration.split(":")[0];
                            total += duration;

                            return total;
                        },0);

                        const totalSec = files.reduce((total, file)=>{
                            const duration = +file.duration.split(":")[1];
                            total += duration;
                            return total % 60;
                        },0);

                        return(
                            <div key={id} className={styles.playlistContainer}>
                                <img src={cover} alt={title} />

                                <div className={styles.playlistInfo}>
                                    <h4>{title}</h4>
                                    <p>{info.substring(0, 40)}...</p>
                                    <p>{(totalMin < 10) ? `0${totalMin}` : totalMin}: {totalSec}</p>
                                </div>

                                <div className={styles.circle}>
                                    <Heart size="19" color="#facd66" className={styles.likes} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </article>
        </section>

        
    );
}

export default Main;