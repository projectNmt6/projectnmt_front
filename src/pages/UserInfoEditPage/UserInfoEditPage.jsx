/** @jsxImportSource @emotion/react */
import { useRef, useState } from "react";
import * as s from "./style";
import Select from "react-select";
import { useInput } from "../../hooks/useInput";
import { useMutation, useQueryClient } from 'react-query';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from 'uuid';
import { storage } from "../../apis/filrebase/config/firebaseConfig";
import { submitDonatorEditData } from "../../apis/api/DonatorApi";
import AuthPageInput from "../../components/AuthPageInput/AuthPageInput";
import { Link, useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
function UserInfoEditPage(props) {
    // useAuthCheck();
    const [name, handleNewName] = useInput();
    const [email, handleNewEmail] = useInput();
    const [age, handleNewAge] = useInput();
    const [gender, setGender] = useState();
    const [phonenumber, handlePhoneNumber] = useInput();
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");
    const imgFileRef = useRef();
    const [profileImg, setProfileImg] = useState("https://t1.kakaocdn.net/together_image/common/avatar/avatar05.png");

    const editMutation = useMutation({
        mutationKey: "editMutation",
        mutationFn: submitDonatorEditData,
        onSuccess: response => {
            console.log(response);
            alert("정상적으로 변경하였습니다.");
            window.location.replace("/account/mypage");
        },
        onError: error => {
            if (error.response.status === 400) {
                const errorMap = error.response.data;
                const errorEntries = Object.entries(errorMap);
            }
        }
    });

    const handleImgFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) {
            e.target.value = "";
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            setProfileImg(e.target.result);
        };
        fileReader.readAsDataURL(e.target.files[0]);

        const storageRef = ref(storage, `library/book/cover/${uuid()}_${files[0].name}`);
        const uploadTask = uploadBytesResumable(storageRef, files[0]);

        uploadTask.on(
            "state_changed",
            Snapshot => { },
            error => { },
            () => {
                alert("업로드를 완료하셨습니다.");
                getDownloadURL(storageRef)
                    .then(url => {
                        setProfileImg(() => url);
                    });
            }
        );
    };

    const handleEditSubmitClick = () => {
        console.log(principalData.data);
        editMutation.mutate({
            userId: principalData?.data.userId,
            username: principalData?.data.username,
            name,
            email,
            age,
            gender,
            phonenumber,
            profileImg
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
            <div css={s.header}>
                <h1>회원 정보 수정</h1>
                <div css={s.imgBox} onClick={() => imgFileRef.current.click()}>
                    <input type="file" style={{ display: "none" }} ref={imgFileRef} multiple={true} onChange={handleImgFileChange} />
                    <div css={s.imgOverlay}>
                        <img src={profileImg} alt="" />
                        <div css={s.cameraIcon}><FaCamera /></div>
                    </div>
                </div>
                <div css={s.div}>
                    <div css={s.div1}>
                        <label htmlFor={name}>닉네임</label>
                        <AuthPageInput css={s.input} type="text" id={name} onChange={handleNewName} required />
                    </div>
                    <div css={s.div1}>
                        <label htmlFor={email}>이메일</label>
                        <AuthPageInput css={s.input3} type="email" id={email} onChange={handleNewEmail} required />
                    </div>
                    <div css={s.div1}>
                        <label htmlFor={age}>나이</label>
                        <AuthPageInput css={s.input3} type="date" id={age} onChange={handleNewAge} required />
                    </div>
                    <div css={s.div1}>
                        <label htmlFor="gender">성별</label>
                        <Select
                            css={s.select}
                            options={genderOption}
                            value={{ value: setGender, label: gender }}
                            onChange={handleGenderChange}
                        />
                    </div>
                    <div css={s.div1}>
                        <label htmlFor={phonenumber}>전화번호</label>
                        <AuthPageInput css={s.input3} type="text" id={phonenumber} onChange={handlePhoneNumber} required />
                    </div>
                </div>
                <div>
                    <button css={s.button} type="submit" onClick={handleEditSubmitClick}>저장하기</button>
                    <div css={s.backButton}>
                        <Link to="/account/mypage" css={s.link}>돌아가기</Link>
                    </div>

                </div>
            </div>
        </>
    );
}

export default UserInfoEditPage;