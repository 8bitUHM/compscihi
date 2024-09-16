import * as React from "react";
import { FC } from "react";

const NavBar = () => {
    return (
        <>
            <div className="navbar bg-green-950 m-1">
                <div className="container">
                    <a className="btn btn-ghost text-xl" href="./">Home</a>
                </div>
            </div>
        </>
    );
};

export default NavBar;