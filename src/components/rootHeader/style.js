import {css} from "@emotion/react";


export const header = css`
    position: relative;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #dbdbdb;
    padding: 0px 10px;
    width: 100%;
    height: 50px;
`

export const menuButton = css`
    box-sizing: border-box;
    border: none;
    padding: 10px;
    background-color: transparent;
    cursor: pointer;
    & > * {
        font-size: 16px;
    }
`
export const account = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 8px;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    overflow: hidden;
    text-decoration: none;
    color: #222222;
    cursor: pointer;
`

export const accountItems = css`
    display: flex;
    align-items: center;
    height: 100%;

`

export const logout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px;
    border: none;
    border-radius: 50%;
    padding: 0px;
    width: 30px;
    height: 30px;
    overflow: hidden;
    background-color: transparent;
    color: #222222;
    cursor: pointer;
`

export const adminbox = css`
    display: flex;
    justify-content: center;
    border: none;
    padding: 10px;
    cursor: pointer;
    & > * {
        font-size: 16px;   
        font-weight: bold;
        text-decoration: none; 
        color: inherit; 
        align-items: center;
             
    }

`;
export const mainbox = css`
    display: flex;
    justify-content: center;
    border: none;
    padding: 10px;
    cursor: pointer;
    & > * {
        font-size: 16px;   
        font-weight: bold;
        text-decoration: none; 
        color: inherit; 
             
    }

`;
export const challengebox = css`
     display: flex;
    justify-content: center;
    border: none;
    padding: 10px;
    cursor: pointer;
    & > * {
        font-size: 16px;   
        font-weight: bold;  
        text-decoration: none; 
        color: inherit; 
             
    }

`;
export const noAccountItems = css`
display: flex;
align-items: center;
`
export const searchIcon=css`
display: flex;
margin: 0 20px;
justify-content: center;
`;