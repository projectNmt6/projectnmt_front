import { css } from "@emotion/react"

export const layout = css`
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
`
export const header = css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 30px;
    border: none;
    border-radius: 5px;
    padding: 10px 30px;
    width: 60%;
    height: 200px;
    background-color: white;
`
export const imgBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 178px;
    height: 178px;
`
export const propfileImg = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dbdbdb;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    overflow: hidden;
    & > img {
        height: 100%;
    }
`
export const infoBox = css`
    box-sizing: border-box;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    font-weight: 600;
    color: #444;
`
export const infoText = css`
    margin-bottom: 10px;
    font-size: 36px;    
`
export const button1 = css`
    border-radius:20px;
    background-color:#E0EBFF;
    height: 35px;
    font-size: 16px;
    margin-right: 10px;
    color: white;
    font-weight: 600;
    border: none;
    box-shadow: 2px 2px 2px #aaaaaac1;
    cursor: pointer;
    :hover {
        background-color:#B8D7FF;
        box-shadow: 2px 2px 6px #A0AFFF
    }
    :active {
        box-shadow: inset 2px 2px 10px 2px #A0AFFF;
    }
`;

export const emailBox = css`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    & > div:nth-of-type(1) {
        margin:0px 10px 0px 0px;
    }
`

export const infoButton = css`
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    border-radius: 3px;
    padding: 5px;
    background-color: white;
    font-size: 12px;
    cursor: pointer;
    &:hover {
        background-color: #fafafa;
    }
    &:active {
        background-color: #eeeeee;
    }
`
export const emailCheck = css`
    display: flex;
    align-items: center;
    & > * {
        color: #008734;
    }
`
export const infoButtons = css`
    box-sizing: border-box;
    display: flex;
    padding-top: 5px;
    & > button:nth-of-type(1) {
        margin-right: 5px;
    }

`
export const bottom = css`
    box-sizing: border-box;
    display: flex;
    margin-bottom: 20px;
    border: 1px solid #dbdbdb;
    border-radius: 3px;
    padding: 10px;
    width: 100%;
    height: 250px;
    background-color: white;
`
export const div = css`
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 5px;
    width: 750px;
    height: 65px;
    margin-bottom: 35px;
    box-shadow: 1px 1px 3px #aaaaaac1;
`;
export const div1 = css`
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 750px;
    height: auto;
    box-shadow: 2px 2px 2px #aaaaaac1;
`;
export const div2 = css`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 22px;
    font-weight: 600;
    color: #444;
    width: 100%;
`;
export const div3 = css`
    box-sizing: border-box;
    display: flex;
    justify-content: start;
    flex-direction: column;
    width: 80%;
    color: #505050c1;
`;
export const div4 = css`
    box-sizing: border-box;
    display: flex;
    justify-content: start;
    flex-direction: column;
    width: 45%;
    color: #505050c1;
`;
export const label = css`
    padding: 30px 0px 10px 40px;
`;
export const link = css`
    text-decoration-line: none;
    text-align: center;
    color: inherit;
`;
export const div5 = css`
    box-sizing: border-box;
    border: none;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    display: flex;
    font-size: 18px;
    font-weight: 600;
    color: gray;
    background-color: #FFD79999;
    width: 300px;
    height: 60px;
    box-shadow: 2px 2px 2px #aaaaaac1;
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
export const div6 = css`
    display: flex;
    padding-top: 45px;
    justify-content: space-around;
    width: 100%;
    height: 100px;
`;
export const button =css`
    width: 300px;
    height: 60px;
    font-size: 18px;
    font-weight: 600;
    background-color: #ff0c0c99;
    border: none;
    color: gray;
    border-radius: 5px;
    box-shadow: 2px 2px 2px #aaaaaac1;
    cursor: pointer;
    :hover {
        color: black;
        font-size: 18px;
        font-weight: 600;     
    }
    :active {
        box-shadow: inset 5px 5px 10px #48000099 ;
    }
`;
export const span =css`
    box-sizing: border-box;
    display: flex;
    font-size: 24px;
    font-weight: 600;
    padding-top: 20px;
    color: #444;
`;
