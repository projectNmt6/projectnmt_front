import { css } from "@emotion/react"

export const commentBoxStyle = css`
    min-height: 40px;
    overflow-y: auto;
`;

export const inputboxStyle = css`
position: relative;
width: 100%;

`

export const textareaNormalStyle = css`
    width: calc(100% - 20px); /* 입력 상자와 버튼의 너비를 맞추기 위해 */
    height: 40px; /* 기본 높이 */
    padding: 10px; /* 내부 패딩 */
    box-sizing: border-box; /* 패딩과 보더 포함하여 요소 크기 계산 */
    border: 1px solid #d2d0d0; /* 테두리 스타일 */
    border-radius: 5px; /* 테두리 모서리 둥글게 */
    margin-top: 16px; /* 상단 여백 */
    font-family: 'NEXON Lv1 Gothic OTF';
    resize: none; /* 사용자 크기 조정 비활성화 */
`;

// 확장된 상태의 textarea 스타일
export const textareaFocusStyle = css`
    width: calc(100% - 20px); /* 입력 상자와 버튼의 너비를 맞추기 위해 */
    height: 100px; /* 포커스된 경우 높이 증가 */
    padding: 10px; /* 내부 패딩 */
    box-sizing: border-box; /* 패딩과 보더 포함하여 요소 크기 계산 */
    border: 1px solid #007bff; /* 포커스된 경우 테두리 색상 변경 */
    border-radius: 5px; /* 테두리 모서리 둥글게 */
    margin-top: 16px; /* 상단 여백 */
    font-family: 'NEXON Lv1 Gothic OTF';
    resize: none; /* 사용자 크기 조정 비활성화 */
`;


export const commentSubmitButton = css`
        opacity: 1;
        margin-top: 16px;
        background-color: black;
        color: white;
        font-size: 143x;
        font-weight: 700;
        height: 30px;
        width: 50px;
        box-sizing: border-box;
        border-radius: 20px;
        border: none;
        cursor: pointer;
        position: absolute;
        bottom: 15px;
        right: 25px;
        z-index: 1000;
        font-family: 'Pretendard-Regular';


&:hover {
    background-color: #828282;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
   
}
`;

export const commentContainer = css`
        display: flex;
        flex-direction: row; 
        align-items: flex-start; // 상단 정렬
        margin-bottom: 10px; // 코멘트 간 여백
`;
export const profileAndTextContainer = css`
    display: flex;
    flex-direction: row;  // 프로필 이미지와 텍스트 컨테이너 수평 정렬
`;

export const profileSection = css`
        margin-right: 12px; // 이미지와 텍스트 사이의 간격
`;

export const profileIMG = css`
    width: 30px;
    height: 30px;
    border-radius: 25px;
`; 

export const textAndActionsContainer = css`
    display: flex;
    flex-direction: column;  // 텍스트 섹션과 액션 컨테이너 수직 정렬
`;
export const textSection = css`
    display: flex;
    flex-direction: column; // 상하 정렬
    background-color: #f0f0f0; // 배경 색
    padding: 10px; // 내부 패딩
    border-radius: 10px; // 모서리 둥글게
    box-shadow: 0 2px 4px rgba(0,0,0,0.1); // 그림자 효과
    position: relative; // 상대적 위치
    z-index: 1;
    &:after { // 말풍선 꼬리 모양
        content: "";
        position: absolute;
        top: 10px; // 위치 조정
        left: -25px; // 꼬리 시작 위치 조정
        width: 0;
        height: 0;
        border: 15px solid transparent; // 꼬리 크기 조정
        border-right-color: #f0f0f0; // 배경색과 일치
    }
`;

export const actionsContainer = css`
   display: flex;
        padding: 8px 0; // 상하 패딩
`;









