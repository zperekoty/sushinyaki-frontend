import React, { useState, useEffect } from "react";

import { images } from "../../constants";
import { clientFetch, clientCreate } from "../../client";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Footer.scss";

const Footer = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const { name, email, message } = formData;
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [work, setWork] = useState([]);
    const [location, setLocation] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState([]);
    const [mail, setMail] = useState([]);
    const [isEmpty, setIsEmpty] = useState([]);

    useEffect(() => {
        const queries = [
            { query: '*[_type == "work"]', to: [setWork] },
            { query: '*[_type == "location"]', to: [setLocation] },
            { query: '*[_type == "phone"]', to: [setPhoneNumber] },
            { query: '*[_type == "mail"]', to: [setMail] },
        ];

        clientFetch(queries);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        if (!name || !email || !message) {
            setIsEmpty([
                {
                    name: !name ? true : false,
                    email: !email ? true : false,
                    message: !message ? true : false,
                },
            ]);

            return setTimeout(() => {
                setIsEmpty(false);
            }, 3000);
        }

        setLoading(true);

        const document = [
            {
                document: {
                    _type: "contact",
                    name: name,
                    email: email,
                    message: message,
                },
                then: [
                    { to: setLoading, success: false },
                    { to: setIsFormSubmitted, success: true },
                ],
            },
        ];

        clientCreate(document);
    };

    return (
        <>
            <h2 className="head-text">Свяжитесь с нами</h2>

            <div className="app__footer-cards">
                <div className="app__footer-card">
                    <img src={images.email} alt="email" />
                    <a href={`mailto:${mail[0]?.address}`} className="p-text">
                        {mail[0]?.address}
                    </a>
                </div>

                <div className="app__footer-card">
                    <img src={images.mobile} alt="mobile" />
                    <a
                        href={`tel:${phoneNumber[0]?.pNumber}`}
                        className="p-text"
                    >
                        {phoneNumber[0]?.pNumber}
                    </a>
                </div>

                <div className="app__footer-card">
                    <img src={images.clock} alt="clock" />
                    <p className="p-text">{`Пн – Вс с ${work[0]?.open}:00 – ${work[0]?.close}:00`}</p>
                </div>

                <div className="app__footer-card">
                    <img src={images.map} alt="map" />
                    <a
                        href={location[0]?.link}
                        target="_blank"
                        className="p-text"
                    >
                        {location[0]?.address}
                    </a>
                </div>
            </div>

            {!isFormSubmitted ? (
                <div className="app__footer-form app__flex">
                    <div className="app__flex">
                        <input
                            type="text"
                            name="name"
                            className="p-text"
                            placeholder="Ваше имя"
                            value={name}
                            onChange={handleInputChange}
                            style={
                                isEmpty[0]?.name
                                    ? { border: "1px solid red" }
                                    : {}
                            }
                        />
                    </div>

                    <div className="app__flex">
                        <input
                            type="text"
                            name="email"
                            className="p-text"
                            placeholder="Ваша почта"
                            value={email}
                            onChange={handleInputChange}
                            style={
                                isEmpty[0]?.email
                                    ? { border: "1px solid red" }
                                    : {}
                            }
                        />
                    </div>

                    <div>
                        <textarea
                            className="p-text"
                            placeholder="Ваше сообщение"
                            value={message}
                            name="message"
                            onChange={handleInputChange}
                            style={
                                isEmpty[0]?.message
                                    ? { border: "1px solid red" }
                                    : {}
                            }
                        />
                    </div>

                    <button
                        className="p-text"
                        type="button"
                        onClick={handleSubmit}
                    >
                        {loading ? "Отправляю" : "Отправить сообщение"}
                    </button>
                </div>
            ) : (
                <div>
                    <h3 className="head-text">{`${name}, спасибо за ваше обращение!`}</h3>
                </div>
            )}
        </>
    );
};

export default AppWrap(
    MotionWrap(Footer, "app__footer"),
    "contacts",
    "app__primarybg",
);
