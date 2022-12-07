import React from "react";
import styles from "./nothing.module.css";
import { Link } from "react-router-dom"

function Nothing () {
    return(
        <main className={styles.container}>
            <h2>Nothing to show here</h2>

            <Link to="/home">
                Go back to the home page
            </Link>
        </main>
    );
}

export default Nothing;