import React from "react";
import { useGlobalContext } from "../context";
import { NavLink } from "react-router-dom";
import { Home3, Radio, MusicLibrary2, VideoHorizontal, Profile, LogoutCurve, Heart } from "iconsax-react";
import styles from "./Nav-icons.module.css";

function NavIcons () {
    const { active } = useGlobalContext();
    
    return(
        <section className={`${active && styles.trans}`}>
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
                            <span>Music Videos</span>
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
        </section>
    );
}

export default NavIcons;