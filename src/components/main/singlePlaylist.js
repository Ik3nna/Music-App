import React, { useState, useEffect } from "react";
import styles from "./main.module.css";
import { useGlobalContext } from "../context";
import { Heart } from "iconsax-react";


function Playlist ({ data, title, info, cover, files }) {
    const { playlist, Arr } = useGlobalContext();

    const [love,setLove] = useState(false);

    const handleLikes = (x)=>{
        let check = playlist.find((item)=> item.id === x.id);

        setLove((check) => !check);

        if (check) {
            let arr = {};
            let innerArr = {...arr,x}
            Arr.likes.push(innerArr);
        } else {
            
        }
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
            <img src={cover} alt={title} />

            <div className={styles.playlistInfo}>
                <h4>{title}</h4>
                <p>{info.substring(0, 40)}...</p>
                <p>{(totalMin < 10) ? `0${totalMin}` : totalMin}: {totalSec}</p>
            </div>

            <div className={styles.circle} onClick={()=>handleLikes(data)}>
                {love ?
                    <Heart variant="Bold" size="19" color="#E5524A" className={styles.likes} />
                    :<Heart size="19" color="#facd66" className={styles.likes} />
                }    
            </div>
        </div>
    );
}

export default Playlist;