import { css } from "@emotion/react";

export const mainLayout = css`
  display: flex;
  width: 1200px; // 페이지 넓이 조정
  flex-wrap: wrap; // 필요에 따라 내용을 감싸기
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
`;

export const smallDonationCard = css`
  display: flex;
  flex-direction: column;
  grid-column: span 1;
  width: 265px;
  min-height: 265px; // 최소 높이 설정, 텍스트에 따라 늘어남
  border-radius: 10px;
  overflow: visible; // 내용이 넘칠 경우 보이도록 설정
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


export const donationDetails = css`
  padding: 10px !important;

  & > *  { // 모든 링크 상태에 적용
    color: black !important; // 링크 색상 변경
    text-decoration: none !important; // 밑줄 제거
    font-size: 18px !important; // 폰트 크기 적용
  }
`;

export const sign = css`
display: flex;
flex-direction: column;
`;

export const write=css`
margin-bottom: 30px;
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