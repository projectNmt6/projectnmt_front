import { css } from "@emotion/react";

export const header = css`
    box-sizing: border-box;
    width: 480px;
    height: 570px;
    border-radius: 5px;
    font-family: 'omyu_pretty';
    font-size: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FFF0F5;
    @font-face {
    font-family: 'omyu_pretty';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/omyu_pretty.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
`;
export const h1  = css`
    padding-top: 65px;
`;
export const div1 = css`
    display: flex;
    justify-content: center;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    font-size: 24px;
    text-align: center;
    margin-top: 50px;
    `;

export const div = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    `;
export const span = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 26px;
    padding: 10px 0px 12px 0px;
`;
export const input = css`
    width: 200px;
    height: 26px;
    padding: 3px 3px;
    margin:5px 0px ;
    border: none;
    border-radius: 5px;
    :focus {
        outline: none;
        background-color: #f0f0f0;
    }
`;

export const div2 = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 50px 0px;
`;
export const button = css`
    border:none;
    border-radius: 5px;
    width: 300px;
    height: 35px;
    font-size: 18px;
    font-family: 'omyu_pretty';
    box-shadow: 0 0 40px 40px blue inset, 0 0 0 0 blue;
    transition: all 150ms ease-in-out;
    box-shadow: 2px 2px 2px #aaaaaac1;
    color: #fff;
    background-color: #8ad0ff;
  &:hover {
    box-shadow: 0 0 10px 0 #8ad0ff inset, 0 0 10px 4px #8ad0ff;
    background-color: white;
    font-weight: 600;
    color: #717171c1;
  }
`;

export const link = css`
    text-decoration-line: none;
    width: 300px;
    height: 35px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    background-color: #8ad0ff;
    border-radius: 5px;
    color: #fff;
    margin-top: 10px;
    box-shadow: 0 0 40px 40px blue inset, 0 0 0 0 blue;
    transition: all 150ms ease-in-out;
    box-shadow: 2px 2px 2px #aaaaaac1;
  &:hover {
    box-shadow: 0 0 10px 0 #8ad0ff inset, 0 0 10px 4px #8ad0ff;
    background-color: white;
    font-weight: 600;
    color:#717171c1;
  }
`;
export const div3 = css`
    display: flex;
    justify-content: space-around;
    align-items: center;
    `;

export const img = css`
    display: flex;
    width: 150px;
    height: 35px;
    margin: 0px 3px;
`;