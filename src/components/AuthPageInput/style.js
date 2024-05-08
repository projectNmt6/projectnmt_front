import { css } from "@emotion/react";

export const inputBox = css`
    box-sizing: border-box;
    display: flex;
    height: auto;
    margin-bottom: 10px;
    justify-content: space-around;
    flex-direction: column;
`;

export const input = css`
    background-color: transparent;
    height: 44px;
    width: 600px;
    border: 2px solid #dbdbdb;
    border-radius: 5px;
    font-size: 16px;
    padding: 0px 13px;
    background-color: #FAFAFA;
    :focus {
        outline: none;
        background-color: #dbdbdb;
    }
`;

export const messageBox = (type) => css`
    padding: ${type === "error" ? "5px 10px" : 0};
    width: 100%;
    color: ${type === "error" ? "#ff3030" : "#00921b"};
    font-size: 11px;
    font-weight: 600;
`;

export const inputIcon = (type) => css`
    color: ${type === "error" ? "#ff3030" : "#00921b"};
`;

export const inputIcon2 = css`
    display: flex;
    flex-direction:row;
`;