import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavIcons from "../../components/Hero-section/Nav-icons";
import { useGlobalContext } from "../../components/context";
import styles from "./collections.module.css";

function Collection () {
    const { likes, collections } = useGlobalContext();
    const [cx, setCx] = useState(true);
    const [lx, setLx] = useState(false)

    const handleClick = (arr)=> {
        if (arr === "col") {
            setCx(true);
            setLx(false)
        } else {
            setLx(true);
            setCx(false)
        }
    }

    return(
        <main>
            <section className={styles.container}>
                <NavIcons />

                <article className={styles.btnContainer}>
                    <div className={cx ? `${styles.active}` : null} onClick={()=>handleClick("col")}>My collection</div>
                    <div className={lx ? `${styles.active}` : null} onClick={()=>handleClick("")}>Likes</div>
                </article>

                <article className={styles.display}>
                    {lx ? 
                        likes.map((like)=>{
                            const { id, cover, files, title } = like;
                            return(
                                <Link to={`/album/${id}`} key={id} className={styles.likes}>
                                    <img src={cover} alt ={title} />
                                    <p>{title}</p>
                                    <p>{files[0].artist}</p>
                                </Link>
                            );
                        }) 
                        : 
                        collections.map((col)=>{
                            const { id, cover, files, title } = col;
                            return(
                                <Link to={`/album/${id}`} key={id} className={styles.collections}>
                                    <img src={cover} alt ={title} />
                                    <p>{title}</p>
                                    <p>{files[0].artist}</p>
                                </Link>
                            );
                        })
                    }
                </article>
            </section>
        </main>
    );
}

export default Collection;