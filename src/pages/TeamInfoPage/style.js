import {css} from "@emotion/react";


export const layout = css` 
    flex-direction: column;
    box-sizing: border-box;
    display: flex;
    width: 750px;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    box-shadow: 2px 2px 2px #aaaaaac1;
    @font-face {
        font-family: 'NEXON Lv1 Gothic OTF';
        src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv1 Gothic OTF.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
`;
export const img = css`
    width: 150px;
    height: 150px;
    padding: 20px 20px 0px 40px;
`;
export const div1 = css`
    display: flex;
    justify-content: flex-start;
    font-size: 26px;
    font-family: 'NEXON Lv1 Gothic OTF';
    align-items: center;
    color: #202020;
    font-weight: 900;
`;
export const span = css`
    font-size: 22px;
    font-weight: 900;
    font-family: 'NEXON Lv1 Gothic OTF';
    color:#767676c1;
`;

export const button = css`
    display: flex;
    justify-content: flex-end;
    font-family: 'NEXON Lv1 Gothic OTF';
    align-items: center;
`;

export const link = css`
    text-decoration-line: none;
    margin-right: 40px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 30px;
    font-size: 18px;
    background-color: #8ad0ff;
    border-radius: 5px;
    color: #fff;
    box-shadow: 0 0 40px 40px blue inset, 0 0 0 0 blue;
    transition: all 150ms ease-in-out;
    box-shadow: 2px 2px 2px #aaaaaac1;
  &:hover {
    box-shadow: 0 0 10px 0 #8ad0ff inset, 0 0 10px 4px #8ad0ff;
    background-color: white;
    color: #cececec1;
  }
`;

export const div2 = css`
    text-align: left;
    font-family: 'NEXON Lv1 Gothic OTF';
    align-items: flex-start;
    width: 668px;
    margin: 20px 40px;
`;
export const span2 = css`
    padding-top: 20px;
    font-size: 22px;
    display: flex;
    word-break:break-all;
    width: 100%;
    height: auto;
`;

export const div3 = css`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    width: 670px;
    font-family: 'NEXON Lv1 Gothic OTF';
    border-top: 2px solid #dbdbdb;
    margin: 20px 30px;
    padding-top: 20px;
`;

export const link1 = css`
    width: 275px;
    height: 190px;
    margin: 15px 15px 0px 0px;  
    border-radius: 3px;
`;
export const link2 = css`
text-decoration: none;
color: black;
&:visited {
    color: black; 
  }
`;

export const div4 = css`
    display: flex;
    font-family: 'NEXON Lv1 Gothic OTF';
    justify-content: center;
    align-items: center;
    font-size: 22px;
    color: #202020;
    font-weight: 600;
`;

export const button4 = css`
    font-family: 'NEXON Lv1 Gothic OTF';
    font-size: 16px;
   padding: 10px 20px;
  margin: 10px;
  background-color: rgb(173, 76, 254); /* Green background */
  color: white; /* White text */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
 

  &:active {
    transform: translateY(1px); /* Slight press down effect */
  }
`;
export const button5 = css`
    font-family: 'NEXON Lv1 Gothic OTF';
    font-size: 16px;
   padding: 10px 20px;
  margin: 10px;
  background-color: rgb(254, 76, 218); /* Green background */
  color: white; /* White text */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
 

  &:active {
    transform: translateY(1px); /* Slight press down effect */
  }
`;
export const button6 = css`
    font-family: 'NEXON Lv1 Gothic OTF';
    font-size: 16px;
   padding: 10px 20px;
  margin: 10px;
  background-color: rgba(255, 64, 80, 0.9);
  color: white; /* White text */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
 

  &:active {
    transform: translateY(1px); /* Slight press down effect */
  }
`;

export const moreLoad = css`
      box-sizing: border-box;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(229, 229, 229);
    margin: 0px;
    line-height: 1.5;
    letter-spacing: -0.1px;
    text-decoration: none;
    cursor: pointer;
    background-color: rgb(255, 255, 255);
    height: 46px;
    padding: 0px 20px;
    border-radius: 999px;
    gap: 6px;
    width: 116px;
    color: rgb(68, 68, 68);
    font-weight: normal;
    font-size: 14px;
    box-shadow: none; 
`;
export const buttonGroup = css`
    display: flex;
    margin-right: 30px;
    margin-left: 30px;
    justify-content: space-between; /* 버튼들을 동일한 간격으로 배치합니다. */
    background-color: white; /* 배경색을 설정하여 상단에 고정될 때 다른 내용과 겹치지 않도록 합니다. */
    
`;
export const buttonText = css`
    border: none;
    font-family: 'NEXON Lv1 Gothic OTF';
    font-size: 16px;
    margin-right: 3px;
    border-radius: 5px;
    padding: 12px;
    font-weight: 600;
    cursor: pointer;
    background-color: transparent; // 배경색 제거
    color: rgb(136, 136, 136); // 초기 텍스트 색상 설정

    :focus {
        transition: all 0.3s ease-in-out;
    }
    :hover {
        color: #333; // 마우스 오버 시 텍스트 색상 변경
    }
    :active {
        color: #555; // 마우스 클릭 시 텍스트 색상 진하게 변경
    }
`;