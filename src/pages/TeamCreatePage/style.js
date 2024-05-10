import { css } from "@emotion/react";
export const container = css`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'omyu_pretty';
    flex-direction: column;
    width: 100%;
    @font-face {
    font-family: 'omyu_pretty';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/omyu_pretty.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
`;

export const haeder = css`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    margin-bottom: 20px;
    width: 800px;
    flex-direction: column;
    font-size: 20px;
    font-weight: 800;
    color: #656565;
    margin-bottom: 30px;
`;
export const team = css`
    font-size: 20px;
    font-weight: 800;
    color: #656565;
    margin-bottom: 15px;
`;
export const check = css`
    width: 17px;
    height: 17px;
    accent-color: #000000ff;
    border: none;
    cursor: pointer;
`;
export const div = css`
    box-sizing: border-box;
    padding: 40px 0px 0px 45px;
    text-align: start;
    width: 114px;
    font-size: 18px;
`;
export const div1 = css`
    box-sizing: border-box;
    display: flex;
    justify-content:flex-start;
    align-items: flex-start;
    flex-direction: column;
    padding-top: 10px;
    margin-bottom: 10px;
    padding: 20px 0px 0px 45px;
`;

export const select = css`
    width: 455px;
    padding: 15px 0px;
    border: none;
    font-weight: normal;
    font-size: 17px;
`;

export const input = css`
    width: 424px;
    height: 13px;
    padding: 9px 13px;
    margin: 15px 0px;
    border-radius: 5px;
    border: 1px solid #dbdbdb;
    background-color: #FAFAFA;
    :focus {
        outline: none;
        box-shadow: 1px 1px 3px #aaaaaac1
    }
`;
export const input2 = css`
    display: flex;
    width: 80px;
    font-family: 'omyu_pretty';
    height: 28px;
    border-radius: 5px;
    color:#fff;
    background-color: #9bbbff;
    border: none;
    font-size: 19px;
    justify-content: center;
    align-items: center;
    box-shadow: 2px 2px 4px rgba(0,79,255,0.3);
    cursor: pointer;
    :focus {
        outline: 0;
    }
    :hover {
        background-color: rgba(0,79,255,0.9);
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0,79,255,0.6);
    }
    :active {
        box-shadow: inset 5px 5px 10px #0015ff;
    }
`;
export const input3 = css`
    display: none;
`;

export const div2 = css`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin-bottom: 10px;
    padding: 20px 0px 0px 45px;
    `;

export const span = css`
    font-weight: 600;
    font-size: 14px;
    color: #cececec1;
    text-align: center;
    :hover {
        color:#7c7c7cc1
    }
    `;

export const div3 = css`
    display: flex;
    flex-direction: column;
    width: 225px;
    height: 225px;
    border: 1px solid #dbdbdb;
    margin-top: 15px;
    padding-bottom: 17px;
    cursor: pointer;
    `;
export const div4 = css`
    box-sizing: border-box;
    width: 300px;
    height: 280px;
    margin:0px 0px 30px 45px;
`;
export const div5 = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 20px 0px 0px 45px;
`;
export const button = css`
    width: 120px;
    height: 40px;
    color:#fff;
    font-family: 'omyu_pretty';
    background-color: #9bbbff;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    box-shadow: 2px 2px 4px rgba(0,79,255,0.3);
    transition: 0.8ms;
    margin-bottom: 15px;
    :focus {
        outline: 0;
    }
    :hover {
        background-color: rgba(0,79,255,0.9);
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0,79,255,0.6);
    }
    :active {
        box-shadow: inset 5px 5px 10px #0015ff;
    }
`;

export const div6 = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin-top: 15px;
`;
export const button1 = css`
    width: 250px;
    height: 40px;
    color:#fff;
    background-color: #adb4fb;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    margin: 80px 0px 0px 225px;
    box-shadow: 2px 2px 4px rgba(0,79,255,0.3);
    cursor: pointer;
    :hover {
        background-color:#838dff
    }
    :active {
        box-shadow: inset 5px 5px 10px #6571fb;
    }
`;

export const div7 = css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const div8 = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 35px;
`;
export const span1 = css`
    padding: 10px;
    color: #55555557;
`;
export const span2 = css`
    padding: 10px 300px 10px 0px;
`;

export const button2 = css`
    width: 250px;
    height: 40px;
    color:#fff;
    font-family: 'omyu_pretty';
    background-color: #ff8d8d;
    font-size: 19px;
    border: none;
    border-radius: 5px;
    margin: 80px 0px 0px 225px;
    box-shadow: 2px 2px 4px rgba(255, 0, 0, 0.58);
    cursor: pointer;
    :hover {
        background-color:#ff5555
    }
    :active {
        box-shadow: inset 5px 5px 10px #ff2727;
    }
`;
export const button3 = css`
    width: 400px;
    height: 40px;
    border: none;
    font-family: 'omyu_pretty';
    border-radius: 5px;
    margin: 100px 0px 35px 200px;
    font-size: 22px;
    font-weight: 700;
    color: #6b6b6bc1;
    box-shadow: 2px 2px 4px #808080;
    cursor: pointer;
    :hover {
        background-color:#b8b8b8c1
    }
    :active {
        box-shadow: inset 5px 5px 10px #808080;
    }
`;
export const div11 = css`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
`;
