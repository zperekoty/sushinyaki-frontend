import React from "react";

const NavigationDots = ({ active }) => {
    const links = [
        { name: "главная", anchor: "main" },
        { name: "о нас", anchor: "about" },
        { name: "галерея", anchor: "gallery" },
        { name: "меню", anchor: "menu" },
        { name: "контакты", anchor: "contacts" },
    ];

    return (
        <div className="app__navigation">
            {links.map((item) => (
                <a
                    href={`#${item.anchor}`}
                    key={item.anchor}
                    className="app__navigation-dot"
                    style={
                        active === item.anchor
                            ? { backgroundColor: "#313BAC" }
                            : {}
                    }
                />
            ))}
        </div>
    );
};

export default NavigationDots;
