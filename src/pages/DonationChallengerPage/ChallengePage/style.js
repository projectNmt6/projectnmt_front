import { css } from "@emotion/react";


export const main = css`
    display: flex;
    justify-content: space-around;
    width: 100%; 
    height: 100%;
        
`;


export const contentAreaStyle = css`
  display: flex;
  width: 1200px; /* 전체 페이지의 최대 너비를 1200px로 제한합니다. */
  margin: 0 auto; /* 가운데 정렬을 위해 추가 */  
  min-height: 500px;
`;

// leftCardLayout 수정
export const leftCardLayout = css`
    display: flex;
    width: 700px;
    flex-direction: column;
    flex-wrap: wrap;
    position: relative; 
`;

export const rightCardLayout = css`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 360px;
    margin-left: 40px;
`;


export const sidebarStyle = css`
width: 340px;
box-sizing: border-box;
font: inherit;

vertical-align: baseline;
padding: 20px;
order: 1;
position: sticky;
top: 84px;
border: 1px solid rgb(221, 221, 221);
border-radius: 8px;
margin-top: 40px;
margin-left: 10px;
background-color: rgb(255, 255, 255);
`;

export const sidebarStyle2 = css`
  display: flex;
  flex-direction: column;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 10px;
  padding: 20px;
  justify-content: space-between;
  top: 20px;
  right: 0;
`;
export const sidebarStyle3 = css`
    display: flex;
    flex-direction: column;
    margin: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    border-radius: 10px;
    padding: 20px;
    justify-content: space-between;
    background-color: #f2f2f2; /* 배경색을 연한 회색으로 설정 */
`;

export const teamInfo = css`
  display: flex;
  flex-direction: column;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 10px;
  padding: 20px;
  justify-content: space-between;
  top: 20px; /* 부모 요소의 위쪽에서 일정한 거리만큼 떨어진 위치에 표시됩니다. */
  right: 0; /* 오른쪽에 위치하도록 설정합니다. */
`;
export const teamName = css`
 font-weight: 700;
`;
export const teamLogo = css`
 width: 30px;
 height: 30px;
`;
export const teamText = css`
    margin-top: 10px;
    padding: 10px;
`;
export const actionImage = css`
 width: 50px;
 height: 50px;
 padding: 4px; 
 z-index: 1;
`;

 
export const actionButton1 = css`

    display: flex;
    margin: 10px; 
    border-radius: 10px;
   align-items: center;
   justify-content: center;
    background-color: rgb(173, 76, 254);
    color: white; /* 글자색 변경 */
    width: 360px; /* 가로 크기 변경 */
    height: 50px; /* 세로 크기 변경 */
    border: none;
    font-size: 17px;
    text-decoration: none;
    font-weight: 600;
    font-family: 'NEXON Lv1 Gothic OTF';

`;
export const actionButton2 = css`
    width: 290px;
    display: flex;
    margin-top: 10px;
    border-radius: 10px;
   align-items: center;
   justify-content: center;
    background-color: rgb(173, 76, 254);
    height: 40px;
    color: white; /* 글자색 변경 */
    border: none;
    font-size: 16px;
    text-decoration: none;
    font-weight: 500;
    font-family: 'NEXON Lv1 Gothic OTF';
`;
export const disableActionButton = css`
    width: 290px;
    display: flex;
    margin-top: 10px;
    border-radius: 10px;
   align-items: center;
   justify-content: center;
    background-color: rgb(61, 61, 61);
    height: 40px;
    color: white; /* 글자색 변경 */
    border: none;
    font-size: 16px;
    text-decoration: none;
    font-weight: 500;
    font-family: 'NEXON Lv1 Gothic OTF';
`;


export const remainingDays = css`
  align-self: flex-start; // Flex 컨테이너 내에서 자신만의 위치를 조정
  border: 1px solid #ccc; // 테두리 추가
  border-radius: 10px; // 모서리 둥글게 처리
  background-color: #222222; // 배경색 추가
  color: white; // 텍스트 색상 설정
  font-size: 14px; // 텍스트 크기 설정
  padding: 4px 8px; // 내용 주변에 적당한 패딩을 추가하여 내용을 감쌈
  margin: 5px 0; // 상하 마진 추가, 좌우 마진은 제거
  display: inline-flex; // Flex 아이템으로서 동작하면서 내부에서 inline으로 동작
  justify-content: center; // 내부 텍스트 중앙 정렬
  min-width: fit-content; // 내용에 딱 맞는 너비
`;



