import { css } from "@emotion/react";

export const layout = css`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  
  font-family: 'NEXON Lv1 Gothic OTF';
`;
export const moreLoad = css`
text-decoration: none;
      box-sizing: border-box;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(229, 229, 229);
    margin: 0px;
    line-height: 1.5;
    letter-spacing: -0.1px;
    text-decoration: none;
    cursor: pointer;
    background-color: rgb(255, 255, 255);
    height: 46px;
    padding: 0px 20px;
    border-radius: 999px;
    gap: 6px;
    width: 130px;
    color: rgb(68, 68, 68);
    font-weight: 700;
    font-size: 16px;
    box-shadow: none; 
 
    font-family: 'NEXON Lv1 Gothic OTF';
    
`;
export const messageBox = css`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 350px;
  height: 450px;
  padding: 10px;
  background: white;
`;

export const messageBoxButton = css`
  display: flex;
  justify-content: center;
  text-align: center;
  border: none;
  border-radius: 3px;
  width: 30px;
  height: 30px;
  position: relative;
  right: -150px;
  box-shadow: 2px 2px 4px #808080;
  cursor: pointer;
  @font-face {
    font-family: 'NEXON Lv1 Gothic OTF';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv1 Gothic OTF.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
  & > * {
    font-size: 16px;
  }
  & > svg {
    transform: translate(5%, 40%);
  }
`;

export const messageTextArea = css`
    position: relative;
    bottom: 25px;
    width: 250px;
    height: 200px;
    resize: none;    
    font-family: 'NEXON Lv1 Gothic OTF';
`;

export const messageSubmitButton = css`
  position: relative;
  bottom: 50px;
  width: 250px;
  height: 35px;
  border: none;
  border-radius: 3px;
  box-shadow: 2px 2px 4px;
  cursor: pointer;
  :hover {
     
  }
  :active {
      box-shadow: inset 5px 5px 10px ;
  }
`;

export const openButton = css`
  border: none;
  cursor: pointer;
  color: black; // 텍스트 색상이 명시적으로 지정되어 있는지 확인

`;