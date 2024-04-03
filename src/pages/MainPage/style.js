import { css } from "@emotion/react";


// 스타일 정의
export const donationList = css`
  display: flex;
  flex-wrap: wrap;
  gap: 20px; 
`;

export const donationCard = css`
  width: 300px; 
  border: 1px solid #ccc; 
  border-radius: 8px; 
  overflow: hidden; 
`;

export const donationImage = css`
  width: 100%; 
  height: auto; 
`;

export const donationDetails = css`
  padding: 15px; 
  
  h2 {
    margin-top: 0;
  }

  p {
    margin: 5px 0; 
  }
`;