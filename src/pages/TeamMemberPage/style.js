import {css} from "@emotion/react";

export const layout = css`
    display: flex;
    justify-content: center;
    
    flex-direction: column;
`

export const text = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    font-family: 700;
    font-size: 20px;
    padding-bottom: 30px;
`


export const button = css`
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
