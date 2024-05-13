import { css } from "@emotion/react";

export const div = css`
    display: flex;
    width: 600px;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 40px;
    font-size: 20px;
    font-weight: 800;
    color: black;
    @font-face {
  font-family: 'NEXON Lv1 Gothic OTF';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON%20Lv1%20Gothic%20OTF') format('woff');
  font-weight: normal;
  font-style: normal;
}
`;

export const div2 = css`
    margin-top: 10px;
`;

export const div3 = css`
    display: flex;
    width: 600px;
    margin-top: 20px;
    font-size: 20px;
    font-weight: 800;
    color: #656565;
    justify-content: space-between;
    align-items: center;
    font-family: 'NEXON Lv1 Gothic OTF';
`;
export const font =css`
    margin:10px 0px;
`;
export const div4 =css`
    display: flex;
    flex-direction: column;
`;
export const input = css`
    width: 300px;
    height: 14px;
    padding: 9px 13px;
    margin: 5px 0px;
    border-radius: 5px;
    border: 1px solid #dbdbdb;
    background-color: #FAFAFA;
    :focus {
        outline: none;
        box-shadow: 1px 1px 3px #aaaaaac1
    }
`;

export const input2 = css`
    width: 120px;
    height: 40px;
    color:#fff;
    background-color: #9bbbff;
    font-size: 17px;
    border: none;
    border-radius: 5px;
    font-family: 'NEXON Lv1 Gothic OTF';
    box-shadow: 2px 2px 4px rgba(0,79,255,0.3);
    transition: 0.8ms;
    margin-top: 20px;
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
export const button2 = css`
    width: 120px;
    height: 35px;
    color:#fff;
    font-family: 'NEXON Lv1 Gothic OTF';
    background-color: #ff8d8d;
    font-size: 19px;
    border: none;
    border-radius: 5px;
    margin-top: 20px;
    box-shadow: 2px 2px 4px rgba(255, 0, 0, 0.58);
    cursor: pointer;
    :hover {
        background-color:#ff5555
    }
    :active {
        box-shadow: inset 5px 5px 10px #ff2727;
    }
`;
export const input3 = css`
    display: flex;
    width: 80px;
    height: 28px;
    border-radius: 5px;
    color:#fff;
    background-color: #9bbbff;
    border: none;
    font-size: 19px;
    justify-content: center;
    align-items: center;
    margin-top: 25px;
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
export const input4 = css`
    display: none;
`;
export const button1 = css`
    width: 250px;
    height: 40px;
    color:#fff;
    background-color: #adb4fb;
    font-family: 'omyu_pretty';
    font-size: 19px;
    border: none;
    border-radius: 5px;
    margin: 30px 0px 0px 180px;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const div8 = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
`;
export const span1 = css`
    padding: 10px;
    color: #55555557;
    font-family: 'NEXON Lv1 Gothic OTF';
`;
export const span2 = css`
    padding: 10px 300px 10px 0px;
`;
export const button3 =css`
    width: 400px;
    height: 40px;
    border: none;
    font-family: 'omyu_pretty';
    border-radius: 5px;
    margin: 50px 0px;
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