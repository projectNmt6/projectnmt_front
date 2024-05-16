import { css } from '@emotion/react';

import kakaoIcon from './icon/free-icon-kakao-talk-4494622.png';
import linkIcon from './icon/free-icon-link-8265293.png';
export const modalBackground = css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
`;

export const modalContainer = css`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 200px;
    text-align: center;
`;

export const header = css`
    margin-bottom: 20px;
`;

export const body = css`
    margin-bottom: 20px;
`;

export const button = css`
background: none;
    border: none;
    cursor: pointer;
    top: 10px; /* 상단에서 10px 위치 */
    right: 10px; /* 오른쪽에서 10px 위치 */
    display: flex;
    align-items: center;
    padding: 10px;
    color: #202020; /* 아이콘과 텍스트 색상 */
    opacity: 0.7; /* 투명도 설정 */

    svg {
        width: 14px; /* SVG 아이콘 크기 */
        height: 14px;
        margin-right: 5px; /* 아이콘과 텍스트 사이 간격 */
    }

    &:hover {
        opacity: 1; /* 마우스 오버시 투명도 변경 */
    }
`;

export const headerTitle = css`
    font-size: 18px;
    color: #333;
`;

export const loginButton = css`
        /* 확인 버튼 스타일 */
        background-color: #007BFF;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
`;
export const kakaobutton = css`
  /* 카카오 버튼 스타일 */
  background-image: url(${kakaoIcon});
  background-size: cover;
  width: 35px; /* 원형 버튼 크기 설정 */
  height: 35px; /* 원형 버튼 크기 설정 */
  border-radius: 50%; /* 동그란 모양으로 설정 */
  border: none;
  cursor: pointer;
  margin: 10px;
`;
export const linkbutton = css`
  /* 카카오 버튼 스타일 */
  background-image: url(${linkIcon});
  background-size: cover;
  width: 35px; /* 원형 버튼 크기 설정 */
  height: 35px; /* 원형 버튼 크기 설정 */
  border-radius: 50%; /* 동그란 모양으로 설정 */
  border: none;
  cursor: pointer;
  margin: 10px;
`;


export const closeButton = css`
 background-color: gray;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 10px; /* 오른쪽 여백 추가 */
`;
