import * as React from "react";
import { FC } from "react";

const NavBar = () => {
    return (
        <>
            <div className="navbar bg-manoa-green" >
                <div className="container text-white">
                    <a className="btn btn-ghost text-xl" href="./">Home</a>
                    <a className="btn btn-ghost text-xl" href="./opportunities.html">Opportunities</a>
                    <a className="btn btn-ghost text-xl" href="./contacts.html">Contact</a>
                </div>
            </div>
        </>
    );
};

export default NavBar;