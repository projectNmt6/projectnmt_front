import { css } from "@emotion/react"



export const header = css`
    display: flex;
    justify-content: flex-end;
    padding-bottom: 20px;
`;

export const commentBorder = css`
border-bottom: 1px solid #ccc; // 말풍선과 구분선
`;
export const buttonGroup2 = css`
    display: flex;
    position: sticky;
    top: 0; /* 상단에 고정되도록 설정 */
    background-color: white; /* 배경색을 설정하여 상단에 고정될 때 다른 내용과 겹치지 않도록 합니다. */
    z-index: 1000; /* 필요에 따라 z-index 값 조정 */
    padding: 10px 0; /* 필요한 경우 위아래 패딩을 추가할 수 있습니다. */
`;

export const buttonGroupContainer2 = css`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1000;
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



export const tabMenu2 = css`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1000;
`;

export const tabList2 = css`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
`;

export const tabListItem2 = css`
  margin-right: 10px;
`;

export const tabButton2 = css`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 16px;
  color: #333;
  outline: none;
  transition: color 0.3s;
`;

export const activeTabButton2 = css`
  color: black;
  font-weight: bold;
`;


export const headerPanel2 = css`
 position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10000;
    background-color: #fff; /* 명시적 배경색 지정 */
    border-bottom: 1px solid #ccc; /* 하단 경계선 추가 */
    width: 100%;
`;

