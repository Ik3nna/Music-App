import React from "react";
import Main from "../../components/Hero-section/main"
import Release from "../../components/New-Releases/release";
import Popular from "../../components/Popular-section/popular";
import Found from "./found";
import NavIcons from "../../components/Hero-section/Nav-icons";
import styles from "./home.module.css";
import { useGlobalContext } from "../../components/context";
import { motion } from "framer-motion";

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
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 3 }}>
            <Main />
            <Release />
            <Popular />
        </motion.main>
    );
}

export default Home;