import React, { useState, useEffect } from "react";
import styles from "./main.module.css";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import { Heart } from "iconsax-react";


function Playlist ({ id, data, title, cover, files }) {
    const { playlist, Arr } = useGlobalContext();

    const [love,setLove] = useState(false);

    const handleLikes = (x)=>{
        let check = playlist.find((item)=> item.id === x.id);
        setLove((check) => !check);

        if (check && !love) {
            Arr.likes.push(x); 
        }  
        if (love) {
            Arr.likes = Arr.likes.filter((item)=>item.id !== x.id);
            console.log(Arr.likes)
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
            <Link to={`/album/${id}?love=${love}`}>
                <img src={cover} alt={title} />
            </Link>

            <div className={styles.playlistInfo}>
                <h4>{title}</h4>
                <p>{files[0].artist}</p>
                <p>{(totalMin < 10) ? `0${totalMin}` : totalMin}: {totalSec}</p>
            </div>

            <div className={love ? styles.circleLove : styles.circle} onClick={()=>handleLikes(data)}>
                {love ?
                    <Heart variant="Bold" size="19" color="#E5524A" className={styles.likes} />
                    :<Heart size="19" color="#facd66" className={styles.likes} />
                }    
            </div>
        </div>
    );
}

export default Playlist;