// container2 수정
export const container2 = css`
    padding-top: 20px;
    width: 100%; /* 분리 페이지 내의 요소가 가로 100%를 차지하도록 설정합니다. */
    height: 100%;
    background-color: white;
    position: relative;
    display: flex;
    justify-content: space-between;
`;






export const boxbox1 = css`
    display: flex;
    justify-content: flex-start; /* 요소들을 왼쪽으로 정렬합니다. */
    border-top: 2px solid #d2d0d0;
    width: 100%;
`;

export const container1 = css`
    width: 100%;
    height: 100%;
    background-color: wheat;
`;


export const container3 = css`
    position: absolute;
    width: 100%;
    height: 200%;
    top:0; left: 0; bottom: 0; right: 0;
    background: rgba(160, 160, 160, 0.6);
    overflow: hidden;
    z-index: 100; /* 다른 요소보다 위에 위치하도록 설정 */
`;

export const link = css`
    text-decoration: none ;
    color: #007bff;
    margin-right: 15px;
    font-weight: bold;
`;

export const header = css`
    display: flex;
    justify-content: flex-end;
    padding-bottom: 20px;
`;

export const commentBorder = css`

border-bottom: 1px solid #ccc; // 말풍선과 구분선
`;

export const buttonGroup = css`
    display: flex;
    justify-content: space-between; /* 버튼들을 동일한 간격으로 배치합니다. */
    
    top: 0; /* 상단에 고정되도록 설정 */
    background-color: white; /* 배경색을 설정하여 상단에 고정될 때 다른 내용과 겹치지 않도록 합니다. */
    padding: 10px 0; /* 필요한 경우 위아래 패딩을 추가할 수 있습니다. */
`;

export const buttonGroupContainer = css`
  display: flex;
  top: 0;
  background-color: white;
`;

export const button4 = css`
    border: none;
    font-size: 15px;
    margin-right: 3px;
    border-radius: 5px;
    padding: 12px;
    font-weight: 600;
    cursor: pointer;
    background-color: transparent; // 배경색 제거
    color: rgb(136, 136, 136); // 초기 텍스트 색상 설정

    :focus {
        transition: all 0.3s ease-in-out;
    }
    :hover {
        color: #333; // 마우스 오버 시 텍스트 색상 변경
    }
    :active {
        color: #555; // 마우스 클릭 시 텍스트 색상 진하게 변경
    }
`;

export const actionmodal = css`
     z-index: 15000; /* 더 높은 z-index 값 */
`

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
    transition: background-color 0.5s ease,
    border-color 0.5s ease;
  }
`;

export const modal = css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 500px;
    display: flex;
    flex-direction: column;
    border: 1px solid #d1d8dd;
    border-radius: 5px;
    box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.3);
    background-color: white;
    z-index: 1500; // 충분히 높은 z-index
`;




export const storyContent = css`
    background: wheat;
    border-radius: 5px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 40px;
`;
export const storyImage = css`
    display: flex;
    width: 700px;
    height: 480px;
    object-fit: cover;
    border-radius: 10px;
    
`;
export const storyHeader = css`
    text-align: center;
    margin-bottom: 20px;
`;
export const actionText = css`
    display: flex;
    align-items: center; // 아이콘과 텍스트를 세로 중앙 정렬
    padding-bottom: 15px;
    font-weight: 700;
    font-size: 16px;
    svg { // 아이콘에 대한 스타일
        font-size: 20px; // 텍스트와 일치하는 크기
        margin-right: 8px; // 아이콘과 텍스트 사이에 간격 추가
    }
`;

export const actionProgressBar = css`
    text-align: center;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    height: 5px;
    width: 100%; /* 최대 너비 설정 */
    transition: width 0.5s ease-in-out;
    div {
        height: 100%;
        background-color: rgb(173, 76, 254);
    border-radius: 5px;
    }
`;
export const actingInfo = css`
    display: flex;
    justify-content: space-between; /* 요소들을 좌우 정렬 */
    align-items: center; /* 요소들을 수직 정렬 */
    padding: 10px 0px;
`;

export const actingCount = css`
    display: flex;
    align-items: center; // 아이콘과 텍스트를 세로 중앙 정렬
    font-weight: 600;
    font-size: 14px;
    svg { // 아이콘에 대한 스타일
        font-size: 20px; // 텍스트와 일치하는 크기
        margin-right: 8px; // 아이콘과 텍스트 사이에 간격 추가
        
    color: rgb(173, 76, 254);
    }
`;
export const headCountCss = css`
    font-weight: 600;
    font-size: 14px;

`;

export const howToText = css`
    position: relative; 
    margin-bottom: 20px;
    font-weight: 700;
    font-size: 20px;
`;