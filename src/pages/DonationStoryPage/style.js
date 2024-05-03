import { css } from "@emotion/react"

export const container = css`
    background: #f4f4f4;
    padding: 20px;
`;

export const header = css`
    display: flex;
    justify-content: flex-end;
    padding-bottom: 20px;
`;

export const link = css`
    text-decoration: none;
    color: #007bff;
    font-size: 20px;
    margin: 30px;
    font-weight: bold;
`;
export const button1 = css`
    margin-left: 10px;
    box-sizing: border-box;
    height: 40px;
    width: 80px;
    padding-top: 13px;
    background-color: #007bff;
    color: white;
    text-align: center;
    font-size: 15px;
    cursor: pointer;
    border-radius: 5px;
    text-decoration: none;
    & :hover {
        background-color: #4da3ff;
    }
`;

export const button2 = css`

    justify-content: center;
    align-items: center;
    height: 40px;
    width: 80px;
    box-sizing: border-box;
    margin-left: 10px;
    padding-top: 13px;
    background-color: #dc3545;
    border: none;
    color: white;
    text-align: center;
    font-size: 15px;
    text-decoration: none;
    cursor: pointer;
    border-radius: 5px;
    & :hover {
        background-color: #c82333;
    }
`;

export const button3 = css`
    height: 40px;
    width: 80px;
    margin-left: 10px;
    background-color: #dc3545;
    border: none;
    color: white;
    font-family: 'omyu_pretty';
    text-align: center;
    font-size: 15px;
    cursor: pointer;
    border-radius: 5px;
    & :hover {
        background-color: #c82333;
    }
`;
export const storyHeader = css`
    text-align: center;
    margin-bottom: 20px;
`;
export const currentAmount = css`
    font-weight: 700;
    font-size: 30px;
    text-align: right;
    margin-bottom: 8px;
`;

export const goalAmount = css`
    font-size: 16px;
    text-align: right;
    margin-bottom: 8px;
`;

export const donationtitle = css`
    text-align: left;
    flex-grow: 1;
    margin: 0;
    font-size: 28px;
    padding-top: 16px ;
    width: 360px;
    height: 96px;
`;
export const storyContent = css`
    background: white;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
`;
export const main = css`    
    display: flex;
    justify-content: space-around;
    width: 1120px;
    height: 480px;
`;

export const storyImage = css`
    display: flex;
    width: 700px;
    height: 480px;
    object-fit: cover;
    margin-bottom: 20px;
    border-radius: 5px;
    
`;
export const dates = css`
    margin-top: 20px;
    margin-left: 15px;
    box-sizing: border-box;
    border:1px solid #dbdbdb;
    border-radius: 5px;
    color: black;
    background-color: white;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items:center;
`;
export const dates2 = css`
    font-weight: 700;
    margin-top: 10px;
`;
export const dates3 = css`
    font-weight: 600;
    color: #939393;
`;
export const dates4 = css`
    color: #A2A2A2;
    margin-top: 20px;
`;
export const donation = css`
    padding: 10px 125px;
    text-align: center;
    background-color: #fc4d4d;
    color: white;
    font-family: 'omyu_pretty';
    font-weight: 700;
    font-size: 20px;
    border-radius: 5px;
    text-decoration: none;
    border: none;
    cursor: pointer;
    :hover {
        background-color:#ff1c1c;
        transition: all 0.4s ease-in-out;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
    }
    :active {
        box-shadow: inset 2px 2px 6px #FFC8C8 ;
    }
`;

export const likebutton = css`
    display: flex;
    flex-direction: column;
    margin-top: 30px;
`

export const contentAreaStyle = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

////////홈 CSS ////////////////
export const mainLayout = css`
/* padding : 20px; */
border: 1px solid #222222;
background-color:  #F8F8F8;
white-space: pre;
`
export const leftCardLayout = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 63%;
  position: sticky;
`;

export const rightCardLayout = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;  
  overflow: hidden;
  width: 30%;
`;

export const sidebarStyle = css`
  display: flex;
  flex-direction: column;
  margin: 10px;
  background-color: #FFD79999;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 10px;
  padding: 20px;
  justify-content: space-between;
  overflow: hidden;

  & > div > img {
        width: 150px;
        height: 150px;
    }

`;

export const sidebarText = css`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`

export const likebutton1 = css`
    margin-top: 15px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-around;
`;

export const container2 = css`
    padding-top: 20px;
    width: 1120px;
    height: 50%;
    background-color: white;
`;

export const button4 = css`
    border: none;
    font-size: 15px;
    color: #606060;
    margin-right: 3px;
    border-radius: 5px;
    padding: 12px;
    font-weight: 600;
    cursor: pointer;
    :focus {
        transition: all 0.3s ease-in-out;
        background-color: #bfbdbd;
    }
    :hover {
        background-color: #bfbdbd;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5); 
    }
    :active {
        background-color: #bfbdbd;
        box-shadow: inset 2px 2px 6px gray ;
    }
`;

export const sanitizeHtml = css`
    display: flex;
    margin-bottom: 20px;`


// export const commentBox = css`
//   display: flex;
//   border: 1px solid #111111;
//   width: 100%;
//   height: 100%;
//   margin-bottom: 20px; /* 댓글 사이의 간격 */
//     padding: 10px;
//     border-bottom: 1px solid #ccc; 
//     margin-bottom: 20px;`


export const boxbox1 = css`
    display: flex;
    justify-content:space-between;
    border-top:2px solid #d2d0d0;
    width: 100%;
    height: auto;
`;
export const mainBox = css`
    display: flex;
    width: 100%;
    height: 100%; 
`;
export const teamNDonationBox = css`
    position: sticky;
    margin-left: 10px;
    top: 0;
    height: 860px;
`;

