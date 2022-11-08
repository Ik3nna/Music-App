import React from "react";

function Header () {

    return(
        <header>
            <div className="head">
                <div className="overlay"></div>
                <img className="menu" src="/assets/menu 1.svg" alt="menu" />

                <img src="/assets/logo.svg" alt="logo" />

                <div>
                    <img src="/assets/search.svg" alt="search" />
                    <input type="text" placeholder="Search artists" />
                </div>
            </div>
        </header>
    );
}

export default Header;