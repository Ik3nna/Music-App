import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../components/context";
import NavIcons from "../../components/Hero-section/Nav-icons";
import { Heart, MusicSquareAdd, PlayCircle, ArrowLeft, More } from "iconsax-react";
import styles from "./album.module.css";

function Album() {
    const { id } = useParams();
    const { navigate } = useNavigate();
    const { playlist, Arr, addToLikes, addToCollection } = useGlobalContext();
    const [data, setData] = useState({});
    const [love, setLove] = useState(Arr.likes.find((item)=>item.id === id));
    const [collect, setCollect] = useState(Arr.collections.find((item)=>item.id === id));

    const handleLikes = ()=> {
        setLove(!love);
        addToLikes(data);
    }

    const handleCollection = ()=> {
        setCollect(!collect);
        addToCollection(data);
    }

    useEffect(()=>{
        const data = playlist.find((item)=> item.id === id);
        setData(data);
    },[playlist])
    
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
                        <main className={styles.main} style={{
                            backgroundImage: `url(${cover})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover", 
                            position: "relative"
                        }}>
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

                                            <div className={styles.collection} onClick={handleCollection}>
                                                <MusicSquareAdd variant="Bold" color="#FACD66" />
                                                <p>{collect ? "Remove from collection" : "Add to collection"}</p>
                                            </div>

                                            <div className={love && styles.circleLove} onClick={handleLikes}>
                                                {love ?
                                                    <Heart variant="Bold" color="#E5524A" />
                                                    :<Heart color="#facd66" />
                                                }  
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </section>

                            <section className={styles.playBtn}>
                                {files.map((item)=>{
                                const { id, artist, duration, title, cover, audio } = item;
                                return(
                                    <article key={id}>
                                        <div>
                                            <img src={cover} alt={title} />
                                            <Heart color="#ffffff" cursor="pointer" />
                                        </div>

                                        <div>
                                            {title} - {artist}
                                        </div>

                                        <div>Single</div>

                                        <div>{duration}</div>

                                        <div>
                                            <More color="#facd66" cursor="pointer" />
                                        </div>
                                    </article>
                                );
                                })}
                            </section>
                        </main>
                    );
                }
            })}
        </>
    );
}

export default Album;