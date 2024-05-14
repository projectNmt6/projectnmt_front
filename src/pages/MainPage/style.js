import { css } from "@emotion/react";
export const sign = css`
display: flex;
flex-direction: column;
`;

export const write=css`
  padding: 5px;
  &>a{
    text-decoration-line: none;
     color: black;
     font-weight: 700;
     line-height: 1.48;
  }
  cursor: pointer;
`;

export const tagContainer = css`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const tagButton = css`
  background-color: transparent; 
  border: 0.2px solid #dbdbdb;
  border-radius: 20px; 
  padding: 10px 15px;
  margin: 0 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 15px;
  &:focus{
    font-weight: bold;
    background-color: black;
    color: white;
  }
`;
export const tagAllButton = (selectedTag) => css`
  border: 0.2px solid #dbdbdb;
  border-radius: 20px;
  padding: 10px 15px;
  margin: 0 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 15px;
  background-color: ${selectedTag ? "white" : "black"};
  color: ${selectedTag? "black" : "white"};
`;


export const donationList = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px; 
`;

export const donationCard = css`

  width: 283px; 
  height: 363px;
  /* border: 1px solid #ccc;  */
  overflow: hidden; 
  `;

export const donationImage = css`

width: 100%; 
position: relative;
& > img {
  width:100%;
  height: 180px;
  border-radius: 8px; 
  }
`;

export const donationDetails = css`
  
  h2 {
    color: #202020;
  }
  p {
  color: #888888;
  }
`;
export const linkStyle = css`
  text-decoration: none; 
  color: inherit; 
  &:hover, &:active, &:visited {
    text-decoration: none;
    color: inherit;
  }
`;


export const headerButton = (selectedCategory) => css`
  display: flex;
  &>button{
    background-color: transparent;
    border: none;
    color: #949494;
    margin: 10px;
    cursor: pointer;
    font-size: 22px;
    text-decoration-line: none;
    font-weight: 1000;
    line-height: 1.48;
    &:focus, &:hover {
      font-weight: bold;
      color: black;
      border-bottom: 2px solid black;
    }
    &:nth-child(1){
      color: ${selectedCategory === 0 ? "black" : "#949494"};
      border-bottom: ${selectedCategory === 0 ? "2px solid black" : "none"};
    }
    &:nth-child(2){
      color: ${selectedCategory === 1 ? "black" : "#949494"};
      border-bottom: ${selectedCategory === 1 ? "2px solid black" : "none"};
    }
  }
`;

export const header = css`
display: flex;
justify-content: space-between;
align-items: center;
width: 1200px;
padding: 30px 20px;
font-family: 'NEXON Lv1 Gothic OTF';
@font-face {
  font-family: 'NEXON Lv1 Gothic OTF';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON%20Lv1%20Gothic%20OTF') format('woff');
  font-weight: normal;
  font-style: normal;
}
`;

export const main = css`
display: flex;
flex-direction: column;
width: 1200px;
flex-wrap: wrap;
justify-content: center;

@font-face {
  font-family: 'NEXON Lv1 Gothic OTF';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON%20Lv1%20Gothic%20OTF') format('woff');
  font-weight: normal;
  font-style: normal;
}
`;

export const selectItems = css`
display: flex;
justify-content: flex-end;
padding: 20px;
`

export const rightButton = (sortOrder) => css`
  background-color: transparent;
  font-size: 18px;
  font-weight: ${!sortOrder? "bold" : " none"};
  border: none;
  color: ${!sortOrder? "black": "gray"};
  cursor: pointer;
  border-left: ${!sortOrder? "3px dotted red" : "none"};

  &:focus{
    color: black;
    border-left: 3px dotted red;
    border-collapse: none;
    font-weight: bold;
  }
`
export const RunningOut = (timeOut) => css`
      position: absolute;
      margin: -45px 10px;
      z-index: 2;
      background-color: #FF4050;
      padding: 5px;
      border-radius: 5px;
      color: white;
      display: ${timeOut ? "" : "none"};

`;