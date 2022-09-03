import React, { useState, useEffect } from "react";
import { AiFillEye } from "react-icons/ai";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, clientFetch } from "../../client";
import "./Menu.scss";

const Menu = () => {
    const [activeFilter, setActiveFilter] = useState("Все");
    const [animateCard, setAnimateCard] = useState({
        y: 0,
        opacity: 1,
    });

    const [food, setFood] = useState([]);
    const [filterMenu, setFilterMenu] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const queries = [
            { query: '*[_type == "food"]', to: [setFood, setFilterMenu] },
            { query: '*[_type == "categories"]', to: [setCategories] },
        ];

        clientFetch(queries);
    }, []);

    const handleMenuFilter = (item) => {
        setActiveFilter(item);
        setAnimateCard([{ y: 100, opacity: 0 }]);

        setTimeout(() => {
            setAnimateCard([{ y: 0, opacity: 1 }]);

            if (item !== "Все") {
                return setFilterMenu(
                    food.filter((food) => food.categories.includes(item)),
                );
            }

            setFilterMenu(food);
        }, 500);
    };

    return (
        <>
            <h2 className="head-text">
                Наше <span>Меню</span>
            </h2>

            <div className="app__menu-filter">
                <div
                    onClick={() => handleMenuFilter("Все")}
                    className={`app__menu-filter-item app__flex p-text ${
                        activeFilter === "Все" ? "item-active" : ""
                    }`}
                >
                    Все
                </div>

                {categories.map((category, index) => (
                    <div
                        key={index}
                        onClick={() => handleMenuFilter(category.name)}
                        className={`app__menu-filter-item app__flex p-text ${
                            activeFilter === category.name ? "item-active" : ""
                        }`}
                    >
                        {category.name}
                    </div>
                ))}
            </div>

            <motion.div
                animate={animateCard}
                transition={{ duration: 0.5, delayChildren: 0.5 }}
                className="app__menu-portfolio"
            >
                {filterMenu.map((food, index) => (
                    <div className="app__menu-item app__flex" key={index}>
                        <div className="app__menu-img app__flex">
                            <img src={urlFor(food.imgUrl)} alt={food.name} />

                            <motion.div
                                whileHover={{ opacity: [0, 1] }}
                                transition={{
                                    duration: 0.25,
                                    ease: "easeInOut",
                                    staggerChildren: 0.5,
                                }}
                                className="app__menu-hover app__flex"
                            >
                                <a
                                    href={urlFor(food.imgUrl)}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <motion.div
                                        whileInView={{ scale: [0, 1] }}
                                        whileHover={{ scale: [1, 0.9] }}
                                        transition={{
                                            duration: 0.25,
                                        }}
                                        className="app__flex"
                                    >
                                        <AiFillEye />
                                    </motion.div>
                                </a>
                            </motion.div>
                        </div>

                        <div className="app__menu-content app__flex">
                            <h4 className="bold-text">{food.name}</h4>
                            <p className="p-text" style={{ marginTop: 10 }}>
                                {food.description}
                            </p>
                            <h5 className="bold-text">{food.price} ₽</h5>

                            <div className="app__menu-tag app__flex">
                                <p className="p-text">{food.categories[0]}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>
        </>
    );
};

export default AppWrap(MotionWrap(Menu, "app__menu"), "menu", "app__whitebg");
