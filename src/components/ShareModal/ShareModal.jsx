/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { GrClose } from 'react-icons/gr';
import * as s from "./style";
import kakaoIcon from './icon/free-icon-kakao-talk-4494622.png';
import { shareKakao } from '../../apis/utils/shareKakaoLink';

const ShareModal = ({ isOpen, onClose, donationPage, donationPageId }) => {
  if (!isOpen) return null;

  // 카카오톡 공유 버튼 클릭 이벤트 핸들러
  const handleShareKakao = () => {
    const route = window.location.href; // 현재 페이지 URL
    const title = donationPage?.storyTitle; // 기부 스토리 제목
    const THU = donationPage?.mainImgUrl; // 메인 이미지 URL
    const content = "펀펀하게 펀딩하러 가기!"; // 공유할 컨텐츠 설명
    const page = donationPageId; // 기부 페이지 ID

    shareKakao(route, title, THU, content, page);
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
          <button css={s.kakaobutton} onClick={handleShareKakao}></button>
          <button css={s.linkbutton} onClick={handleCopyLink}></button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;