export const commentBox = css`
    display: flex;
    flex-direction:column;
    justify-content: center;
    width: 100%;
    border-top:2px solid #d2d0d0;
    margin-bottom: 20px;
`;

export const commentBoxStyle = css`
    width: 100%;
    height: 40px;
`;

export const donationInfo = css`
    box-sizing: border-box;
    border:1px solid #dbdbdb;
    border-radius: 5px;    
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    `;

export const h3 = css`
    display: flex;
    width: 300px;
    font-weight: 600;
    margin-left: 15px;
    height: 25px;
    font-size: 25px;
`;
export const div5 = css`
    display: flex;
    width: 300px;
    align-items: center;
    margin: 10px 0px;
    text-decoration: none;
    color: #7e7e7ec1;
    :hover {
        font-size: 17px;
        font-weight: 800;
    }
`;

export const div6 = css`
    display: flex;
    flex-direction: column;
    font-size: 20px;
    margin-left: 16px;
    text-decoration-line: none;
`;

export const font = css`
    color: #444;
`;

export const img = css`
    width: 100px;
    height: 100px;
    border-radius: 5px;
`;

export const teamInfo = css`
    position: relative;
    margin-top: 25px;
    margin-bottom: 25px;
    width: 350px;
    height: 260px;
    box-sizing: border-box;
    border:1px solid #dbdbdb;
    border-radius: 5px;
    color: black;
    background-color: white;
    justify-content: center;
    align-items: center;
    text-align: center;
    display: flex;
    flex-direction: column;
`;
export const logoImg = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dbdbdb;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    overflow: hidden;
    & > img {
        height: 100%;
    }
`;
export const div3 = css`
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 25px;
    width: 350px;
    margin-bottom: 25px;
`;

export const teamInfoText = css`
    color: black;
    width: 300px;
    font-size: 20px;
    color: #a1a1a1c1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    line-height: 1.2;
/*        height: 4.8em;*/
    text-align: left;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const link1 = css`
    text-decoration-line: none;
    color: #444;
    cursor: pointer;
    :hover {
        font-size: 17px;
        font-weight: 800;
    }
`;

export const inputboxStyle = css`
    margin-top: 30px;
    width: 100%;
    height: 70px;
    padding:0px 0px 23px 10px;

    box-sizing: border-box;
    border: 1px solid #d2d0d0;
    border-radius: 5px;
    font-size: inherit;    
    :focus {
        transition: all 0.3s ease-in-out;
        border: 1px solid pink;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }
`;
export const button5 = css`
    margin-top: 16px;
    background-color: #aaaaaa;
    color: white;
    width: 75px;
    font-size: 18px;
    font-family: 'omyu_pretty';
    height: 30px;
    box-sizing: border-box;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    transition: background-color 0.5s, box-shadow 0.5s; 

    :hover {
        background-color: #828282;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5); 
    }
    :active {
        background-color: white;
    }
`;

export const container1 = css`
    width: 100%;
    height: 100%;
    font-family: 'omyu_pretty';
    @font-face {
    font-family: 'omyu_pretty';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/omyu_pretty.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
`;

export const container3 = css`
    position: absolute;
    width: 100%;
    height: 200%;
    top:0; left: 0; bottom: 0; right: 0;
    background: rgba(160, 160, 160, 0.6);
    z-index: 3;
    overflow: hidden;
    
`;

export const cardStyle = css`
  margin: 10px;
  background-color: #fff;
  border: 1px solid rgba(0,0,0,0.1);
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

export const modal = css`
    position: fixed;
    background-color: white;
    top: 50%;
    left: 50%;
    margin-left:-10%;
    margin-top: -200px; 
    display: flex;
    flex-direction: column;
    border: #d1d8dd;
    border-radius: 5px;
    width: 400px;
    height: 500px;
    z-index: 99;
    box-shadow: 0 0 6px 1px rgb(0 0 0 / 30%);
`;

export const div1 = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 15px 0px;
`;

export const div2 = css`
    display: flex;
    font-size: 18px;
    font-family: 'omyu_pretty';
    align-items: center;
    text-align: center;
`;
export const div4 = css`
    width: 1120px;
    font-size: 22px;
    font-weight: 600;
    border-bottom: 1px solid #dbdbdb;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    padding: 20px 0px;
`;

export const button6 = css`
    border-radius: 50px;
    border: none;
    margin-top: 20px;
    font-size: 18px;
    text-align: center;
    font-family: 'omyu_pretty';
    height: 30px;
    background-color: #fae6d3;
    color: #444;
    transition: all 150ms ease-in-out;
    box-shadow: 2px 2px 2px #aaaaaac1;
    cursor: pointer;
    &:hover {
    box-shadow: 0 0 10px 0 #fae6d3 inset, 0 0 10px 4px #fae6d3;
    background-color: white;
    color:black;
  }
`;

export const button7 = css`
    border-radius: 50px;
    margin-top: 20px;
    border: none;
    font-size: 18px;
    text-align: center;
    font-family: 'omyu_pretty';
    height: 30px;
    background-color: #fcbfbf;
    color: #444;
    transition: all 150ms ease-in-out;
    box-shadow: 2px 2px 2px #aaaaaac1;
    cursor: pointer;
    &:hover {
    box-shadow: 0 0 10px 0 #fcbfbf inset, 0 0 10px 4px #fcbfbf;
    background-color: white;
    color:black;
  }
`;

