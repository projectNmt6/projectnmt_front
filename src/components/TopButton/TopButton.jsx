import React, { useEffect, useState } from 'react'
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { FaRegArrowAltCircleUp } from "react-icons/fa";

export default function TopButton() {
    const [showButton, setShowButton] = useState(true);

    const handleScroll = () => {
        if (!window.scrollY) return;
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        const handleShowButton = () => {
            if (window.scrollY > window.innerHeight) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleShowButton);
        return () => {
            window.removeEventListener('scroll', handleShowButton);
        };
    }, []);

    return (
        <div css={s.topBtn_wrap}>
            {showButton && (
                <button css={s.topBtn} onClick={handleScroll}>
                    <FaRegArrowAltCircleUp />
                </button>
            )}
        </div>
    );
}
