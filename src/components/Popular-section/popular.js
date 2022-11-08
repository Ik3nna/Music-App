import React from "react";
import styles from "./popular.module.css";
import SinglePopular from "./singlepopular";
import { useGlobalContext } from "../context";

function Popular() {
    const { popular } = useGlobalContext();

    return(
        <section className={styles.popular}>
            <h2>
                Popular in your Area.
            </h2>

            <article className={styles.scroll}>
                {popular.map((item)=>{
                    return(
                        <SinglePopular key={item.id} {...item} />
                    );
                })}
            </article>
        </section>
    );
}

export default Popular;