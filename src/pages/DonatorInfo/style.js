import { css } from "@emotion/react";

export const mainContainer = css`
    position: absolute;
    z-index: 5;
    width: 100%;
    height: 100%;
    background-color: white;

`;
export const header = css`
    display: flex;
    flex-direction: column;
`;

export const button = css`
    padding: 10px;
    position: absolute;
    right: 0%;
    border: none;
    border-radius: 5px;
    font-size:14px ;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border: 1px solid white;
    cursor: pointer;
`;
export const header1 = css`
    margin: 15px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 19px;
    font-weight: 800;
    padding-bottom: 15px;
    border-bottom: 1px solid #c1c1c1c1;
`;


export const div = css`
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;

export const div1 = css`
    margin-top: 10px 0px;
    display: flex;
    justify-content: center;
    font-size: 25px;
    color: #888888c1;
`;

export const input = css`
    background-color: white;
    width: 70%;
    height: 30px;
    font-size: 25px;
    border-width: 0 0 1px;
    margin-bottom: 10px;
    :focus {
        outline: none;
    }
`;

export const div2 = css`
    display: flex;
    margin: 15px 0px;
    width: 100%;
    flex-wrap:wrap;
    justify-content: space-around;
`;
export const button1 = css`
    width: 90px;
    height: 35px;
    margin-bottom: 10px;
    border: none;
    cursor: pointer;
    font-size: 13px;
    border-radius: 5px;
    color: #575757c1;
    box-shadow: 1px 1px 3px #cececec1;
    font-weight: 600;
    :hover {
        background-color: #cececec1;
        box-shadow: 1px 1px 6px gray;
    }
    :active{
        background-color: #717171c1;
        box-shadow: 1px 1px 6px gray;
    }
`;
export const div3 = css`
    display: flex;
    justify-content: center;
    `;
export const input1 = css`
    background-color: white;
    width: 340px;
    height: 110px;
    border-radius: 5px;
    border: 1px solid #cececec1;
    box-shadow: 1px 1px 6px #cececec1;
    margin-bottom: 15px ;
    :focus {
        outline: none;
    }
    :hover{
        box-shadow: 1px 1px 6px gray;
    }
`;
export const div4 = css`
    margin-top: 10px;
    border-top: 5px solid #f0efefc1;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #dbdbdb ;
`;
export const div5 = css`
    font-size: 14px;
    color: #6e6e6ec1;
    font-weight: 600;
    padding: 20px 220px 20px 0px;
`;
export const input2 = css`
    width: 18px;
    accent-color: black;
    cursor: pointer;
`;

export const button2 = css`
    width: 380px;
    height: 40px;
    color: white;
    font-size: 16px;
    font-weight: 600;
    border-radius: 5px;
    background-color: #ff3b3b;
    text-decoration: none;
    border: none;
    cursor: pointer;
    :hover {
        transition: all 0.4s ease-in-out;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
    }
    :active {
        box-shadow: inset 2px 2px 6px #FFC8C8 ;
    }
`;