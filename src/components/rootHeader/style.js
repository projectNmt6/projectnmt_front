import {css} from "@emotion/react";


export const header = css`
    position: relative;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'omyu_pretty';
    border-bottom: 1px solid #dbdbdb;
    padding: 0px 10px;
    width: 100%;
    height: 70px;
    @font-face {
        font-family: 'NEXON Lv1 Gothic OTF';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON%20Lv1%20Gothic%20OTF') format('woff');
        font-weight: normal;
        font-style: normal;
      }
      

`
export const header1 = css`
    position: absolute;
    display: flex;
    margin: 0px 240px;
    font-family: 'NEXON Lv1 Gothic OTF';
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
    margin: 0px;
    margin-right: 10px;
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
    margin-right: 10px;
    padding: 0px;
    width: 30px;
    height: 30px;
    overflow: hidden;
    background-color: transparent;
    color: #222222;
    cursor: pointer;
`

export const adminbox = (isAdmin, headerLine) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-bottom: ${(headerLine === "관리자") ? "2px solid black" : "none"};
    padding: ${isAdmin? "20px" : "none"};
    cursor: pointer;
    margin:0px 20px;
    display: ${isAdmin ? "10px" : "none" };
    :hover {
        transform: scaleY(1.08);
        transition: transform 250ms ease-in-out;
        transform-origin:  50% 50%;
        border-bottom: 1px solid #292929;
    }
    & > * {
        font-size: 18px;   
        font-weight: bold;
        text-decoration: none; 
        color: inherit;   
    }

`;
export const mainbox = (headerLine) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: ${(headerLine==="기부")? "2px solid black" : "none"};
    padding: 25px 0px;
    cursor: pointer;
    margin:0px 20px;
    :hover {
        transform: scaleY(1.08);
        transition: transform 250ms ease-in-out;
        transform-origin:  50% 50%;
        border-bottom: 1px solid #292929;
    }
    & > * {
        font-size: 18px;   
        font-weight: bold;
        text-decoration: none; 
        color: inherit;   
    }

      
`;
export const challengebox = (headerLine) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    padding: 25px 0px;
    border-bottom: ${(headerLine==="챌린지")? "2px solid black" : "none"};

    transition: transform 250ms ease-in-out;
    cursor: pointer;
    :hover {
        transform: scaleY(1.08);
        transition: transform 250ms ease-in-out;
        transform-origin:  50% 50%;
        border-bottom: 1px solid #292929;
    }
    & > * {
        font-size: 18px;   
        font-weight: bold;  
        text-decoration: none; 
        color: inherit;        
    }
`;
export const div = css`
    display: flex;
    margin-right: 20px;
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
