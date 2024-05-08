import { css } from "@emotion/react"

export const DonatorBox = css`
    display: flex;
    border: 1px solid #222222;
`;

export const container = css`

    box-sizing: border-box;
    width: 700px;
    height: auto;
    font-size: 20px;
    white-space: break-word ;


`;

export const content = css`
    
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