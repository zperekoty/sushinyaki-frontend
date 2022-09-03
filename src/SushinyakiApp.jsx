import React from "react";

import { Header, About, Gallery, Menu, Footer } from "./container";
import { Navbar } from "./components";
import "./Sushinyaki.scss";

const SushinyakiApp = () => {
    return (
        <div className="app">
            <Navbar />
            <Header />
            <About />
            <Gallery />
            <Menu />
            <Footer />
        </div>
    );
};

export default SushinyakiApp;
