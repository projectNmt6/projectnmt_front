import { css } from "@emotion/react"


export const container = css`
    background: #f4f4f4;
    padding: 20px;
`;

export const header = css`
    display: flex;
    justify-content: flex-end;
    padding-bottom: 20px;
`;

export const link = css`
    text-decoration: none ;
    color: #007bff;
    margin-right: 15px;
    font-weight: bold;
`;
export const button1 = css`
    margin-left: 10px;
    box-sizing: border-box;
    height: 40px;
    width: 80px;
    padding-top: 13px;
    background-color: #007bff;
    color: white;
    text-align: center;
    font-size: 10px;
    cursor: pointer;
    border-radius: 5px;
    text-decoration: none;
    & :hover {
        background-color: #4da3ff;
    }
`;

export const button2 = css`

    justify-content: center;
    align-items: center;
    height: 40px;
    width: 80px;
    box-sizing: border-box;
    margin-left: 10px;
    padding-top: 13px;
    background-color: #dc3545;
    border: none;
    color: white;
    text-align: center;
    font-size: 10px;
    text-decoration: none;
    cursor: pointer;
    border-radius: 5px;
    & :hover {
        background-color: #c82333;
    }
`;

export const button3 = css`
    height: 40px;
    width: 80px;
    margin-left: 10px;
    background-color: #dc3545;
    border: none;
    color: white;
    text-align: center;
    font-size: 10px;
    cursor: pointer;
    border-radius: 5px;
    & :hover {
        background-color: #c82333;
    }
`;
export const storyHeader = css`
    text-align: center;
    margin-bottom: 20px;
`;
export const currentAmount = css`
    font-weight: 700;
    font-size: 30px;
    text-align: right;
    margin-bottom: 8px;
`;

export const goalAmount = css`
    font-size: 16px;
    text-align: right;
    margin-bottom: 8px;
`;

export const donationtitle = css`
    text-align: left;
    flex-grow: 1;
    margin: 0;
    font-size: 28px;
    padding-top: 16px ;
    width: 360px;
    height: 96px;
`;
export const storyContent = css`
    background: white;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
`;
export const main = css`    
    display: flex;
    justify-content: space-around;
    width: 1120px;
    height: 480px;
`;

export const storyImage = css`
    display: flex;
    width: 700px;
    height: 480px;
    object-fit: cover;
    margin-bottom: 20px;
    border-radius: 5px;
    
`;
export const dates = css`
    margin-top: 20px;
    box-sizing: border-box;
    border:1px solid #dbdbdb;
    border-radius: 5px;
    color: black;
    background-color: white;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items:center;
`;
export const dates2 = css`
    font-weight: 700;
    margin-top: 10px;
`;
export const dates3 = css`
    font-weight: 600;
    color: #939393;
`;
export const dates4 = css`
    color: #A2A2A2;
    margin-top: 20px;
`;
export const donation = css`
    padding: 10px 125px;
    text-align: center;
    background-color: #fc4d4d;
    color: white;
    font-weight: 700;
    font-size: 20px;
    border-radius: 5px;
    text-decoration: none;
    border: none;
    cursor: pointer;
    :hover {
        background-color:#ff1c1c;
        transition: all 0.4s ease-in-out;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
    }
    :active {
        box-shadow: inset 2px 2px 6px #FFC8C8 ;
    }
`;

export const likebutton = css`
    display: flex;
    flex-direction: column;
    margin-top: 30px;
`

export const contentAreaStyle = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

////////홈 CSS ////////////////
export const mainLayout = css`
/* padding : 20px; */
border: 1px solid #222222;
background-color:  #F8F8F8;
white-space: pre;
`
export const leftCardLayout = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 63%;
  position: sticky;
`;

export const likebutton1 = css`
    margin-top: 15px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-around;
`;

export const container2 = css`
    padding-top: 20px;
    width: 1120px;
    height: 50%;
    background-color: white;
`;

export const button4 = css`
    border: none;
    font-size: 15px;
    color: #606060;
    margin-right: 3px;
    border-radius: 5px;
    padding: 12px;
    font-weight: 600;
    cursor: pointer;
    :focus {
        transition: all 0.3s ease-in-out;
        background-color: #bfbdbd;
    }
    :hover {
        background-color: #bfbdbd;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5); 
    }
    :active {
        background-color: #bfbdbd;
        box-shadow: inset 2px 2px 6px gray ;
    }
`;

export const sanitizeHtml = css`
    display: flex;
    margin-bottom: 20px;`


export const commentBox = css`
  display: flex;
  border: 1px solid #111111;
  width: 100%;
  height: 100%;
  margin-bottom: 20px; /* 댓글 사이의 간격 */
        padding: 10px;
        border-bottom: 1px solid #ccc; 

    margin-bottom: 20px;`


export const boxbox1 = css`
    display: flex;
    justify-content:space-between;
    border-top:2px solid #d2d0d0;
    width: 100%;
    height: 100%;
