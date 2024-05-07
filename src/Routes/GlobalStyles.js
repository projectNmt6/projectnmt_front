import { css } from "@emotion/react";


export const GlobalStyles = css`
    display: flex;
    justify-content: space-around;
    width: 100%; 

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
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv1 Gothic OTF.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
  font-family: 'RIDIBatang';
  src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/RIDIBatang.woff') format('woff');
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
.challenge-story-container {
    font-family: 'NEXON Lv1 Gothic OTF', 'RIDIBatang', 'Pretendard-Regular', 'D2Coding',sans-serif;
}
body, html {
  font-family: 'NEXON Lv1 Gothic OTF', 'RIDIBatang', 'Pretendard-Regular', 'D2Coding',sans-serif; /* 기본 글꼴 설정 */
}
`;
