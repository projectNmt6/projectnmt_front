import { css } from "@emotion/react";


export const main = css`
    display: flex;
    justify-content: space-around;
    width: 100%; 
    background-color: aqua;
`;

// contentAreaStyle 수정
export const contentAreaStyle = css`
  display: flex;
  justify-content: center;
  max-width: 1200px; /* 전체 페이지의 최대 너비를 1200px로 제한합니다. */
  margin: 0 auto; /* 가운데 정렬을 위해 추가 */
`;

// leftCardLayout 수정
export const leftCardLayout = css`
    display: flex;
    width: 700px;
    flex-direction: column;
    flex-wrap: wrap;
    position: sticky;
`;

export const rightCardLayout = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 360px; /* 오른쪽 영역 너비를 조정합니다. */
  position: sticky; /* 스크롤에 따라 고정됩니다. */
  top: 20px; /* 부모 요소의 위쪽에서 일정한 거리만큼 떨어진 위치에 표시됩니다. */
`;

export const sidebarStyle = css`
  display: flex;
  flex-direction: column;
  margin: 10px;
  background-color: #FFD79999;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 10px;
  padding: 20px;
  justify-content: space-between;
  position: sticky; /* 오른쪽에 고정되도록 설정합니다. */
  top: 20px; /* 부모 요소의 위쪽에서 일정한 거리만큼 떨어진 위치에 표시됩니다. */
  right: 0; /* 오른쪽에 위치하도록 설정합니다. */
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



export const storyContent = css`
    background: wheat;
    border-radius: 5px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
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
