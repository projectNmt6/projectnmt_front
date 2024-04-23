import { css } from "@emotion/react";

export const inputBox = css`
    display: flex;
    height: auto;
    flex-direction: column;
    margin-bottom: 10px;
    align-items: center;
    justify-content: center;
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
`;

export const messageBox = (type) => css`
    padding: ${type === "error" ? "5px 10px" : 0};
    width: 100%;
    color: ${type === "error" ? "#ff3030" : "#00921b"};
    font-size: 11px;
    font-weight: 600;
`;

export const inputIcon = (type) => css`
    position: absolute;
    top: 10px;
    right: 10px;
    color: ${type === "error" ? "#ff3030" : "#00921b"};
`;