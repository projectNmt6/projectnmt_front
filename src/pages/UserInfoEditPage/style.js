import { css } from "@emotion/react";

export const header = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: 'omyu_pretty';
    width: 100%;
    @font-face {
    font-family: 'omyu_pretty';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/omyu_pretty.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
`;

export const imgBox = css`
    display: flex;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 1px solid #dbdbdb;
    margin: 30px 0px;
    overflow: hidden;
    & > img {
        height: 100%;
    }
`;


export const div = css`
    width: 800px;
    height: 650px;
    justify-content: center;
    align-items: center;
`;
export const div1 = css`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    color: #3c3c3cc1;
    font-weight: 800;
    border-top: 1px solid #cececec1 ;
`;

export const input = css`
    width: 520px;
    height: 24px;
    background-color: #FAFAFA;
    padding: 9px 13px;
    margin-left: 150px;
    border-radius: 4px;
    font-size:16px;
    border:1px solid #b8b8b8c1;
    :focus {
        outline: none;
        background-color: #dbdbdb;
    }
`;
export const div2 = css`
    padding-top: 20px;
    font-size: 20px;
    color: #3c3c3cc1;
    font-weight: 800;
`;

export const div3 = css`
    display: flex;
    justify-content: end;
    align-items: center;
    flex-direction: column;
    padding-bottom: 15px;
    width: 630px;
    margin-left: 170px;
`;
export const input2 = css`
    width: 520px;
    height: 24px;
    padding: 9px 13px;
    margin: 10px 0px 0px 251px;
    background-color: #FAFAFA;
    border-radius: 4px;
    font-size:16px;
    border:1px solid #b8b8b8c1;
    :focus {
        outline: none;
        background-color: #dbdbdb;
    }
`;
export const input3 = css`
    width: 520px;
    height: 24px;
    background-color: #FAFAFA;
    padding: 9px 13px;
    margin-left: 150px;
    border-radius: 4px;
    font-size:16px;
    border:1px solid #b8b8b8c1;
    :focus {
        outline: none;
        background-color: #dbdbdb;
    }
`;
export const select = css`
    font-size: 25px;
    width: 630px;
`;
export const button = css`
    width: 400px;
    height: 40px;
    font-family: 'omyu_pretty';
    margin-bottom:100px;
    font-size: 20px;
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