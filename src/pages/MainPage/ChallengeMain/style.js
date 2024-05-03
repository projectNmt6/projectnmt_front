import { css } from "@emotion/react";

export const mainLayout = css`
  display: flex;
  width: 1200px; // 페이지 넓이 조정
  flex-wrap: wrap; 
  justify-content: center; // 중앙 정렬
`;

export const donationList = css`
  margin: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  grid-template-rows: auto auto; 
  grid-gap: 20px; 
  justify-content: center; 
  width: 100%; 
`;
export const bigDonationCard = css`
  display: flex;
  flex-direction: column;
  grid-column: span 2;
  width: 550px;
  min-height: 330px; // 최소 높이 설정, 텍스트에 따라 늘어남
  border-radius: 10px;
  overflow: visible; // 내용이 넘칠 경우 보이도록 설정
  text-decoration: none;
  color: #000000; // 텍스트 색상을 검은색으로 설정
`;

export const smallDonationCard = css`
  display: flex;
  flex-direction: column;
  grid-column: span 1;
  width: 265px;
  min-height: 265px; // 최소 높이 설정, 텍스트에 따라 늘어남
  border-radius: 10px;
  overflow: visible; // 내용이 넘칠 경우 보이도록 설정
  text-decoration: none;
  color: #000000; // 텍스트 색상을 검은색으로 설정
  margin-top: 20px;
`;

export const donationImage = css`
  width: 100%; // 이미지를 카드 너비에 맞춤
  height: 265px; // 이미지 높이 고정
  border-radius: 10px; // 컨테이너에 둥근 모서리 적용

  & > img {
    width: 100%;
    height: 100%; // 이미지 높이를 고정
    object-fit: cover; // 이미지 비율을 유지하면서 컨테이너를 채움
    border-radius: 10px; // 이미지에도 둥근 모서리 적용
  }
`;

export const title = css`
  padding-top: 15px;
  font-weight: 700;
  font-size: 16px; 
`;

export const sign = css`
display: flex;
flex-direction: column;
`;

export const write=css`
margin-bottom: 30px;
font-size: 20px;
color: black;
`;

export const tagContainer = css`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const donationCard = css`
  width: 265px; 
  height: 265px;
  border-radius: 10px; 
  overflow: hidden; 
`;



export const linkStyle = css`
  text-decoration: none; 
  color: inherit; 
  &:hover, &:active, &:visited {
    text-decoration: none;
    color: inherit;
  }
`;

export const upperRightMenu = css`
`;
export const teamInfo = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  
`;

export const teamName = css`
  display: flex;
  align-items: center; // 로고와 텍스트를 세로 중앙에 정렬
  font-weight: 700;
`;

export const teamLogo = css`
  width: auto;
  height: 24px;
  border-radius: 5px;
  margin-right: 5px; // 텍스트와의 간격을 추가
`;


export const writeStyles = css`
  display: flex;
  margin: 20px;
  padding-right: 20px;

  justify-content: flex-end; 
  width: 100%; /* 작성하기 요소가 전체 너비를 차지하도록 설정 */
`;

export const linkStyles = css`
  display: flex;
  align-items: center;
  font-size: 17px;
  color: black;
  text-decoration: none;
  font-weight: 700;
`;

export const iconStyles = css`
  width: 20px;
  height: 20px;
  margin-right: 5px; /* 조정 가능 */
`;