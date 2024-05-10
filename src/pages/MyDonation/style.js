import { css } from "@emotion/react";

export const div = css`
    display: flex;
    align-items: center;
    height: 42px;
    padding-top: 25px;
    @font-face {
        font-family: 'Pretendard-Regular';
        src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
        font-weight: normal;
        font-style: normal;
      }
`;
export const box = css`
    width: 150px;
    font-size: 20px;
    font-weight: 600;
    padding-right: 5px;
    font-family: 'Pretendard-Regular';
`;
export const div1 = css`
    box-sizing: border-box;
    margin-top: 30px;
    font-size: 25px;
    display: flex;
    font-family: 'Pretendard-Regular';
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    box-shadow: 1px 1px 4px #aaaaaac1;
`;
export const td3 = css`
    margin: 20px 0px;
`;

export const table = css`
    width: 620px;
    height: 100px;
    padding-top: 22px;
    border-bottom:1px solid #dbdbdb ;
    display: flex;
    flex-direction: column;
`;
export const td = css`
    display: flex;
    justify-content: flex-start;
    font-size: 17px;
    font-weight: normal;
`;
export const td1 = css`
    display: flex;
    font-size: 21px;
    color: #999999;
    justify-content: flex-start;
`;
export const link = css`
    text-decoration-line: none;
    text-align: center;
    color: inherit;
`;
export const td2 = css`
    display: flex;
    justify-content: flex-start;
    padding-top: 6px;
    font-size: 28px;
`;