import React from "react";
import { useGlobalContext } from "./context";
import { Link } from "react-router-dom";
import useSticky from "./utils";

function Header () {
    const { sticky, stickyRef } = useSticky();
    const { active, setActive } = useGlobalContext();

    return(
        <section className={`${active ? "active" : null}`} >
            <header ref={stickyRef} className={`${active ? "active" : null} ${sticky && "fixed-nav"}`}>
                <div className="head">
                    <img className="menu" src="/assets/menu 1.svg" alt="menu" onClick={()=>setActive(!active)} />
                    
                    <Link to="/">
                        <img src="/assets/logo.svg" alt="logo" />
                    </Link>

                    <div className="search">
                        <img src="/assets/search.svg" alt="search" />
                        <input type="text" placeholder="Search artists" />
                    </div>
                </div>
            </header>

            <div className="overlay"></div>

            <div style={{
            height: sticky ? `${stickyRef.current?.clientHeight}px` : '0px',
            }} />
        </section>
    );
}

export default Header;