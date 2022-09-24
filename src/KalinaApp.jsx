import React from "react";

import { Header, About, Gallery, Menu, Footer } from "./container";
import { Navbar } from "./components";
import "./Kalina.scss";

const KalinaApp = () => {
    return (
        <>
            <div className="app">
                <Navbar />
                <Header />
                <About />
                <Gallery />
                <Menu />
                <Footer />
            </div>
        </>
    );
};

export default KalinaApp;
