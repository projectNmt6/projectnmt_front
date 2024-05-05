import { css } from "@emotion/react";


export const main = css`
    display: flex;
    justify-content: space-around;
    width: 100%; 
    height: 100%;
    background-color: aqua;
        
`;
export const sidebarFixedStyle = css`
    position: sticky;
    top: 0; // 화면 상단에서 고정
    margin-top: 20px; // 필요에 따라 조정하여 초기 위치 결정
    background-color: white; // 배경색
    padding: 20px; // 패딩
    box-shadow: 0 2px 5px rgba(0,0,0,0.1); // 그림자 효과
    z-index: 100; // 충분히 높은 z-index
`;


export const sidebarStyle = css`
  display: flex;
  margin: 10px; 
  flex-direction: column; 
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 10px;
  padding: 25px;
  position: sticky; // 오른쪽
  top: 20px;
  z-index: 2000; /* 수정된 부분 */
`;

export const actionImage = css`
 width: 50px;
 height: 50px;
 padding: 4px; 
 z-index: 1;
`;

export const actionButton2 = css`
    display: flex;
    margin: 10px; 
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

export const container3 = css`
    position: absolute;
    width: 100%;
    height: 200%;
    top:0; left: 0; bottom: 0; right: 0;
    background: rgba(160, 160, 160, 0.6);
    overflow: hidden;
    z-index: 100; /* 다른 요소보다 위에 위치하도록 설정 */
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

export const actingInfo = css`
    display: flex;
    justify-content: space-between; /* 요소들을 좌우 정렬 */
    align-items: center; /* 요소들을 수직 정렬 */
    padding: 10px 0px;
`;


export const howToText = css`
    position: absolute; /* 절대 위치 설정 */
    top: -13px; /* 상단으로 -15px 이동하여 박스 경계 부분에 겹치도록 */
    left: 15%;
    transform: translateX(-50%); /* 수평으로 가운데 정렬 */
    font-weight: 700;
`;