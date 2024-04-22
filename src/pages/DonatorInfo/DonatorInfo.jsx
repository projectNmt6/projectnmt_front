/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import * as s from "./style";
import { useMutation, useQueryClient } from 'react-query';
import { submitDonationData } from "../../apis/api/DonationAPI";
import { useSearchParams } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import axios from 'axios';


function DonatorInfo({ setShowModal }) {
    const [searchParams] = useSearchParams();
    const [money, setMoney] = useState(0)
    const [message, setMessage] = useState("");
    const [checked, setChecked] = useState(false);
    const [userId, setUserId] = useState();
    const inputRef = useRef(0);

    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");
    const donationSubmitMutation = useMutation({
        mutationKey: "donationSubmitMutation",
        mutationFn: submitDonationData,
        onSuccess: response => {
            console.log(response);
            alert("완료하였습니다.");
        },
        onError: error => { }
    })

    const handlemoneyChange = (e) => {
        setMoney(e.target.value)
    }

    const handleMessegeChange = (e) => {
        setMessage(e.target.value)
    }


    const handleButtonClick = (amount) => {
        if (amount === 0) {
            setMoney(0);
            inputRef.current.focus()
        } else {
            setMoney(Money => Money + amount
            );
        }
    };

    const checkHandled = (checked) => {
        setChecked(checked);
    }

    const handleDonationSubmit = (e) => {
        const data = {
            amount: money,
            message: message,
            anonymous: checked,
            donationPageId: searchParams.get("page"),
            userId: principalData?.data.userId
        }
        console.log(data);
        donationSubmitMutation.mutate(data);
        setShowModal(() => false)
    }


    return (
        <>
            <div css={s.header}>
                <button css={s.button} onClick={() => setShowModal(false)}><GrClose /></button>
                <div css={s.header1}>기부하기</div>
                <div>
                    <div css={s.div1}>
                        <input css={s.input} type="text" id="" value={money} ref={inputRef} onChange={handlemoneyChange} />원
                    </div>
                    <div css={s.div2}>
                        <button css={s.button1} onClick={() => handleButtonClick(5000)}>5천원</button>
                        <button css={s.button1} onClick={() => handleButtonClick(10000)}>1만원</button>
                        <button css={s.button1} onClick={() => handleButtonClick(30000)}>3만원</button>
                        <button css={s.button1} onClick={() => handleButtonClick(50000)}>5만원</button>
                        <button css={s.button1} onClick={() => handleButtonClick(100000)}>10만원</button>
                        <button css={s.button1} onClick={() => handleButtonClick(500000)}>50만원</button>
                        <button css={s.button1} onClick={() => handleButtonClick(1000000)}>100만원</button>
                        <button css={s.button1} onClick={() => handleButtonClick(0)}>직접입력</button>
                    </div>
                </div>
                <div css={s.div3}>
                    <input
                        css={s.input1}
                        type="textarea"
                        id=""
                        value={message}
                        placeholder="응원하는 따뜻한 한마디를 남겨주세요!."
                        onChange={handleMessegeChange} />
                </div>
                <div css={s.div4}>
                    <div css={s.div5}>
                    익명으로 기부하기
                    </div>
                    <input
                        css={s.input2}
                        type="checkbox"
                        id=""
                        checked={checked}
                        onChange={(e) => checkHandled(e.target.checked)} />
                </div>
                <div css={s.div}>
                <button css={s.button2} onClick={handleDonationSubmit}>기부하기</button>
                </div>
            </div>
        </>
    );
}

export default DonatorInfo;