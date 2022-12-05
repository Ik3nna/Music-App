import { Heart, More } from "iconsax-react";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../components/context";
import styles from "./album.module.css";

function SingleAlbum ({ id, artist, duration, title, cover, playId }) {
    const { selectMusic, playing } = useGlobalContext();
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (playing.id === id) {
        setIsPlaying(true);
        } else {
        setIsPlaying(false);
        }
    }, [playing, id]);

    return(
        <article onClick={()=>selectMusic(id, playId)} className={`${isPlaying && styles.active}`}>
            <div>
                <img src={cover} alt={title} />
                <Heart color="#ffffff" cursor="pointer" className={styles.heart} />
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
}

export default SingleAlbum;