import { css } from "@emotion/react";

export const div = css`
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
    border: 1px solid #dbdbdb;
    font-family: 'Pretendard-Regular';
    font-size: 20px;
    border-radius: 5px;
    margin-top: 50px;
    box-shadow: 1px 1px 4px #aaaaaac1;
    margin-bottom: 25px;
`;

export const div1 = css`
    display: flex;
    box-sizing: border-box;
    height: auto;
    align-items: center;
    font-family: 'Pretendard-Regular';
    justify-content: flex-start;
    width: 620px;
    height: 100px;
    border-bottom: 1px solid #dbdbdb;
`;
export const div5 = css`
    display: flex;
    flex-direction: column;
`;
export const img = css`
    display: flex;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    border: 1px solid #dbdbdb;
    margin-right: 25px;
`;

export const div2 = css`
    font-size: 17px;
    font-family: 'Pretendard-Regular';
    color: #444;
`;
export const div3 = css`
    font-size: 17px;
    padding-top: 10px ;
    font-family: 'Pretendard-Regular';
    color: #999999;
`;
export const div4 = css`
    font-size: 20px;
    color: #444;
    font-family: 'Pretendard-Regular';
    padding: 10px 0px;
`;
export const div6 = css`
    padding: 25px 0px;
    font-family: 'Pretendard-Regular';
    font-size: 21px;
    text-decoration: underline;
    color : red;
`;
export const div7 = css`
    padding: 25px 0px;
    font-size: 21px;
    color : #dbdbdb;
`;
export const button = css`
    width: 400px;
    height: 35px;
    font-family: 'Pretendard-Regular';
    font-size: 20px;
    margin:30px 0px;
    border: none;
    border-radius: 5px;
    background-color:#282828;
    color: white;
    cursor: pointer;
    :hover {
        background-color: #555555;
    }
    :active {
        background-color: #8a8a8a;
    }
`;