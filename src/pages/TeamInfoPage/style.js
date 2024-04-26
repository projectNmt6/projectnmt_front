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
    font-family: 'omyu_pretty';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/omyu_pretty.woff2') format('woff2');
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
    font-family: 'omyu_pretty';
    align-items: center;
    color: #202020;
    font-weight: 900;
`;
export const span = css`
    font-size: 22px;
    font-weight: 900;
    font-family: 'omyu_pretty';
    color:#767676c1;
`;

export const button = css`
    display: flex;
    justify-content: flex-end;
    font-family: 'omyu_pretty';
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
    font-family: 'omyu_pretty';
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
    width: 668px;
    font-family: 'omyu_pretty';
    border-top: 2px solid #dbdbdb;
    margin: 20px 40px;
    padding-top: 15px;
`;

export const link1 = css`
    width: 275px;
    height: 190px;
    margin: 15px 30px 0px 0px;  
    border-radius: 3px;
`;

export const div4 = css`
    display: flex;
    font-family: 'omyu_pretty';
    justify-content: center;
    align-items: center;
    font-size: 22px;
    color: #202020;
    font-weight: 600;
`;
