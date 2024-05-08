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
  width: 30px;
  height: 30px;
  position: relative;
  right: -150px;
`;

export const messageTextArea = css`
    position: relative;
    bottom: 25px;
    width: 250px;
    height: 200px;
    resize: none;
`;

export const messageSubmitButton = css`
    position: relative;
    bottom: 50px;
    width: 250px;
    height: 35px;
`;