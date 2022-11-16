import React, { useState } from "react";
import styles from "./main.module.css";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import { Heart } from "iconsax-react";

function Playlist ({ id, data, title, cover, files }) {
    const { addToLikes, Arr } = useGlobalContext();
    const [love, setLove] = useState(Arr.likes.find((item)=>item.id === id));
    

    const handleLikes = ()=>{
        addToLikes(data);
        setLove(!love);
    }

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
        <div className={styles.playlistContainer}>
            <Link to={`/album/${id}`}>
                <img src={cover} alt={title} />
            </Link>

            <div className={styles.playlistInfo}>
                <h4>{title}</h4>
                <p>{files[0].artist}</p>
                <p>{(totalMin < 10) ? `0${totalMin}` : totalMin}: {totalSec}</p>
            </div>

            <div className={`${styles.circle} ${love && styles.circleLove}`} onClick={handleLikes}>
                {love ?
                    <Heart variant="Bold" size="19" color="#E5524A" className={styles.likes} />
                    :<Heart size="19" color="#facd66" className={styles.likes} />
                }    
            </div>
        </div>
    );
}

export default Playlist;