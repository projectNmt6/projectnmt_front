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
    @font-face {
        font-family: 'Pretendard-Regular';
}
`;
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
    width: 100%;
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
    font-size: 24px;
    display: flex;
    font-family: 'Pretendard-Regular';
    flex-direction: column;
    font-weight: 600;
    color: #444;
`
export const infoText = css`
    margin-bottom: 10px;
    font-size: 45px;    
`
export const button1 = css`
    border-radius:20px;
    background-color:rgb(68, 68, 68);
    height: 35px;
    font-size: 18px;
    margin-right: 10px;
    color: white;
    font-weight: 600;
    font-family: 'Pretendard-Regular';
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
    margin: 30px 0px 10px 40px;
    font-family: 'Pretendard-Regular';
    font-size: 20px;
`;
export const link = css`
    text-decoration-line: none;
    text-align: center;
    padding: 15px 23px;
    color: inherit;
`;
export const div5 = css`
    box-sizing: border-box;
    border: none;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    font-family: 'Pretendard-Regular';
    display: flex;
    font-size: 18px;
    font-weight: 600;
    color: gray;
    background-color: #E0EBFF;
    width: 160px;
    height: 55px;
    box-shadow: 2px 2px 2px #aaaaaac1;
    cursor: pointer;
    :hover {
        color: black;
        font-size: 20px;
        font-weight: 600;     
    }
    :active {
        box-shadow: inset 5px 5px 10px #c9d3e5 ;
    }
`;
export const div10 = css`
    box-sizing: border-box;
    border: none;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    font-family: 'Pretendard-Regular';
    display: flex;
    font-size: 18px;
    font-weight: 600;
    color: gray;
    background-color: #ebffe0;
    width: 160px;
    height: 55px;
    box-shadow: 2px 2px 2px #d3e5c9;
    cursor: pointer;
    :hover {
        color: black;
        font-size: 20px;
        font-weight: 600;     
    }
    :active {
        box-shadow: inset 5px 5px 10px #d3e5c9 ;
    }
`;
export const div6 = css`
    display: flex;
    padding-top: 45px;
    justify-content: space-around;
    width: 100%;
    height: 100px;
    font-family: 'Pretendard-Regular';
`;
export const button =css`
    width: 160px;
    height: 55px;
    font-family: 'Pretendard-Regular';
    font-size: 18px;
    font-weight: 600;
    background-color: #ffe0eb;
    border: none;
    color: gray;
    border-radius: 5px;
    box-shadow: 2px 2px 2px #e5c9d3;
    cursor: pointer;
    :hover {
        color: black;
        font-size: 20px;
        font-weight: 600;     
    }
    :active {
        box-shadow: inset 5px 5px 10px #e5c9d3 ;
    }
`;
export const span =css`
    box-sizing: border-box;
    display: flex;
    font-family: 'Pretendard-Regular';
    font-size: 28px;
    font-weight: 600;
    padding-top: 20px;
    color: #444;
`;
export const div7 = css`
    display: flex;
    margin: 15px 0px 25px 0px;
    border-radius: 5px;
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    box-shadow: 2px 2px 2px #aaaaaac1;
`;

export const div8 = css`
    display: flex;
    box-sizing: border-box;
    padding-top: 25px;
    border-bottom: 1px solid #dbdbdb;
    width: 650px;
    align-items: center;
    font-size: 22px;
    font-weight: 700;
    color: #aeaeaeff;
`;
export const span1 = css`
    font-size: 24px;
    color: #2e2e2ec1;
`;
export const div9 = css`
    padding-left: 10px;
    font-family: 'Pretendard-Regular';
`;
export const teamLogo = css`
    width: 100px;
`;

export const link1 = css`
    text-decoration-line: none;
    color: white;
    font-size: 24px;
    font-family: 'Pretendard-Regular';
    font-weight: 800;
    background-color: #98FB98;
    width: 200px;
    height: 35px;
    margin: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    box-shadow: 2px 2px 2px #aaaaaac1;
    :hover {
        background-color: #7AF67A;   
    }
    :active {
        background-color: #66EC66;   
    }
`;