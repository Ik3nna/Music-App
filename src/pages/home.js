import React from "react";
import Main from "../components/Hero-section/main";
import Release from "../components/New-Releases/release";
import Popular from "../components/Popular-section/popular";

function Home () {

    return(
        <>
            <Main />
            <Release />
            <Popular />
        </>
    );
}

export default Home;