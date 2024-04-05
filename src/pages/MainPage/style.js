import { css } from "@emotion/react";

export const tagContainer = css`
  display: flex;
  justify-content: center;
  margin-bottom: 20px; 
`;

export const tagButton = css`
  background-color: #dbdbdb; 
  border: none;
  border-radius: 20px; 
  padding: 10px 15px;
  margin: 0 5px;
  cursor: pointer;
  font-weight: bold;
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
  height: 200px; 
  margin-left: 7px;
  & > img {
    width:100%;
    height: 200px;
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