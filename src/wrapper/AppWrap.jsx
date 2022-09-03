import React from "react";
import { NavigationDots, SocialMedia } from "../components";

const AppWrap = (Component, idName, classNames) =>
    function HOC() {
        return (
            <div id={idName} className={`app__container ${classNames}`}>
                <SocialMedia />

                <div className="app__wrapper app__flex">
                    <Component />

                    <div className="copyright">
                        <p className="p-text">&copy;2022 Sushinyaki</p>

                        <a
                            className="copyright__link"
                            href="tg://resolve?domain=zperekoty"
                            style={{ textDecoration: "none" }}
                        >
                            Заказать сайт
                        </a>
                    </div>
                </div>

                <NavigationDots active={idName} />
            </div>
        );
    };

export default AppWrap;
