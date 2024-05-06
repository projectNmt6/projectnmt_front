/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { GrClose } from 'react-icons/gr';
import * as s from "./style";

const ShareModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleKakaoShare = () => {
    console.log("카카오톡 공유");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("링크가 복사되었습니다.");
  };

  const handleNaverShare = () => {
    console.log("네이버 공유");
  };

  return (
    <div css={s.modalBackground}>
      <div css={s.modalContainer}>
        <div css={s.header}>
          <button css={s.button} onClick={onClose}><GrClose /></button>
        </div>
        <div css={s.body}>
          <button css={s.loginButton} onClick={handleKakaoShare}>카카오톡 공유하기</button>
          <button css={s.loginButton} onClick={handleCopyLink}>링크 복사하기</button>
          <button css={s.loginButton} onClick={handleNaverShare}>네이버 공유하기</button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
