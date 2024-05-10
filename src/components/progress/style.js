import { css } from "@emotion/react";


export const header = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    @font-face {
    font-family: 'omyu_pretty';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/omyu_pretty.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
`;

export const progressbar = css`
 display: flex;
    width: 100%;
    height: 5px;
    background-color: #dbecf7;
    border-radius: 4px;
    overflow: hidden;
    font-family: 'omyu_pretty';
    font-size: 15px;
    margin-top: 5px;
    margin-bottom: 10px;
`;
export const progress = css`
    height: 100%;
    font-family: 'omyu_pretty';    
    background-color: rgb(173, 76, 254);
    transition: width 0.3s ease-in-out;
`;
export const progressContainer = css`
     display: flex;
    flex-direction: column;
`;
export const percent = css`  
 display: flex;
    color: rgb(255, 64, 80);
    font-size: 15px;
    justify-content: flex-end;
    align-items: right;
    @font-face {
  font-family: 'Pretendard-Regular';
  src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
  font-weight: normal;
  font-style: normal;
 
}
`;

