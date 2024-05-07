/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { GrClose } from 'react-icons/gr';
import * as s from "./style";
import kakaoIcon from './icon/free-icon-kakao-talk-4494622.png';
import { shareKakao } from '../../apis/utils/shareKakaoLink';

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
          <button css={s.kakaobutton} onClick={handleKakaoShare}></button>
          <button css={s.linkbutton} onClick={handleCopyLink}></button>
          <button css={s.loginButton} onClick={handleNaverShare}>네이버 공유하기</button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
