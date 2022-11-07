import React from "react";
import styles from "./release.module.css";
import SingleRelease from "./singlerelease";
import { useGlobalContext } from "../context";

function Release() {
    const { newRelease } = useGlobalContext();

    return(
        <section className={styles.releases}>
            <h2>
                New releases.
            </h2>

            <article>
                {newRelease.map((item)=>{
                    return(
                        <SingleRelease key={item.id} {...item} />
                    );
                })}
            </article>
        </section>
    );
}

export default Release;