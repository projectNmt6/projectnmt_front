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
    height: 70px;
`
export const header1 = css`
    position: absolute;
    display: flex;
    margin: 0px 240px;
`;
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
    justify-content: space-between;
`

export const logout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
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
    margin-right: 10px;
    :hover {
        transform: scaleY(1.08);
        transition: transform 250ms ease-in-out;
        transform-origin:  50% 50%;
        border-bottom: 1px solid #292929;
    }
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
    transition: transform 250ms ease-in-out;
    cursor: pointer;
    :hover {
        transform: scaleY(1.08);
        transition: transform 250ms ease-in-out;
        transform-origin:  50% 50%;
        border-bottom: 1px solid #292929;
    }
    &::after{
        transform-origin:  0% 50%;
    }
    & > * {
        font-size: 16px;   
        font-weight: bold;  
        text-decoration: none; 
        color: inherit;        
    }
`;

export const searchIcon=css`
display: flex;
margin: 0 20px;
justify-content: center;
`;

export const noAccountItems = css`
display: flex;
align-items: center;
`
export const div = css`
    display: flex;
    width: 130px;
    justify-content: space-evenly;
    align-items: center;
`;

export const searchIcon=css`
    display: flex;
    justify-content: center;
    width: 30px;
    align-items: center;
    height: 30px;
`;
