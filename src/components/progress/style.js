import { css } from "@emotion/react";


export const header = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    @font-face {
    font-family: 'omyu_pretty';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/omyu_pretty.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
`;

export const progressbar = css`
    width: 100%;
    height: 10px;
    background-color: #dbecf7;
    border-radius: 4px;
    overflow: hidden;
    font-family: 'omyu_pretty';
    font-size: 15px;
    margin-bottom: 5px;
`;
export const progress = css`
    height: 100%;
    font-family: 'omyu_pretty';
    background-color: #007bff;
    transition: width 0.3s ease-in-out;
`;

