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

export const pbar = css`
  width: 100%;
`

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
  box-sizing: border-box;
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
  box-sizing: border-box;
  height: 363px;
  border: 1px solid #ccc; 
  border-radius: 8px; 
  border: none;
  margin: 20px;
  
`;

export const Top3donationImage = css`
  width: 90%;
  margin-left: 7px;
  & > img {
    width:100%;
    border-radius: 5px;
    height: 150px;
  }
`;

export const Top3donationDetails = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
`;

export const titlefont = css`
  font-size: 16px;
  color: rgb(32, 32, 32);
  padding-top: 10px;
  height: 35px; 
  overflow: hidden;
`

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



//////////////AutoSlide///////////////

export const autoSlideContainer = css`
display:flex;
flex-direction: column;
justify-content:flex-start;
  width: 100%;
  height: 500px;
  overflow: hidden;

`;

export const slideList = css`
  padding: 0px;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
  box-sizing: border-box;
  
`;

export const slideLi = css`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
`;

export const prevButton = css`
  position: absolute;
  top: 45%;
  left: 1%;
  z-index: 10;
  background-color: transparent;
  border: none;
  /* 이전 버튼 스타일 */
`;

export const nextButton = css`
  position: absolute;
  top: 45%;
  right: 1%;
  z-index: 10;
  background-color: transparent;
  border: none;
  /* 다음 버튼 스타일 */
`;

export const overlay = css`
  position: absolute;
  background-color: gray;
  /* 오버레이 스타일 */
`;

export const slideImage = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 60%;
`;

export const textOverlay = css`

  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
  color: #dbdbdb;
  font-size: 24px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
  /* 추가 스타일 속성을 여기에 작성하세요 */
  
`;

export const OverLayButton = css`
background-color: transparent;
border: 1px solid #dbdbdb;
color: #dbdbdb;
width: 100px;
height: 50px;
font-size: 15px;
font-weight: 1000;
cursor: pointer;
`;

//////////DonateTip////////////



export const header = css`
    display: flex;
    flex-direction: column;
    font-family: 'omyu_pretty';
    @font-face {
    font-family: 'omyu_pretty';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/omyu_pretty.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
`;

export const button = css`
    padding: 10px;
    position: absolute;
    right: 0%;
    border: none;
    border-radius: 5px;
    font-family: 'omyu_pretty';
    font-size:14px ;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border: 1px solid white;
    cursor: pointer;
`;
export const header1 = css`
    margin: 15px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'omyu_pretty';
    font-size: 19px;
    font-weight: 800;
    padding-bottom: 15px;
    border-bottom: 1px solid #c1c1c1c1;
`;


export const div0 = css`
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;

export const div1 = css`
    margin-top: 10px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'omyu_pretty';
    font-size: 25px;
    color: #888888c1;
    &>p{
      white-space:pre-wrap;
      padding: 3px;
      }
`;


export const div2 = css`
    display: flex;
    margin: 15px 0px;
    width: 100%;
    flex-wrap:wrap;
    justify-content: space-around;
`;
export const button1 = css`
    width: 90px;
    height: 35px;
    margin-bottom: 10px;
    font-family: 'omyu_pretty';
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    color: #575757c1;
    box-shadow: 1px 1px 3px #cececec1;
    font-weight: 600;
    :hover {
        background-color: #cececec1;
        box-shadow: 1px 1px 6px gray;
    }
    :active{
        background-color: #717171c1;
        box-shadow: 1px 1px 6px gray;
    }
`;
export const button2 = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 380px;
    height: 40px;
    color: white;
    font-size: 20px;
    font-family: 'omyu_pretty';
    font-weight: 600;
    border-radius: 5px;
    background-color: #ff3b3b;
    text-decoration: none;
    border: none;
    cursor: pointer;
    :hover {
        transition: all 0.4s ease-in-out;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
    }
    :active {
        box-shadow: inset 2px 2px 6px #FFC8C8 ;
    }
`;