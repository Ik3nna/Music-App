import React from "react";
import NavIcons from "../../components/Hero-section/Nav-icons";
import Nothing from "../../components/Nothing/nothing";
import styles from "./radio.module.css";
import { motion } from "framer-motion";

function Radio () {
    return(
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 3 }} className={styles.container}>
            <NavIcons />

            <Nothing />
        </motion.main>
    );
}

export default Radio;