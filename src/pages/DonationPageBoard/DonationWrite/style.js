import { css } from "@emotion/react";

export const mainLayout = css`
    width: 700px;
`;
export const textTitle = css`
    font-weight: 700;
    font-size: 20px;
    padding: 10px;
`;
export const imgUrlBox = css`
    display: inline-block;
    width: 700px;
    line-height: 10px;
`;

export const dateDisplayBox = css`

    width: 700px;
    box-sizing: border-box;
padding: 10px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
    text-align: center;
    font-size: 16px;
    color: #333;
    cursor: pointer; 
    &:hover {
        background-color: #f4f4f4;
    }  
    font-weight: 700;
    font-size: 20px;
    font-family: 'NEXON Lv1 Gothic OTF';
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

export const inputField = css`
    width: 700px;
    padding: 20px;
    margin: 10px 0; 
    box-sizing: border-box; 
    font-size: 20px;
    font-family: 'NEXON Lv1 Gothic OTF';
`;
export const backButtonStyle = css`
    background-color: #95a5a6; // 돌아가기 버튼 회색 배경

    &:hover {
        background-color: #7f8c8d;
    }
`;
export const fileInputStyle = css`
    display: none; // 파일 인풋을 숨김
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

const controlStyles = {
    backgroundColor: 'white',
    borderColor: 'gray',
    '&:hover': {
        borderColor: 'lightgray'
    },
    minHeight: '40px',
    height: '40px',
    width: '700px' // width를 700px로 설정
};

const optionStyles = {
    color: 'black',
    '&:hover': {
        backgroundColor: 'lightgray'
    }
};
export const customStyles = {
    control: (provided, state) => ({
        ...provided,
        ...controlStyles,
        borderColor: state.isFocused ? 'blue' : provided.borderColor,
        boxShadow: state.isFocused ? '0 0 0 1px blue' : 'none'
    }),
    option: (provided, state) => ({
        ...provided,
        ...optionStyles,
        backgroundColor: state.isFocused ? 'lightblue' : 'white'
    }),
    menu: provided => ({
        ...provided,
        zIndex: 9999
    }),
    menuPortal: base => ({
        ...base,
        zIndex: 9999
    })
};