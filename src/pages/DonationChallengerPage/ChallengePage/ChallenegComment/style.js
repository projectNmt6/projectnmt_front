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
    /* width: calc(100% - 20px); 
    height: 40px; 
    padding: 10px; 
    box-sizing: border-box; 
    border: 1px solid #d2d0d0; 
    border-radius: 5px; 
    margin-top: 16px; 
    font-family: 'NEXON Lv1 Gothic OTF';
    resize: none; */
    width: 100%;
    height: 40px;
    border: none; // 통합된 테두리를 사용하기 때문에 테두리 제거
    resize: none;
    font-family: 'NEXON Lv1 Gothic OTF';
`;

// 확장된 상태의 textarea 스타일
export const textareaFocusStyle = css`
    width: 100%;
    height: 150px;
    border: none; // 통합된 테두리를 사용하기 때문에 테두리 제거
    resize: none;  
    border-radius: 5px; 
    font-family: 'NEXON Lv1 Gothic OTF'; 
    outline: none; 
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
        font-family: 'Pretendard-Regular';


&:hover {
    background-color: #828282;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
   
}
`;
export const commentContainer2 = css`
display: flex;
flex-direction: row; 
align-items: flex-start; // 상단 정렬
margin-bottom: 10px; // 코멘트 간 여백
`;
export const commentContainer = css`
    border: 1px solid #838383;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 10px;
    margin-top: 15px;
    margin-bottom: 15px;
    font-family: 'NEXON Lv1 Gothic OTF';
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
export const lengthStryle = css`
        margin-right: 90px;
        font-size: 13px;
        color: #999;
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


export const transparentButtonStyle = css`
    background: none; /* 배경을 투명하게 */
    border: none; /* 테두리 제거 */
    outline: none; /* 포커스 시 아웃라인 제거 */
    cursor: pointer; /* 마우스 오버 시 커서 변경 */
    padding: 0; /* 패딩 제거 */
    display: flex; /* 아이콘 중앙 정렬을 위해 */
    align-items: center; /* 수직 중앙 정렬 */
    justify-content: center; /* 수평 중앙 정렬 */
`;


// 하단 컨트롤 영역 스타일
export const commentControls = css`
    display: flex;
    justify-content: flex-end; // 요소들을 컨테이너의 오른쪽 끝으로 정렬
    align-items: center;
    width: 100%;
    height: 50px;
    position: absolute; // 버튼 위치를 텍스트 입력 영역 하단에 고정
    bottom: 10px; // 하단에서 얼마나 떨어져 있는지
    left: 10px; // 왼쪽 패딩 고려
    
`;




