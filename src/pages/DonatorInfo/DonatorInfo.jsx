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

    const handleDonationSubmit = () => {
        if (!window.IMP) {
            alert("결제 모듈이 로드되지 않았습니다.");
            return;
        }
        window.IMP.init("imp18384567"); // 가맹점 식별코드로 변경하세요.
        window.IMP.request_pay({
            pg: 'kakaopay', // 변경 가능
            pay_method: 'card',
            merchant_uid: 'merchant_' + new Date().getTime(),
            name: '기부금',
            amount: money,
            buyer_email: principalData?.data?.email,
            buyer_name: principalData?.data?.name,
        }, (response) => {
            if (response.success) {
                donationSubmitMutation.mutate({
                    userId: principalData?.data?.userId,
                    donationPageId: searchParams.get("page"),
                    amount: money,
                    message: message,
                    anonymous: checked
                });
            } else {
                alert(`결제 실패: ${response.error_msg}`);
            }
        });
    };

    // 아임포트 모듈
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <>
        <div css={s.modalBackground}>
            <div css={s.modalBox}>
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
            </div>
        </>
    );
}

export default DonatorInfo;