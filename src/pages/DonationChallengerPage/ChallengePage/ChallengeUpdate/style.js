
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const mainLayout = css`
    width: 750px;
`;


export const textTitle = css`
    font-weight: 700;
    font-size: 20px;
    padding: 10px;
`;
export const DatePickerCss = css`
    /* 달력 기본 컨테이너 */
    .react-datepicker {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 16px;
        background-color: white;
        border: none;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        border-radius: 8px;
        color: #2c3e50;
    }

    /* 달력 헤더 */
    .react-datepicker__header {
        background-color: #2c3e50;
        border-bottom: none;
        padding-top: 10px;
        position: relative;
    }

    /* 이전/다음 버튼 */
    .react-datepicker__navigation {
        top: 22px;
        width: 34px;
        height: 34px;
        border: none;
        background-size: 22px;
        background-position: center;
    }

    .react-datepicker__navigation--previous {
        left: 10px;
        background-image: url('data:image/svg+xml;charset=UTF-8,%3csvg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"%3e%3cpath fill-rule="evenodd" clip-rule="evenodd" d="M7.41 1.41L6 0L0 6L6 12L7.41 10.59L2.83 6L7.41 1.41Z" fill="white"/%3e%3c/svg%3e');
    }

    .react-datepicker__navigation--next {
        right: 10px;
        background-image: url('data:image/svg+xml;charset=UTF-8,%3csvg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"%3e%3cpath fill-rule="evenodd" clip-rule="evenodd" d="M0.59 10.59L2 12L8 6L2 0L0.59 1.41L5.17 6L0.59 10.59Z" fill="white"/%3e%3c/svg%3e');
    }

    /* 날짜 스타일 */
    .react-datepicker__day,
    .react-datepicker__day-name {
        width: 36px;
        line-height: 36px;
        margin: 0.166rem;
        color: #2c3e50;
        font-weight: bold;
    }

    .react-datepicker__day--selected,
    .react-datepicker__day--in-range,
    .react-datepicker__day--in-selecting-range {
        background-color: #8e44ad;
        color: white;
    }

    .react-datepicker__day:hover {
        background-color: #e4e4e4;
    }

    /* 포커스 상태 */
    .react-datepicker__day--keyboard-selected {
        background-color: #3498db;
        color: white;
    }

    /* 오늘 날짜 스타일 */
    .react-datepicker__day--today {
        font-weight: bold;
        color: #d35400;
    }

    /* 간격 조정 */
    .react-datepicker__week {
        display: flex;
        justify-content: center;
    }
`;


export const dateDisplayBox = css`
padding: 10px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
    text-align: center;
    font-size: 16px;
    color: #333;
    cursor: pointer; // Indicates the text is clickable
    &:hover {
        background-color: #f4f4f4; // Light background on hover for feedback
    }  
    font-weight: 700;
    font-size: 20px;
    font-family: 'NEXON Lv1 Gothic OTF';
`;
export const inputField = css`
    width: 100%;
    padding: 20px;
    margin: 10px 0; 
    box-sizing: border-box; 
    font-size: 20px;
    font-family: 'NEXON Lv1 Gothic OTF';
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


export const imageUrlBox = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px dashed #ccc;
    cursor: pointer;
    &:hover {
        background-color: #f4f4f4;
    }
`;

export const fileInputStyle = css`
    display: none; // 파일 인풋을 숨김
`;

export const removeButton = css`
    padding: 10px 20px;
    font-size: 16px;
    color: white;
    background-color: #e74c3c;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
        background-color: #c0392b;
    }
`;


export const buttonBox = css`
    display: flex;
    justify-content: space-around; // 버튼들 사이의 간격을 균등하게 배치
    margin-top: 20px;
    padding: 10px;
`;

// 개별 버튼 스타일
export const buttonStyle = css`
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color: #3498db; // 기본 파란색 배경
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    font-family: 'NEXON Lv1 Gothic OTF';
    &:hover {
        background-color: #2980b9; // 호버 시 색상 변경
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.5); // 포커스 시 테두리 강조
    }
`;

// 각 버튼 타입별 색상 조정 (옵션)
export const cancelButtonStyle = css`
    background-color: #e74c3c; // 취소 버튼 빨간색 배경

    &:hover {
        background-color: #c0392b;
    }
`;

export const backButtonStyle = css`
    background-color: #95a5a6; // 돌아가기 버튼 회색 배경

    &:hover {
        background-color: #7f8c8d;
    }
`;