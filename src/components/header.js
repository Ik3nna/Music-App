import React from "react";
import { useGlobalContext } from "./context";
import { Link } from "react-router-dom";
import { CloseCircle } from "iconsax-react";
import useSticky from "./utils";

function Header () {
    const { sticky, stickyRef } = useSticky();
    const { active, setActive, searchMusic, closeSearch, searchText, setSearchText } = useGlobalContext();
    
    const handleSubmit = (e)=> {
        e.preventDefault();

        searchMusic(searchText);
    }

    const handleClick = ()=> {
        closeSearch();
        setSearchText("");
    }

    if (searchText === "") {
        closeSearch();
    }

    return(
        <section className={`${active ? "active" : null}`} >
            <header ref={stickyRef} className={`${active ? "active" : null} ${sticky && "fixed-nav"}`}>
                <div className="head">
                    <img className="menu" src="/assets/menu 1.svg" alt="menu" onClick={()=>setActive(!active)} />
                    
                    <Link to="/">
                        <img src="/assets/logo.svg" alt="logo" />
                    </Link>

                    <form className="search" onSubmit={handleSubmit}>
                        <img src="/assets/search.svg" alt="search" />
                        <input type="text" placeholder="Search artists" value={searchText} onChange={(e)=>{setSearchText(e.target.value)}}  />
                        <CloseCircle onClick={handleClick} style={{ display: searchText !== "" ? "block" : "none" }} size="30" color="#E5524A" cursor="pointer" id="close" />
                    </form>
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