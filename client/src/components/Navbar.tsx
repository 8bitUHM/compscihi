import * as React from "react";
import { FC } from "react";

const NavBar = () => {
    return (
        <>
            <div className="navbar bg-green-500 text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                    <div role="button" className="btn btn-ghost lg:hidden">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        
                        className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a>Item 1</a></li>
                        <li>
                        <a>Parent</a>
                        <ul className="p-2">
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                    </div>
                    <a className="btn btn-ghost text-xl" href="./">Home</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                    <li><a href="./">Home</a></li>
                    <li>
                        <a href="./opportunities.html">Opportunities</a>
                    </li>
                    <li><a href="./contact.html">Contact</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    {/* <a className="btn btn-ghost text-l">Button</a> */}
                </div>
            </div>
        </>
    );
};

export default NavBar;