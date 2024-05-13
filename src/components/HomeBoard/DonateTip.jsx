/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import * as s from "./style";
import { useMutation, useQueryClient } from 'react-query';
import { submitDonationData } from "../../apis/api/DonationAPI";
import { Link, useSearchParams } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import axios from 'axios';


function DonateTip({ setShowModal }) {
    const [searchParams] = useSearchParams();
    const [money, setMoney] = useState(0)
    const [message, setMessage] = useState("");
    const [checked, setChecked] = useState(false);
    const [userId, setUserId] = useState();
    const inputRef = useRef(0);
    const checkHandled = (checked) => {
        setChecked(checked);
    }
    return (
        <>
            <div css={s.header}>
                <button css={s.button} onClick={() => setShowModal(false)}><GrClose /></button>
                <div css={s.header1}>기부를 하는 팁</div>
                <div>
                    <div css={s.div1}>
                        <p>
                        
⭐️  같이가치 모금 제안 꿀팁 ⭐️ <br /><br />

1. <strong>모금함 제목 짓기</strong><br />

   모금함 제안하기의 첫 시작 '모금함 제목'!<br /><br />



2. <strong>모금함 이미지로 좋은 인상 주기</strong><br />

   모금함 내용을 잘 전달하기 위해 사용하는 '이미지'!<br /><br />



3. <strong>휴대폰으로 사진 잘 찍는 법</strong><br />

   비싼 카메라를 사용해야만 좋은 사진이 나올까요? 내 휴대폰 사진으로도 충분히 좋은 사진을 찍을 수 있어요! <br /><br />



4. <strong>모금 스토리 쓰기</strong><br />

   평소 사업계획서 작성은 좀 해보았는데, 온라인 모금 콘텐츠 작성은 어려우시다고요? 핵심만 알려드립니다.




                        </p>
                    </div>
                </div>
            
                
                <div css={s.div0}>
                <Link to="/main" css={s.button2}>기부 목록 구경하기</Link>                
                </div>
            </div>
        </>
    );
}

export default DonateTip;