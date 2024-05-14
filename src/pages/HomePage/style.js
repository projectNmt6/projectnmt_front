import { css, keyframes } from "@emotion/react";


////////홈 CSS ////////////////
export const mainLayout = css`
background-color:  #F8F8F8;
width: 100%;
font-family: 'omyu_pretty';
white-space: pre;
@font-face {
  font-family: 'NEXON Lv1 Gothic OTF';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON%20Lv1%20Gothic%20OTF') format('woff');
  font-weight: normal;
  font-style: normal;
}

`
export const rootheader = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
   
`;
export const headerStyle = css`
  padding: 20px;
  padding-bottom: 0px;
`;
export const introStyle = css`
  display: flex;
  align-items: center;
  overflow: hidden;

    & > img {
        border-radius: 50%;
        width: 70px;
        height: 70px;
        margin-right: 50px;
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
  margin-right:3%;
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
  background-color: #d4f0f099;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 10px;
  padding: 20px;
  justify-content: space-between;
  overflow: auto;


`;

const brightnessAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
  `;
  export const sideImg =css`
    width: 100px;
    height: 100px;
    border-radius: 30%;
    padding-right: 50px;
    animation-name: ${brightnessAnimation};
    animation-duration: 4s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    
  `


export const sidebarText = css`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;

`


export const totalAmountBox = css`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border: 1px solid #dbdbdb;
border-radius: 10px;
padding: 10px;
background-color: white;
display:flex;
justify-content: center;
/* &>h3{
  border-bottom: 1px solid #dbdbdb
} */
`


////////카드 CSS ////////////////


export const progressbar = css`
    width: 100%;
    height: 10px;
    background-color: #f0f0f0;
    border-radius: 4px;
    overflow: hidden;
`;
export const progress = css`
    height: 100%;
    background-color: #007bff;
    transition: width 0.3s ease-in-out;
`;


export const donationList = css`
  display: flex;
  flex-wrap: wrap;
  gap: 20px; 
`;

export const donationCard = css`
  display: flex;
  box-sizing: border-box;
  width: 100%; 
  height: 100%;
  border-radius: 8px; 
  overflow-x: hidden; 
 
`;

export const donationImage = css`

  height: 100%; 
  margin: 20px;
  & > img {
    border-radius: 10px;
    width:300px;
    height: 200px;
  }
`;

export const donationDetails = css`
  box-sizing: border-box;
  width: 100%;
  padding: 15px; 
  margin: 20px;

  div {
    display: flex;
    justify-content: space-between;
  }
  h2 {
    margin-top: 0;
  }

  p {
    margin: 5px 0; 
  }
`;
export const linkStyle = css`
  text-decoration: none; 
  color: inherit; 
  width: 100%;
  &:hover, &:active, &:visited {
    text-decoration: none;
    color: inherit;
  }
`;

export const goalAmount = css`
display:flex;
flex-direction: column;
`;
////////////////Top3////////////////

export const Top3donationList = css`
  display: flex;
  flex-direction: row;
  gap: 20px; 
  overflow-x: auto; 

`;


export const Top3donationCard = css`
  display: flex;
  flex-direction: column;
  width: 300px; 
  height: 363px;
  border: 1px solid #ccc; 
  border-radius: 8px; 
  border: none;
  margin: 20px;

`;

export const Top3donationImage = css`

  height: 100%; 
  margin: 20px;
  & > img {
    border-radius: 10px;
    width:300px;
    height: 200px;
  }
`;

export const Top3donationDetails = css`
  padding: 15px; 
  margin: 20px;

  div {
    display: flex;
    justify-content: space-between;
  }
  h2 {
    margin-top: 0;
  }

  p {
    margin: 5px 0; 
  }
`;
export const Top3linkStyle = css`
  text-decoration: none; 
  color: inherit; 
  width: 100%;
  &:hover, &:active, &:visited {
    text-decoration: none;
    color: inherit;
  }
`;

// export const LikeDonate = css`
//   &>div{
//   padding: 10px;
//   border: 1px solid #dbdbdb;
//   border-radius: 5px;
//   width: 100%;
//   margin: 20px;
//   display: flex;
//   justify-content: center;
//   &>a{
//     color: black;
//     text-decoration-line: none;
//   }
// }
// `;

export const Top3goalAmount = css`
display:flex;
flex-direction: column;
`;

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

///////////기부왕 //////////////////

export const kingCardStyle = css`
  margin: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow-x: auto;
  padding: 10px;
  width: 100%;
  &:hover {
    text-decoration: none;
    color: inherit;
    background-color:#faf9f7;
    transition: background-color 0.5s ease,border-color 0.5s ease;
  }
   
`;
export const rankingContainer = css`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 20px;
  text-align: center;
`

export const rankingItem = css`
  display: flex;
  align-items: center;
  margin: 0 10px;
`

export const rankingNumber = css`
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  background-color: #f0f0f0;
  color: #333;
  font-weight: bold;
  text-align: center;


    background-color: #ffd700; /* 금색 */
    color: #fff;

`;

export const amountBar1 = (height) => css`
  height: ${height}px;
  width: 50px;
  background-color: #FFD700;
`;
export const amountBar2 = (height) =>css`
  height: ${height}px;
  width: 50px;
  background-color: #C0C0C0;
`;
export const amountBar3 = (height) =>css`
  height: ${height}px;
  width: 50px;
  background-color: #B36700;
`;

export const barAlign = css`
display: flex;
flex-direction: column;
align-items: center;
`

export const LikeDonate =css`
`;

export const nmtbutton = css`
cursor : pointer;
`
export const buttonLayout = css`
display: flex;
flex-wrap: wrap;
justify-content: center;

`
export const button = (color) => css`
  display: flex;
  flex-direction: column;
  height: 200px;
  width: 200px;
  padding: 20px;
  border-radius: 10px;
  margin: 10px;
  /* cursor: pointer; */
  transition: background-color 0.3s;
  background-color: #dbdbdb;
  color: black;
  word-wrap: break-word;
  flex-wrap: wrap;
  position: relative;
  white-space: normal;
  &>a{
    color: black;
  text-decoration: none;
  &>img{
    width: 50px;
    height: 50px;
  }
  }
`;
export const button2 = (color) => css`
  display: flex;
  flex-direction: column;
  height: 200px;
  width: 200px;
  padding: 20px;
  border-radius: 10px;
  margin: 10px;
  transition: background-color 0.3s;
  background-color: #BDBDBD;
  color: white;
  word-wrap: break-word;
  flex-wrap: wrap;
  position: relative;
  white-space: normal;
  &>a{
    color: black;
  text-decoration: none;
  &>img{
    width: 50px;
    height: 50px;
  }
  }
`;

export const NoticeText = css`
    font-size: 20px;
    font-weight: bold;
    box-sizing: border-box;


`;
export const icon = css`
  position: absolute;
  bottom: 20px;
  right: 30px;
  font-size: 24px;
  margin-top: 10px; 
  border: 0;
  background-color: transparent;
  cursor: pointer;
`;



export const modal = css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 600px;
    display: flex;
    flex-direction: column;
    border: 1px solid #d1d8dd;
    border-radius: 5px;
    box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.3);
    background-color: white;
    z-index: 1500; // 충분히 높은 z-index
`;

