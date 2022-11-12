import React, { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useGlobalContext } from "../../components/context";
import NavIcons from "../../components/Hero-section/Nav-icons";
import { Heart, MusicSquareAdd, PlayCircle, ArrowLeft } from "iconsax-react";
import styles from "./album.module.css";

function Album() {
    const { id } = useParams();
    const { navigate } = useNavigate();
    const [searchParams] = useSearchParams();
    const { playlist } = useGlobalContext();
    const [active, setActive] = useState(searchParams.get("love"));
    
    return(
        <>
            {playlist.map((items)=>{
                if (items.id === id) {
                    const { id, title, cover, info, files } = items;

                    const totalMin = files.reduce((total,file)=>{
                        const duration = +file.duration.split(":")[0];
                        total += duration;

                        return total;
                    },0);

                    return(
                        <section key={id} className={styles.albums}>
                            <NavIcons />

                            <article>
                                <img src={cover} alt={title} />

                                <div className={styles.content}>
                                    <h2>{title}</h2>
                                    <p className={styles.info}>{info}</p>
                                    <p>{files.length} songs - {totalMin}&nbsp;mins&nbsp;+</p>

                                    <div className={styles.buttons}>
                                        <div className={styles.play}>
                                            <PlayCircle variant="Bold" color="#FACD66" />
                                            <p>Play all</p>
                                        </div>

                                        <div className={styles.collection}>
                                            <MusicSquareAdd variant="Bold" color="#FACD66" />
                                            <p>Add to collection</p>
                                        </div>

                                        <div>
                                            {active ?
                                                <Heart variant="Bold" color="#E5524A" />
                                                :<Heart color="#facd66" />
                                            }  
                                        </div>
                                    </div>
                                </div>
                            </article>
                           
                        </section>
                    );
                }
            })}
        </>
    );
}

export default Album;