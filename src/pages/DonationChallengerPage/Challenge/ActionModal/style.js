import { css } from '@emotion/react';

export const modalBackground = css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999; // 매우 높은 z-index 값
`;

export const modalContainer = css`
    background-color: #FFFFFF; // 완전 불투명한 흰색
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 500px;
    text-align: center;
    position: relative; 
`;

export const header = css`
`;

export const body = css`
    margin-bottom: 20px;
`;

export const button = css`

background: none;
    border: none;
    cursor: pointer;
    top: 10px; /* 상단에서 10px 위치 */
    right: 10px; /* 오른쪽에서 10px 위치 */
    display: flex;
    align-items: center;
    padding: 10px;
    color: #202020; /* 아이콘과 텍스트 색상 */
    justify-content: center;

`;

export const headerTitle = css`
    font-size: 18px;
    color: #333;
`;

export const loginButton = css`
        /* 확인 버튼 스타일 */
        background-color: rgb(173, 76, 254);
        width: 130px;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 10px;
        font-size: 17px;
        font-weight: 700;
`;

export const closeButton = css`

    background-color: white;
        color: black;
        border: 1px solid #ccc;
        width: 130px;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 10px;
        font-size: 17px;
        font-weight: 700;
`;

export const imageContainer = css`
    display: flex;
    flex-wrap: wrap; // 여러 이미지가 있을 경우 줄바꿈 허용
    gap: 3px; // 이미지 사이의 간격    
    padding: 10px 20px;
`;

export const imageLayout = css`
position: relative;
    border: 1px solid #dbdbdb;
    width: 80px; // 이미지의 너비
    height: 80px; // 이미지의 높이
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    & > img {
        width: 100%; // 이미지가 컨테이너를 꽉 채우도록 설정
        height: auto; // 이미지의 비율을 유지하면서 높이 조정
    }
`;



export const actionTitleText = css`
    font-size: 20px;
    font-weight: 700;
    padding-bottom: 20px;  // 아래쪽에 20px 패딩 추가
`;
export const actionText = css`
    font-size: 18px;
    padding-bottom: 30px;  // 아래쪽에 20px 패딩 추가
    padding-top: 20px;
    border-top: 1px solid #ccc;
    border-bottom: 5px solid #f0f0f0;  // 하단에 1px의 회색 구분선 추가
`;


export const fileInputContainer = css`
    position: relative;
    overflow: hidden;
    display: block; // 블록 레벨 요소로 만들어 줄바꿈 적용
    margin-bottom: 20px; // 입력 버튼과 텍스트 입력창 사이의 공간을 추가
`;

export const fileInputLabel = css`
    color: black;
    padding: 15px;
    border-radius: 5px;
    border: 1px solid black; // 검은색 테두리 3px 추가
    display: block;
    width: calc(100% - 40px); // 좌우 총 40px의 마진을 고려
    text-align: center;
    cursor: pointer;
    margin: 20px auto 0px  auto; 
    box-sizing: border-box; // 패딩과 보더가 너비에 포함되도록 설정
    background-color: transparent; // 배경색 제거
    font-size: 20px; // 텍스트와 아이콘 크기 일치
    display: flex;
    align-items: center; // 아이콘과 텍스트 수직 중앙 정렬
    justify-content: center; // 아이콘과 텍스트 수평 중앙 정렬
    svg {
        font-size: 30px; // SVG 아이콘 크기를 30px로 설정
    }
`;



export const fileInput = css`
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
`;

export const textInput = css`
    width: calc(100% - 40px); // 부모 컨테이너에서 좌우 20px의 마진을 고려한 너비
    /* width: 100%; // 부모 컨테이너의 너비를 모두 차지하도록 설정 */
    height: 150px; // 높이 설정
    padding: 10px; // 상하좌우 패딩
    border: 1px solid #ccc; // 경계선 추가
    border-radius: 5px; // 모서리 둥글게 처리
    box-sizing: border-box; // 패딩과 보더가 너비에 포함되도록 설정
    word-wrap: break-word;
    font-family: 'NEXON Lv1 Gothic OTF';
`;

export const deleteButton = css`
    position: absolute;
    top: 0px;
    right: 0px;
    background-color: rgba(0, 0, 0, 0.6); /* 약간 투명한 검은색 배경 */
    border: none;
    cursor: pointer;
    color: #fff;
    font-size: 10px;
    z-index: 1;
    padding: 5px; /* X 아이콘과 배경 사이의 여백 추가 */
`;

