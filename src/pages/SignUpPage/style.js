import { css } from "@emotion/react";

export const container = css`
    position: relative;
    width: 100%;
    flex-direction:column;
    display: flex;
    font-family: 'omyu_pretty';
    justify-content: center;
    align-items: center;
    height: auto;
    @font-face {
    font-family: 'omyu_pretty';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/omyu_pretty.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
`;
export const header = css`
    display: flex;
    text-align: center;
    justify-content: center;
    padding-bottom: 25px;
    `;

export const imgBox = css`
    border-radius: 50%;
    display: flex;
    border: 1px solid #dbdbdb;
    width: 200px;
    height: 200px;
    overflow: hidden;
    margin-top: 20px;
    `;

export const div = css`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 800px;
    `;
export const div2 = css`
    font-size: 20px;
    width: 100%;
    padding-top: 20px;
    color: #3c3c3cc1;
    font-weight: 800;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom:1px solid #b8b8b8c1;
`;
export const div3 = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-bottom: 12px;
`;

export const div4 = css`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    color: #3c3c3cc1;
    font-weight: 700;
    padding-top: 15px;
    border-bottom: 1px solid #cececec1 ;
`;

export const select = css`
    width: 630px;
    height: 50px;
`;
export const input = css`
    width: 629px;
    height: 30px;
    border-radius: 5px;
    padding: 8px 0px;
    background-color: #FAFAFA;
    border: 2px solid #dbdbdb;
`;
export const button = css`
    width: 400px;
    height: 40px;
    margin: 40px;
    font-size: 22px;
    font-family: 'omyu_pretty';
    font-weight: 600;
    color: gray;
    background-color: #FFD79999;
    border-radius: 5px;
    border: 1px solid #FFD79999;
    cursor: pointer;
    :hover {
        color: black;
        font-size: 18px;
        font-weight: 600;     
    }
    :active {
        box-shadow: inset 5px 5px 10px #ffb44399 ;
    }
`;