/** @jsxImportSource @emotion/react */
import { useMutation, useQueryClient } from "react-query";
import * as s from "./style";
import { useEffect, useState } from "react";
import { useInput } from "../../hooks/useInput";
import AuthPageInput from "../../components/AuthPageInput/AuthPageInput";
import { passwordEditData } from "../../apis/api/donatorApi";

function PasswordEditPage(props) {
    const [oldPassword, handleOldPassword, oldMessage, setOldMessage] = useInput("oldPassword");
    const [newPassword, handleNewPassword, newMessage, setNewMessage] = useInput("newPassword");
    const [newPasswordCheck, handleNewPasswordCheck, newCheckMessage, setNewCheckMessage] = useInput("newPasswordCheck");
    const [checkPasswordMessage, setCheckPasswordMessage] = useState("");
    const [checkPassword, checkPasswordChange] = useInput("checkPassword");
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");


    const editPasswordMutation = useMutation({
        mutationKey: "editMutation",
        mutationFn: passwordEditData,
        onSuccess: response => {
            console.log(response);
            alert("정상적으로 변경하였습니다.\n다시 로그인 하세요.");
            localStorage.removeItem("AccessToken");
            // window.location.replace("/auth/signin");
        },
        onError: error => {
            if (error.response.status === 400) {
                const errorMap = error.response.data;
                const errorEntries = Object.entries(errorMap);
                setOldMessage(null);
                setNewMessage(null);
                setNewCheckMessage(null);
                let errorMessage = "";
                for (let [k, v] of errorEntries) {
                    const message = {
                        type: "error",
                        text: v
                    }
                    errorMessage += v ;
                    if (k === "oldPassword") {
                        setOldMessage(() => message);
                    }                                               
                    if (k === "newPassword") {
                        setNewMessage(() => message);
                    }
                    if (k === "newPasswordCheck") {
                        setNewCheckMessage(() => message);
                    }
                }
                alert(errorMessage);
            }
        }
    });

    useEffect(() => {
        if (!newPassword || !newPasswordCheck) {
            setCheckPasswordMessage(() => null);
            return;
        }

        if (newPasswordCheck === newPassword) {
            setCheckPasswordMessage(() => {
                return {
                    type: "success",
                    text: ""
                };
            });
        } else {
            setCheckPasswordMessage(() => {
                return {
                    type: "error",
                    text: "비밀번호가 일치하지 않습니다."
                };
            });
        }
    }, [checkPassword, newPassword]);

    const handleEditSubmitClick = () => {
        const checkFlags = [
            oldMessage?.type,
            newMessage?.type,
            newCheckMessage?.type,
        ];

        const errorMessages = [];
        if (checkFlags.includes("error") || checkFlags.includes(undefined) || checkFlags.includes(null)) {
            if (oldMessage?.type === "error") {
                errorMessages.push("기존 비밀번호를 확인하세요.");
            }
            if (newMessage?.type === "error") {
                errorMessages.push("새로운 비밀번호를 확인하세요.");
            }
            if (newCheckMessage?.type === "error") {
                errorMessages.push("비밀번호 확인을 다시 해주세요.");
            }
            alert(                                                                                                                                                                                    )
            return;
        }

        editPasswordMutation.mutate({
            userId: principalData?.data.userId,
            username: principalData?.data.username,
            oldPassword:oldPassword,
            newPassword:newPassword,
            newPasswordCheck:newPasswordCheck
        });
    }
    return (
        <div css={s.div2}>
            <label htmlFor={"password"}>비밀번호</label>
            <div css={s.div3}>
                <AuthPageInput css={s.input2} type={"password"} id={oldPassword} onChange={handleOldPassword} placeholder={"현재 비밀번호를 입력하세요."} message={oldMessage} />
                <AuthPageInput css={s.input2} type={"password"} id={newPassword} onChange={handleNewPassword} placeholder={"새로운 비밀번호를 입력하세요."} message={newMessage} />
                <AuthPageInput css={s.input2} type={"password"} id={newPasswordCheck} onChange={handleNewPasswordCheck} placeholder={"새로운 비밀번호를 확인하세요."} message={newCheckMessage} />
            </div>
            <div>
                <button css={s.button} type="submit" onClick={handleEditSubmitClick}>저장하기</button>
            </div>
        </div>
    );
}

export default PasswordEditPage;