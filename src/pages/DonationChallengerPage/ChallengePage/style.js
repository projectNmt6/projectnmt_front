import { css } from "@emotion/react";

export const container = css`
    background: #f4f4f4;
    padding: 20px;
`;
export const container1 = css`
    width: 100%;
    height: 100%;
    background-color: wheat;
`;
export const main = css`    
    display: flex;
    justify-content: space-around;
    width: 1120px;
    height: 480px;
    background-color: aqua;
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

export const contentAreaStyle = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const leftCardLayout = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 63%;
  position: sticky;
`;

export const rightCardLayout = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;  
  overflow: hidden;
  width: 100%;
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


export const sidebarStyle = css`
  display: flex;
  flex-direction: column;
  margin: 10px;
  background-color: #FFD79999;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 10px;
  padding: 20px;
  justify-content: space-between;
  overflow: hidden;

  & > div > img {
        width: 150px;
        height: 150px;
    }

`;


export const commentBox = css`

  display: flex;
  border: 1px solid #111111;
  margin-bottom: 20px; /* 댓글 사이의 간격 */
        padding: 5px;
        border-bottom: 1px solid #ccc; 

`;

export const boxbox1 = css`
    display: flex;
    justify-content:space-between;
    border-top:2px solid #d2d0d0;
    width: 100%;
    height: 100%;
`;

export const container2 = css`
    padding-top: 20px;
    width: 1120px;
    height: 50%;
    background-color: white;
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

export const storyHeader = css`
    text-align: center;
    margin-bottom: 20px;
`;
