import React from "react";
import useSticky from "./utils";

function Header () {
    const { sticky, stickyRef } = useSticky();

    return(
        <>
            <header ref={stickyRef} className={`${sticky && "fixed-nav"}`}>
                <div className="head">
                    <div className="overlay"></div>
                    <img className="menu" src="/assets/menu 1.svg" alt="menu" />

                    <img src="/assets/logo.svg" alt="logo" />

                    <div className="search">
                        <img src="/assets/search.svg" alt="search" />
                        <input type="text" placeholder="Search artists" />
                    </div>
                </div>
            </header>

            <div style={{
            height: sticky ? `${stickyRef.current?.clientHeight}px` : '0px',
            }} />
        </>
    );
}

export default Header;