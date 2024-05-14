import {css} from "@emotion/react";

export const tableHeader = css`
    box-sizing: border-box;
    margin: 5px 0px;
    border: 1px solid #dbdbdb;
    width: 100%;
`
export const mainContainer = css`
    padding: 20px; /* 패딩 증가 */
    width: 100%;
    max-width: 1200px; /* 최대 너비 설정 */
    margin: auto; /* 중앙 정렬 */
    background-color: #fff; /* 배경색 통일 */
    box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* 상자 그림자 추가 */
`;

export const searchButton = css`
    padding: 8px 16px;
    background-color: #007BFF; /* 버튼 색상 변경 */
    color: white;
    border-radius: 4px;
    &:hover {
        background-color: #0056b3; /* 호버 시 버튼 색상 변경 */
    }
`;
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
export const searchBar = css`
    display: flex;
    gap: 10px; /* 요소 사이의 간격 추가 */
    align-items: center; /* 아이템을 세로 중앙으로 정렬 */
    padding: 10px 0;
`;
export const table = css`
    border: 1px solid #ccc; /* 더 부드러운 색상 사용 */
    border-collapse: collapse;
    width: 100%; /* 테이블 너비를 100%로 설정하여 공간 활용 극대화 */
    margin: 20px 0; /* 상하 마진 추가 */

    & td, & th {
        padding: 10px 15px; /* 셀 내 패딩 조정 */
        text-align: left; /* 모든 텍스트 왼쪽 정렬 */
        border-bottom: 1px solid #eee; /* 선을 더 부드럽게 */
    }
    & th {
        background-color: #fafafa; /* 헤더 배경색 설정 */
    }
`;
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
        padding: 3px;
        width: 325px;
        background-color: white;
    }
`;

export const registerTh = css`
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    padding: 5px;
    width: 100px;
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

export const imgBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dbdbdb;
    border-radius: 50%;
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
    justify-content: space-between;
    border: none;
    padding: 10px;
    width: 100%;
    height: 100%;
`;

export const baseButton = css`
  box-sizing: border-box;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(229, 229, 229);
    margin: 0px;
    line-height: 1.5;
    letter-spacing: -0.1px;
    text-decoration: none;
    cursor: pointer;
    background-color: rgb(255, 255, 255);
    height: 46px;
    padding: 0px 20px;
    border-radius: 999px;
    gap: 6px;
    width: 140px;
    color: rgb(68, 68, 68);
    font-weight: normal;
    box-shadow: none; 
    font-size: 18px;
    font-family: 700;
    font-family: "NEXON Lv1 Gothic OTF";
`;