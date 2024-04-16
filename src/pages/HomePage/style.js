import { css } from "@emotion/react";

export const header = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;
export const progressbar = css`
    width: 100%;
    height: 20px;
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

  width: 267px; 
  height: 363px;
  border: 1px solid #ccc; 
  border-radius: 8px; 
  overflow: hidden; 
`;

export const donationImage = css`

  width: 250px; 
  height: 150px; 
  margin-left: 7px;
  & > img {
    width:100%;
    height: 150px;
  }
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
export const linkStyle = css`
  text-decoration: none; 
  color: inherit; 
  &:hover, &:active, &:visited {
    text-decoration: none;
    color: inherit;
  }
`;
