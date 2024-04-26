import { css } from "@emotion/react";

export const layout = css`
overflow: auto;
`
export const searchBar = css`
    box-sizing: border-box;
    display: flex;
    margin: 20px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 50px;
`;

export const searchInput = css`
  position: relative;

  &>input{
    display: flex;
    align-items: flex-start;
    box-sizing: border-box;
    border: none;
    border: 2px solid #FFD79999;
    outline: none;
    background-color: #fdfdfd;
    width: 800px;
    height: 55px;
    size: 50px;
    padding: 10px;
    font-size: 20px;
    :focus {
      border: 2px solid orange;

    }
  }
`;

export const searchButton=css`
    box-sizing: border-box;
    border: none;
    border-left: 1px solid #dbdbdb;
    width: 60px;
    cursor: pointer;
    background-color: transparent;
    position: absolute; 
    right: 3px; 
    top: 50%; 
    transform: translateY(-50%);
`;

export const searchSelect = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 100px;
`;

export const searchCategory = css`
  display: flex;
  justify-content: center;
`;


export const donationList = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 5px 100px;
  gap: 20px; 
`;

export const donationCard = css`
  display: flex;
  height: 150px;
  border-bottom: 1px solid #ccc; 
  padding-bottom: 40px;
  overflow: hidden; 
`;

export const donationImage = css`
  display: flex;
  align-items: center;
  width: 300px; 
  height: 100%; 
  padding: 10px;
  margin-left: 7px;
  & > img {
    width:100%;
    height: 150px;
  }
`;

export const donationDetails = css`
  padding: 15px; 
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const donationText = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  &>h2>strong {
    color: white;
    font-size: 15px;
    padding: 5px 10px;
    border-radius: 3px;
    &.active {
        color: white;
        background-color: #10c838;
      }

    &.finished {
      color: white;
      background-color: #ff4d4d;
      }
    }
`;

export const donationAmount = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;


export const linkStyle = css`
  text-decoration: none; 
  color: inherit; 
  &:hover, &:active, &:visited {
    text-decoration: none;
    color: inherit;
  }
`;

export const tagContainer = css`
  display: flex;
  justify-content: flex-start;
  padding-left: 20px;
  &>p>strong {
    color: orange;
  }
  `;

export const tagHeader = css`
border-top: 1px solid #dbdbdb;
display: flex;
justify-content: space-between;
align-items: center;
margin: 0 100px 0 100px;
`
export const selectItems = css`
display: flex;
overflow: hidden;
`

export const rightButton = css`
  background-color: transparent;
  border-right: 1px solid #dbdbdb;
  border: none;
  color: gray;
  cursor: pointer;
  &:focus{
    font-weight: bold;
    color: black;
  }
`
export const rightSelect = css`
padding: 5px;
margin: 5px;
color: gray;
`

export const tagButton = css`
  background-color: transparent; 
  border: none;
  padding: 10px 15px;
  margin: 0 5px;
  cursor: pointer;
  font-size: 15px;
  &:focus{
    font-weight: bold;
    color: orange;
    border-bottom: 1px solid orange;
  }
`;

