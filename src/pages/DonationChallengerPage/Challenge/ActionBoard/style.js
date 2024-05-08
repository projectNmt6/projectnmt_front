import { css } from '@emotion/react';

export const actionBoardContainer = css`
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    grid-auto-rows: auto;
    grid-gap: 20px;
    grid-auto-flow: dense;
`;

export const actionItem = css`
    margin-bottom: 20px; // 아이템 간 간격
`;

export const actionImage = css`
    width: 340px;
    height: auto;
    object-fit: contain;
`;
