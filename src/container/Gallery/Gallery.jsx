import React, { useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import { urlFor, clientFetch } from "../../client";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Gallery.scss";

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const query = [{ query: '*[_type == "gallery"]', to: [setImages] }];

        clientFetch(query);
    }, []);

    const image = images[currentIndex];

    const arrowClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <>
            {images.length && (
                <div className="app__gallery-col app__flex">
                    <div className="app__gallery-item app__flex">
                        <img src={urlFor(image.imgUrl)} alt="gallery-image" />

                        <div className="app__gallery-content">
                            <p className="p-text">{image.description}</p>
                        </div>
                    </div>

                    <div className="app__gallery-btns-col">
                        <div className="app__gallery-btns app__flex">
                            <div
                                className="app__flex"
                                onClick={() =>
                                    arrowClick(
                                        currentIndex === 0
                                            ? images.length - 1
                                            : currentIndex - 1,
                                    )
                                }
                            >
                                <HiChevronLeft />
                            </div>
                        </div>

                        <div className="app__gallery-btns app__flex">
                            <div
                                className="app__flex"
                                onClick={() =>
                                    arrowClick(
                                        currentIndex === images.length - 1
                                            ? 0
                                            : currentIndex + 1,
                                    )
                                }
                            >
                                <HiChevronRight />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AppWrap(
    MotionWrap(Gallery, "app__gallery"),
    "gallery",
    "app__primarybg",
);
