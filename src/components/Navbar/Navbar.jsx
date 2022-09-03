import React, { useState } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";

import { images } from "../../constants";
import "./Navbar.scss";

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const links = [
        { name: "главная", anchor: "main" },
        { name: "о нас", anchor: "about" },
        { name: "галерея", anchor: "gallery" },
        { name: "меню", anchor: "menu" },
        { name: "контакты", anchor: "contacts" },
    ];

    return (
        <nav className="app__navbar">
            <div className="app__navbar-logo">
                <a href="" style={{ textDecoration: "none" }}>
                    <img src={images.logo} alt="logo" />
                </a>
            </div>

            <ul className="app__navbar-links">
                {links.map((item) => (
                    <li className="app__flex p-text" key={`link-${item.name}`}>
                        <div />
                        <a href={`#${item.anchor}`}>{item.name}</a>
                    </li>
                ))}
            </ul>

            <div className="app__navbar-menu">
                <HiMenuAlt4 onClick={() => setToggle(true)} />

                {toggle && (
                    <motion.div
                        whileInView={{ x: [300, 0] }}
                        transition={{ duration: 0.85, ease: "easeOut" }}
                    >
                        <HiX onClick={() => setToggle(false)} />
                        <ul>
                            {links.map((item) => (
                                <li key={item.name}>
                                    <a
                                        onClick={() => setToggle(false)}
                                        href={`#${item.anchor}`}
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
