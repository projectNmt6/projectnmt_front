import { css } from "@emotion/react"

export const DonatorBox = css`
    display: flex;
    border: 1px solid #222222;
`;
export const mainLayout = css`
    width: 750px;
`;

export const challengeStory = css`
width: 700px;
margin-bottom: 50px;
* > img {
  width: 700px;
}

@font-face {
  font-family: 'NEXON Lv1 Gothic OTF';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON%20Lv1%20Gothic%20OTF') format('woff');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'RIDIBatang';
  src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/RIDIBatang') format('woff');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Pretendard-Regular';
  src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
}
 
@font-face {
  font-family: 'D2Coding';
  src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_three@1.0/D2Coding') format('woff');
  font-weight: normal;
  font-style: normal;
}

/* 폰트 클래스를 정의합니다. */

.ql-font-nexon-gothic-otf {
  content: 'NEXON Lv1 Gothic OTF';
  font-family: 'NEXON Lv1 Gothic OTF', sans-serif;
}

.ql-font-ridibatang {
  font-family: 'RIDIBatang', serif;
}

.ql-font-pretendard-pegular {
content: 'Pretendard-Regular';
  font-family: 'Pretendard-Regular', serif;
}

.ql-font-d2coding {
  content: 'D2Coding';
    font-family: 'D2Coding', sans-serif;
}

`
export const textTitle = css`
    font-weight: 700;
    font-size: 20px;
    padding: 10px;
`;

export const buttonBox = css`
    display: flex;
    justify-content: space-around; // 버튼들 사이의 간격을 균등하게 배치
    margin-top: 20px;
    padding: 10px;
`;

// 개별 버튼 스타일
export const buttonStyle = css`
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color: #3498db; // 기본 파란색 배경
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    font-family: 'NEXON Lv1 Gothic OTF';
    &:hover {
        background-color: #2980b9; // 호버 시 색상 변경
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.5); // 포커스 시 테두리 강조
    }
`;
export const backButtonStyle = css`
    background-color: #95a5a6; // 돌아가기 버튼 회색 배경

    &:hover {
        background-color: #7f8c8d;
    }
`;
export const container = css`

    box-sizing: border-box;
    width: 700px;
    height: auto;
    font-size: 20px;
    white-space: break-word ;


`;

export const content = css`
     img {
    max-width: 100%;  // Ensures that the image does not exceed the container width
    height: auto;     // Maintains the aspect ratio of the image
    display: block;   // Removes extra space below the image
    margin: 0 auto;   // Centers the image horizontally within its container
  }
.ql-font-nexon-gothic-otf {
  content: 'NEXON Lv1 Gothic OTF';
  font-family: 'NEXON Lv1 Gothic OTF', sans-serif;
}

.ql-font-ridibatang {
  font-family: 'RIDIBatang', serif;
}

.ql-font-pretendard-regular {
content: 'Pretendard-Regular';
  font-family: 'Pretendard-Regular', serif;
}

.ql-font-d2coding {
content: 'D2Coding';
  font-family: 'D2Coding', sans-serif;
}

    @font-face {
  font-family: 'NEXON Lv1 Gothic OTF';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON%20Lv1%20Gothic%20OTF') format('woff');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'RIDIBatang';
  src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/RIDIBatang') format('woff');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Pretendard-Regular';
  src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'D2Coding';
  src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_three@1.0/D2Coding.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
`;