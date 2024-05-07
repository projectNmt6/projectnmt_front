import { css } from "@emotion/react";


export const GlobalStyles = css`
    display: flex;
    justify-content: space-around;
    width: 100%; 
    background-color: aqua;
    
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
    font-family: 'BMYEONSUNG';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMYEONSUNG.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
.challenge-story-container {
    font-family: 'NEXON Lv1 Gothic OTF', 'RIDIBatang', 'BMYEONSUNG', sans-serif;
}
body, html {
  font-family: 'NEXON Lv1 Gothic OTF', 'RIDIBatang', 'BMYEONSUNG', sans-serif; /* 기본 글꼴 설정 */
}
    
`;
