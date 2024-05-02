
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const buttonBox = css`
    margin-top: 20px;
    padding: '10px 20px'
`;


export const imageBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 100%;
    overflow: hidden;

    & img {
        height: 150px;
    }
`;

export const imgUrlBox = css`
    display: inline-block;
    width: 95%;
    line-height: 10px;
`;


export const commentBox = css`

  display: flex;
  border: 1px solid #111111;
  margin-bottom: 20px; /* 댓글 사이의 간격 */
        padding: 5px;
        border-bottom: 1px solid #ccc; 

`;

export const boxbox1 = css`

  display: flex;
  border: 1px solid #111111;
  width: 500px;
  height: 600px;

`;

export const inputbox = css`
    width: 100%;
    height: 40px;
`;