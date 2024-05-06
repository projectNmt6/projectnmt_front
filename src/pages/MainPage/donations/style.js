import { css } from "@emotion/react";

export const sign = css`
display: flex;
flex-direction: column;
`;

export const write=css`
  padding: 5px;
  &>a{
    text-decoration-line: none;
     color: #949494;
     font-weight: 600;
     line-height: 1.48;
  }
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
  p {
  color: #888888;
  }
`;
export const donationTitle = css`
  height: 40px;
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
  &>a{
    background-color: none;
    border: none;
    background-color: transparent; 
    color: #949494;
    margin: 10px;
    cursor: pointer;
    font-size: 22px;
    text-decoration-line: none;
    font-weight: 1000;
    line-height: 1.48;
    &:focus{
      font-weight: bold;
      color: black;
      border-bottom: 2px solid black;
    }
    &:nth-child(1){
      color: ${!selectedCategory ? "black" : "#949494" };
      border-bottom: ${!selectedCategory ? "2px solid black" : "none" };
    }
  }
  `;
  export const headerButton2 = (selectedCategory) => css`
  display: flex;
  &>a{
    background-color: none;
    border: none;
    background-color: transparent; 
    color: #949494;
    margin: 10px;
    cursor: pointer;
    font-size: 22px;
    text-decoration-line: none;
    font-weight: 1000;
    line-height: 1.48;
    &:focus{
      font-weight: bold;
      color: black;
      border-bottom: 2px solid black;
    }
    &:nth-child(2){
      color: ${!selectedCategory ? "black" : "#949494" };
      border-bottom: ${!selectedCategory ? "2px solid black" : "none" };
    }
  }
  `;
export const header = css`
display: flex;
justify-content: space-between;
align-items: center;
width: 1200px;
padding: 30px 20px;
`;

export const main = css`
display: flex;
flex-direction: column;
width: 1200px;
flex-wrap: wrap;
justify-content: center;
`;

export const selectItems = css`
display: flex;
justify-content: flex-end;
padding: 20px;
`
// style.js

export const active = {
  backgroundColor: '#f0f0f0', // Example active background color
  color: '#333', // Example text color for active state
};

export const inactive = {
  backgroundColor: '#fff', // Example inactive background color
  color: '#bbb', // Example text color for inactive state
};

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
export const finished = css`
      position: absolute;
      margin: -45px 10px;
      z-index: 2;
      background-color: #3CB371;
      padding: 5px;
      border-radius: 5px;
      color: white;
`;
