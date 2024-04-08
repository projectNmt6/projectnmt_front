/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./style";
import Select from "react-select";
import { useInput } from "../../hooks/useInput";
import { useMutation } from 'react-query';
import { useAuthCheck } from "../../hooks/useAuthCheck";
import { submitDonatorEditData } from "../../apis/api/donatorApi";

function UserInfoEditPage(props) {
    // useAuthCheck();
    const [ gender, setGender ] = useState(); 
    const [ oldPassword, handleOldPassword, oldMessage, setOld, setOldMessage ] = useInput("oldPassword");
    const [ newPassword, handleNewPassword, newMessage, setNew, setNewMessage ] = useInput("newPassword");
    const [ newPasswordCheck, handleNewPasswordCheck, newCheckMessage, setNewCheck, setNewCheckMessage ] = useInput("newPasswordCheck");

    const editMutation = useMutation({
        mutationKey: "editMutation",
        mutationFn: submitDonatorEditData,
        onSuccess: response => {
            alert("비밀번호를 정상적으로 변경하였습니다.\n다시 로그인 하세요.");
            localStorage.removeItem("AccessToken");
            // window.location.replace("/auth/signin");
        },
        onError: error => {
            if(error.response.status === 400) {
                const errorMap = error.response.data;
                const errorEntries = Object.entries(errorMap);
                setOldMessage(null);
                setNewMessage(null);
                setNewCheckMessage(null);
                for(let [ k, v ] of errorEntries) {
                    const message = {
                        type: "error",
                        text: v
                    }
                    if(k === "oldPassword") {
                        setOldMessage(() => message);
                    }
                    if(k === "newPassword") {
                        setNewMessage(() => message);
                    }
                    if(k === "newPasswordCheck") {
                        setNewCheckMessage(() => message);
                    }
                }
            }
        }
    });
    
    const handleEditSubmitClick = () => {
        editMutation.mutate({
            oldPassword,
            newPassword,
            newPasswordCheck
        });
    } 
    const genderOption = [
        {
            value: "male",
            label: "남성"
        },
        {
            value: "female",
            label: "여성"
        },
        {
            value: "none",
            label: "선택안함"
        },
    ];

    const handleGenderChange = (selectedOption) => {
        setGender(selectedOption.value);
    };



    return (
        <>
        <title>회원 정보 수정</title>
        <div>
            <label for="name">닉네임:</label>
            <input type="text" id="name" name="name" required />
        </div>  
        <div>
            <label for="email">이메일:</label>
            <input type="email" id="email" name="email" required />
        </div> 
        <div>
            <label for="password">비밀번호:</label>
            <input type={"password"} id={oldPassword} onChange={handleOldPassword} placeholder={"현재 비밀번호를 입력하세요."} message={oldMessage}/>
            <input type={"password"} id={newPassword} onChange={handleNewPassword} placeholder={"새로운 비밀번호를 입력하세요."} message={newMessage}/>
            <input type={"password"} id={newPasswordCheck} onChange={handleNewPasswordCheck} placeholder={"새로운 비밀번호를 확인하세요."} message={newCheckMessage}/>
        </div> 
        <div>
            <label for="birthdate">생년월일:</label>
            <input type="date" id="birthdate" name="birthdate" required />
        </div> 
        <div>
            <label for="gender">성별:</label>
            <Select 
                options={genderOption}
                value={{ value: setGender, label: gender }}
                onChange={handleGenderChange}
            />
        </div>
        <div>
            <label for="phone">전화번호:</label>
            <input type="tel" id="phone" name="phone" />
        </div>
        <div>
            <button type="submit" onClick={handleEditSubmitClick}>제출하기</button>
        </div>    
        
        </>
    );
}

export default UserInfoEditPage;