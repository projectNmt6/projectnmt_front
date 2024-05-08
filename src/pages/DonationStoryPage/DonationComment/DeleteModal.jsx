/** @jsxImportSource @emotion/react */
import * as s from "./style";

const DeleteModal = ({ onClose, onConfirm }) => {
    return (
      <div css={s.modalStyle}>
        <p>정말 삭제하시겠습니까?</p>
        <button onClick={onConfirm}>삭제하기</button>
        <button onClick={onClose}>취소</button>
      </div>
    );
};
  
export default DeleteModal;
