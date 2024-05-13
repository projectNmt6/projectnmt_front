import {css} from "@emotion/react";
export const table = css`
    border: 1px solid #e0e0e0; /* 경계선 색상을 더욱 섬세하게 조정 */
    border-collapse: collapse; /* 테이블 선들을 하나로 합침 */
    width: 100%; /* 테이블 너비를 100%로 설정 */
    & td, & th {
        padding: 10px; /* 셀 패딩 증가 */
        border-bottom: 1px solid #f0f0f0; /* 하단 경계선만 설정 */
    }
    & th {
        background-color: #fafafa; /* 헤더 배경색 설정 */
        font-weight: normal; /* 글씨 굵기 일반으로 설정 */
    }
`;

export const baseButton = css`
    background-color: #007bff; /* 배경색을 파란색으로 설정 */
    color: white; /* 글자색을 흰색으로 설정 */
    padding: 6px 12px; /* 패딩 설정 */
    border: none; /* 테두리 제거 */
    border-radius: 4px; /* 경계선 둥글게 처리 */
    &:hover {
        background-color: #0056b3; /* 호버 시 색상 변경 */
    }
`;

export const buttonContainer = css`
    display: flex;
    justify-content: flex-end; /* 버튼을 우측 정렬 */
    padding: 10px 0; /* 상하 패딩 설정 */
    gap: 10px; /* 버튼 간 간격 설정 */
`;

export const tableLayout = css`
    overflow-x: auto; /* 가로 스크롤바 설정 */
    margin-top: 20px; /* 상단 여백 추가 */
`;

export const mainContainer = css`
    max-width: 1200px; /* 최대 너비 설정 */
    margin: 20px auto; /* 위, 아래 마진과 자동으로 중앙 정렬 */
    padding: 20px; /* 내부 패딩 설정 */
    border: 1px solid #e0e0e0; /* 경계선 색상 및 스타일 설정 */
    box-shadow: 0 2px 4px rgba(0,0,0,0.05); /* 상자 그림자 추가 */
`;

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

export const textbox = css`
    margin-right: auto;
`