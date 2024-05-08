/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import * as s from "./style";
import img1 from '../../assets/slide1.jpg';
import img2 from '../../assets/slide2.jpg';
import img3 from '../../assets/slide3.jpg';
import img4 from '../../assets/slide4.jpg';
import { SlArrowLeft,SlArrowRight } from "react-icons/sl";

function AutoSlide(props) {
 const [currentPosterNum, setCurrentPosterNum] = useState(0);


 const posters = [
    { image: img1, title: '아동 청소년', text: '작은 꿈이 큰 미래를 만듭니다. 어린이들의 웃음을 지켜주세요.' },
    { image: img2, title: '어르신', text: '존경과 사랑이 필요한 분들의 삶에 빛을 더해주세요.' },
    { image: img3, title: '동물', text: '지구에 있는 동물들을 위해 함께 해주세요.' },
    { image: img4, title: '환경', text: '푸른 지구를 지키는 것은 우리 모두의 책임입니다.' },
  ];
  

 useEffect(() => {
   const interval = setInterval(() => {
     setCurrentPosterNum((prev) => (prev + 1 + posters.length) % posters.length);
   }, 4000);
   return () => {
     clearInterval(interval);
   };
 }, [posters]);
 const handlePrevButton = () => {
    setCurrentPosterNum((prev) => (prev - 1 + posters.length) % posters.length);
  };

  const handleNextButton = () => {
    setCurrentPosterNum((prev) => (prev + 1) % posters.length);
  };

 return (
    <div css={s.autoSlideContainer}>
      <ul css={s.slideList} style={{ transform: `translateX(-${currentPosterNum * 100}%)` }}>
        {posters.map(({ image, title, text }, index)=> (
          <li key={index} css={s.slideLi}>
            <button css={s.prevButton} onClick={handlePrevButton}><SlArrowLeft size={30} color="#dbdbdb" /></button>
            <div css={s.overlay} />
            <img css={s.slideImage} src={image} alt={`Slide ${index + 1}`} />
            <div css={s.textOverlay}>
                <h3>{text}</h3>
                <h1>{title}에 기부하기</h1>
            </div>
            <button css={s.nextButton} onClick={handleNextButton}><SlArrowRight size={30} color="#dbdbdb" /></button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AutoSlide;