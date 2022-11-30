import React from "react";
import Main from "../../components/Hero-section/main"
import Release from "../../components/New-Releases/release";
import Popular from "../../components/Popular-section/popular";
import Found from "./found";
import NavIcons from "../../components/Hero-section/Nav-icons";
import styles from "./home.module.css";
import { useGlobalContext } from "../../components/context"

function Home () {
    const { openSearch,searchData } = useGlobalContext();

    if (openSearch) {
        if (searchData < 1) {
            return(
                <section className={styles.none}>
                    <NavIcons />
                    <h2>No items match your search</h2>
                </section>
            );
        }
        return(
            searchData.map((item)=>{
                return(
                    <section key={item.id} className={styles.found}>
                        <NavIcons />
                        <Found {...item} />
                    </section>
                );
            })
        );
    }

    return(
        <>
            <Main />
            <Release />
            <Popular />
        </>
    );
}

export default Home;