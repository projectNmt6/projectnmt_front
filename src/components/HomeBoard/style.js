import { css } from "@emotion/react";

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
  font-weight: bold;
  &>h2>img{
    width: 22px;
    height: 22px;
    border-radius: 50%;
  }
`;


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

export const LikeDonate = css`
&>div{
  padding: 10px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  width: 100%;
  margin: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  &>a{
    color: black;
    text-decoration-line: none;
  }
}
`;

export const goalAmount = css`
display:flex;
flex-direction: column;
`;



export const Top3donationList = css`
  display: flex;
  flex-direction: row;
  gap: 20px; 
  overflow-x: auto; 
`;

///////////DonationKing //////////////////

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
  width: 250px; 
  height: 150px;
  margin-left: 7px;
  & > img {
    width:100%;
    border-radius: 5px;
    height: 150px;
  }
`;

export const Top3donationDetails = css`
  padding: 15px; 
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
  &:hover, &:active, &:visited {
    text-decoration: none;
    color: inherit;
  }
`;

export const Top3goalAmount = css`
display:flex;
flex-direction: column;
`;

///////////Donator King //////////////////

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
export const rankingNumber2 = css`
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  background-color: #f0f0f0;
  color: #333;
  font-weight: bold;
  text-align: center;
  background-color: #c0c0c0; 
  color: #fff;
`;
export const rankingNumber3 = css`
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  background-color: #f0f0f0;
  color: #333;
  font-weight: bold;
  text-align: center;
  background-color: #B36700;
  color: #fff;
`;

export const amountBar1 = (height) => css`
  height: ${height}px;
  width: 50px;
  background-color: #FFD700;
`;

export const amountBar2 = (height) => css`
  height: ${height}px;
  width: 50px;
  background-color: #C0C0C0;
`;

export const amountBar3 = (height) => css`
  height: ${height}px;
  width: 50px;
  background-color: #B36700;
`;

export const barAlign = css`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
&>p {
    font-weight: bold;
}
`;
export const div = css`
  display: flex;
  white-space: normal;
  width: 123px;
  text-align: center;
  justify-content: center;
`;

export const commentBox = css`
background-color: white;
border-radius: 10px;
&>div>p {
  border-bottom: 1px solid #dbdbdb;
  padding-left: 10px;
}
`;