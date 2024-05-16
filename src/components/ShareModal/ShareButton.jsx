import React, { useState } from 'react';
import ShareModal from './ShareModal';
import { FiShare2 } from 'react-icons/fi'; // FiShare2 아이콘 사용
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
const shareButtonStyle = css`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  color: #666; // 버튼 색상
  font-size: 16px;
  &:hover {
    color: #000; // 마우스 오버 색상
  }
  svg {
    margin-right: 8px; // 아이콘과 텍스트 사이 간격
  }
`;
export const ShareButton = ( { donationPage } ) => {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log("111"+donationPage)
  return (
    <>
     <button css={shareButtonStyle} onClick={handleOpen}>
        <FiShare2 size={20} />
      </button>
      <ShareModal donationPage={donationPage} isOpen={isOpen} onClose={handleClose} />
    </>
  );
};

export default ShareButton;
