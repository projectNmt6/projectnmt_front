import {css} from "@emotion/react";

export const tableHeader = css`
    box-sizing: border-box;
    margin: 5px 0px;
    border: 1px solid #dbdbdb;
    width: 100%;
`
export const searchButton = css`
    box-sizing: border-box;
    border: none;
    border-left: 1px solid #dbdbdb;
    width: 85px;
    cursor: pointer;
    background-color: white;
    &:hover{
        background-color: #fafafa;
    }
    &:active{
        background-color: #eeeeee;
    }
`
export const tableContainer = css`
    box-sizing: border-box;
    
    position: relative;
`;
export const tableLayout =css`
    position: relative;
    border: none;    
    background-color: white;
    overflow-x: scroll;

    &::-webkit-scrollbar {  
        box-sizing: border-box;
        border: 1px solid #ffffff;
        width: 10px;
        height: 10px;
        background-color: #fdfdfd;
    }
    &::-webkit-scrollbar-thumb {
        box-sizing: border-box;
        background-color: #dbdbdb;
        border: 1px solid #fafafa;
    }
`

export const table =css`
    border: 1px solid black;
    border-collapse: collapse;
    width: max-content;
    & td, & th {
        border: 1px solid #dbdbdb;
        padding: 0px 5px;
    }
    & th {
        border-top: none;
    } 
    & td {
        font-size: 14px;
    }
    /* & tr > td:nth-of-type(1),
    & tr > th:nth-of-type(1) {
        border-left: none;
    }
    & tr > td:nth-last-of-type(1),
    & tr > th:nth-last-of-type(1) {
        border-right: none;
    } */
    & tr > td:nth-of-type(1),
    & tr > th:nth-of-type(1) {
        text-align: center;
        min-width: 30px;
    }
    & tr > td:nth-of-type(2),
    & tr > th:nth-of-type(2) {
        min-width: 80px;
    }
    & tr > td:nth-of-type(2) {
        text-align: right;
    }
    & tr > td:nth-of-type(3),
    & tr > th:nth-of-type(3) {
        width: 290px;
    }
    & tr > td:nth-of-type(4),
    & tr > th:nth-of-type(4) {
        min-width: 140px;
    }
    tr > td:nth-of-type(4) {
        text-align: right;
    }
    & tr > td:nth-of-type(5),
    & tr > th:nth-of-type(5) {
        min-width: 140px;
    }
    & tr > td:nth-of-type(6),
    & tr > th:nth-of-type(6) {
        min-width: 332px;
    }
    
`
export const theadTr =css`
    position: sticky;
    top: 0px;
    background-color: #fdfdfd;
`

export const nullDiv =css`
    border: none;
    border-right: 1px solid #dbdbdb;
    width: 282px;
`

export const searchInput=css`
    flex-grow: 1;
    border: none;
    border-left: 1px solid #dbdbdb;
    padding: 10px;
    outline: none;
    background-color: #fdfdfd;
    
`
export const searchBar = css`
    display: flex;
    box-sizing: border-box;
    width:  1078px;
    margin: 5px 0px;
    border: 1px solid #dbdbdb;

`

export const registerTable = css`
    box-sizing: border-box;
    border-collapse: collapse;
    border: 1px solid #dbdbdb;
    border-radius: 3px;
    width:  1078px;
    background-color: #fdfdfd;
    & td {
        box-sizing: border-box;
        border: 1px solid #dbdbdb;
        padding: 3px 8px;
        width: 325px;
        background-color: white;
    }
`;

export const registerTh = css`
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    padding: 5px;
    width: 110px;
    cursor: default;
`;

export const inputBox = css`
    box-sizing: border-box;
    border: none;
    outline: none;
    padding: 0px 10px;
    width: 100%;
    height: 100%;
    &:disabled{
        background-color: white;
    }
`;

export const container = css`
    box-sizing: border-box;
    border: 1px solid black;
    padding: 10px;
    width: 1100px;
    height: auto;
    &:disabled{
        background-color: white;
    }
`;

export const mainContainer = css`
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const imgBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    overflow: hidden;
    & > img {
        height: 100%;
    }
`

export const buttonContainer = css`
    box-sizing: border-box;
    margin: 10px 0;
    display: flex;
    border: none;
    padding: 10px;
    width: 100%;
    height: 100%;
`;

export const divmargin = css`
    margin-left: 30px;
`
export const baseButton2 = css`
  width: 150px;
  height: 30px;
  margin-left   : 82px;
  border: none;
  border-radius: 3px;
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
export const baseButton = css`

margin-left: 30px;
text-decoration: none;
      box-sizing: border-box;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(229, 229, 229);
    line-height: 1.5;
    letter-spacing: -0.1px;
    text-decoration: none;
    cursor: pointer;
    background-color: rgb(255, 255, 255);
    height: 46px;
    padding: 0px 20px;
    border-radius: 999px;
    gap: 6px;
    width: 130px;
    color: rgb(68, 68, 68);
    font-weight: 700;
    font-size: 16px;
    box-shadow: none;  
    font-family: 'NEXON Lv1 Gothic OTF';
`;
export const showButton = css`
  width: 100px;
  height: 20px;
  border: none;
  border-radius: 3px;
  display: flex;
  background-color: #FF9966 ;
  justify-content: flex-start;
  color: black;
  cursor: pointer;
  :hover {
      background-color:#FF6600
  }
  :active {
      box-shadow: inset 5px 5px 10px #808080;
  }
`;