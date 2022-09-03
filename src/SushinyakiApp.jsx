import React, { useState, useEffect } from "react";

import { Header, About, Gallery, Menu, Footer } from "./container";
import { Navbar } from "./components";
import { clientFetch } from "./client";
import "./Sushinyaki.scss";

const SushinyakiApp = () => {
    const [tech, setTech] = useState([]);

    useEffect(() => {
        const techQuery = [{ query: '*[_type == "tech"]', to: [setTech] }];

        clientFetch(techQuery);
    }, []);

    return (
        <>
            {tech[0]?.status === "Нет" ? (
                <div className="app">
                    <Navbar />
                    <Header />
                    <About />
                    <Gallery />
                    <Menu />
                    <Footer />
                </div>
            ) : tech[0]?.status === "Да" ? (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        width: "100%",
                        textAlign: "center",
                    }}
                >
                    <h1 className="head-text">Сайт на обслуживании</h1>
                </div>
            ) : (
                <div></div>
            )}
        </>
    );
};

export default SushinyakiApp;