`;


export const inputbox = css`
    width: 100%;
    height: 40px;
`;

export const userProfileImg = css`
    width: 30px;
`;
export const comments = css`
    border: 1px solid #222222;
`;
export const actionsContainer = css`
   display: flex;
        padding: 8px 0; // 상하 패딩
`;
export const profileIMG = css`
    width: 30px;
    height: 30px;
    border-radius: 25px;
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

export const profileAndTextContainer = css`
    display: flex;
    flex-direction: row;  // 프로필 이미지와 텍스트 컨테이너 수평 정렬
`;

export const textAndActionsContainer = css`
    display: flex;
    flex-direction: column;  // 텍스트 섹션과 액션 컨테이너 수직 정렬
`;

export const profileSection = css`
        margin-right: 12px; // 이미지와 텍스트 사이의 간격
`;
export const commentContainer = css`
        display: flex;
        flex-direction: row; 
        align-items: flex-start; // 상단 정렬
        margin-bottom: 10px; // 코멘트 간 여백
`;

export const teamInfo = css`
    margin-top: 20px;
    margin-right: 15px;
    width: 360px;
    height: 260px;
    box-sizing: border-box;
    border:1px solid #dbdbdb;
    border-radius: 5px;
    color: black;
    background-color: white;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items:center;

`;
export const logoImg = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dbdbdb;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    overflow: hidden;
    & > img {
        height: 100%;
    }
`;

export const teamInfoText = css`
        color: black;
        width: 300px;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        line-height: 1.2;
/*        height: 4.8em;*/
        text-align: left;
        word-wrap: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    margin-top: 10px;
`;


export const container1 = css`
    width: 100%;
    height: 100%;
`;

export const container3 = css`
    width: 100%;
    height: 200%;
    top:0; left: 0; bottom: 0; right: 0;
    background: rgba(160, 160, 160, 0.6);
    overflow: hidden;
    
`;

export const cardStyle = css`
  margin: 10px;
  background-color: #fff;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow-x: auto;
  overflow-y: hidden;
  padding: 10px;
  width: 100%;
  &:hover {
    text-decoration: none;
    color: inherit;
    background-color:#faf9f7;
    transition: background-color 0.5s ease,border-color 0.5s ease;
  }
`;

export const modal = css`
    position: fixed;
    background-color: white;
    top: 50%;
    left: 50%;
    margin-left:-10%;
    margin-top: -200px; 
    display: flex;
    flex-direction: column;
    border: #d1d8dd;
    border-radius: 5px;
    width: 400px;
    height: 500px;
    box-shadow: 0 0 6px 1px rgb(0 0 0 / 30%);
`;


export const commentBoxStyle = css`
    height: 40px;
    
`;


export const commentButtonContainer = css`
    /* 버튼 컨테이너의 스타일 지정 */
    display: flex; /* 내부 요소들을 가로로 정렬 */
`;




export const inputboxExpanded = css`
    /* 입력 상태일 때 높이 증가 */
    &:focus {
        height: 100px; /* 포커스된 경우 높이 증가 */
    }

    /* 버튼 위치 및 표시 여부 설정 */
    & + button {
        display: none; /* 초기에는 버튼을 숨김 */
        position: absolute;
        bottom: 10px; /* 박스 하단으로 이동 */
        right: 10px; /* 우측 정렬 */
    }

    /* 입력 상태일 때 버튼 표시 */
    &:focus + button {
        display: inline-block; /* 입력 상태일 때 버튼을 보이도록 설정 */
    }
`;
export const textareaStyle = css`
    /* textarea의 스타일 지정 */
    width: calc(100% - 20px); /* 입력 상자와 버튼의 너비를 맞추기 위해 */
    height: 40px; /* 기본 높이 */
    padding: 10px; /* 내부 패딩 */
    box-sizing: border-box; /* 패딩과 보더 포함하여 요소 크기 계산 */
    border: 1px solid #d2d0d0; /* 테두리 스타일 */
    border-radius: 5px; /* 테두리 모서리 둥글게 */
    margin-top: 16px; /* 상단 여백 */
    font-family: 'NEXON Lv1 Gothic OTF';
    resize: none; /* 사용자 크기 조정 비활성화 */
    transition: height 0.3s ease; /* 높이 전환 효과 */

     &:focus {
        height: 100px; /* 포커스된 경우 높이 증가 */
        
    }

    &:focus + button { /* 버튼을 보이도록 설정 */
        display: inline-block;
        opacity: 1;
    }
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

export const inputboxStyle = css`
position: relative;
width: 100%;

&:focus + button { 
    display: inline-block; 
    
}
`;