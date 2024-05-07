import { css } from '@emotion/react';

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
`;

export const modalContainer = css`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 300px;
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

export const closeButton = css`
 background-color: gray;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 10px; /* 오른쪽 여백 추가 */
`;
