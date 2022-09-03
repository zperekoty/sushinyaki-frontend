import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { urlFor, clientFetch } from "../../client";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./About.scss";

const About = () => {
    const [abouts, setAbouts] = useState([]);

    useEffect(() => {
        const query = [{ query: '*[_type == "abouts"]', to: [setAbouts] }];

        clientFetch(query);
    }, []);

    return (
        <>
            <h2 className="head-text">
                Мы знаем, что <span>что-то</span> <br></br> означает{" "}
                <span>что-то</span>
            </h2>

            <div className="app__profiles">
                {abouts.map((about, index) => (
                    <motion.div
                        whileInView={{ opacity: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5, type: "tween" }}
                        className="app__profile-item"
                        key={about.title + index}
                    >
                        <img src={urlFor(about.imgUrl)} alt={about.title} />
                        <h2 className="bold-text" style={{ marginTop: 20 }}>
                            {about.title}
                        </h2>
                        <p className="p-text" style={{ marginTop: 10 }}>
                            {about.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </>
    );
};

export default AppWrap(
    MotionWrap(About, "app__about"),
    "about",
    "app__whitebg",
);
