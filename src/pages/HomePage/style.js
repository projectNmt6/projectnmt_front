import { css } from "@emotion/react";


////////홈 CSS ////////////////
export const mainLayout = css`
/* padding : 20px; */
background-color:  #F8F8F8;
white-space: pre;
`
export const rootheader = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
   
`;
export const headerStyle = css`
  padding: 20px;
`;
export const introStyle = css`
  display: flex;
  align-items: center;
  overflow: hidden;

    & > img {
        border-radius: 50%;
        width: 70px;
        height: 70px;
    }
    & > h3 {
        padding: 5px 20px;
        border: solid 0.5px #dbdbdb;
        border-radius: 15px;
        color: gray;
    }
    & > button {
        border: none;
        background-color: transparent;
        padding-right: 20px;

        
    }
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
  width: 30%;
`;

export const cardStyle = css`
  margin: 10px;
  background-color: #fff;
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

export const cardText = css`
  margin: 20px;
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

export const sidebarText = css`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`

export const totalAmountBox = css`
border: 1px solid #dbdbdb;
border-radius: 10px;
padding: 10px;
background-color: white;
display:flex;
justify-content: center;
`

//////////// footer ////////////
export const additionalContentStyle = css`
  // styles for additional content
`;


export const footerStyle = css`
  border-top: 1px solid #dbdbdb;
  text-align: center;
  &>p {
    margin: 20px;
    font-weight: bold;
  }
  &>a {
    color: black;
    text-decoration-line: none;
  }
`;
