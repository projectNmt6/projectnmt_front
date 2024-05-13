import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { BsArrowUpSquareFill } from "react-icons/bs";

export default function TopButton() {
    const [showButton, setShowButton] = useState(false);

    const handleScroll = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleShowButton = () => {
        if (window.scrollY > window.innerHeight) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    useEffect(() => {
        handleShowButton(); // 마운트 시 초기 위치 확인
        window.addEventListener('scroll', handleShowButton);
        return () => {
            window.removeEventListener('scroll', handleShowButton);
        };
    }, []);

    return (
        <div css={s.topBtn_wrap}>
            {showButton && (
                <div css={s.topBtn} onClick={handleScroll}>
                    <BsArrowUpSquareFill />
                </div>
            )}
        </div>
    );
}
