/** @jsxImportSource @emotion/react */
import * as s from "./style";

const DeleteModal = ({ onClose, onConfirmDelete, onConfirmReport, isCommentOwner }) => {
    return (
        <div css={s.modalStyle}>
            <p>{isCommentOwner ? "정말 삭제하시겠습니까?" : "이 댓글을 신고하시겠습니까?"}</p>
            {isCommentOwner ? (
                <button onClick={onConfirmDelete}>삭제하기</button>
            ) : (
                <button onClick={onConfirmReport}>신고하기</button>
            )}
            <button onClick={onClose}>취소</button>
        </div>
    );
};
  
export default DeleteModal;
