import { css } from "@emotion/react";

export const container = css`
    position: relative;
    width: 100%;
    flex-direction:column ;
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
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
    align-items: center;
    width: 700px;;
`;

export const select = css`
    width: 608px;
    height: 50px;
`;
export const input = css`
    width: 607px;
    height: 30px;
    border-radius: 5px;
    padding: 8px 0px;
    border: 2px solid #dbdbdb;
`;
export const button = css`
    width: 400px;
    height: 40px;
    margin: 40px;
    font-size: 18px;
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