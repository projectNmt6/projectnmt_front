/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useRef, useState } from "react";
import { useInput } from "../../hooks/useInput";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { signupRequest } from "../../apis/api/SignUp";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 as uuid } from 'uuid';
import { storage } from "../../apis/filrebase/config/firebaseConfig";
import AuthPageInput from "../../components/AuthPageInput/AuthPageInput";
import {FirebaseDeleter} from "../../components/FirebaseDeleter/FirebaseDeleter"
import introImg2 from '../../assets/introImg2.jpeg';
import profileimg from "../../assets/profileimg.png";

function SignUpPage(props) {
    const navigate = useNavigate();
    const [username, userNameChange, usernameMessage, setUsernameValue, setUsernameMessage] = useInput("username");
    const [checkPassword, checkPasswordChange] = useInput("checkPassword");
    const [password, passwordChange, passwordMessage] = useInput("password");
    const [name, nameChange, nameMessage] = useInput("name");
    const [phoneNumber, phoneNumberChange, phoneNumberMessage] = useInput("phoneNumber");
    const [email, emailChange, emailMessage] = useInput("email");
    const [gender, setGender] = useState("");
    const [age, ageChange] = useInput("age");
    const [checkPasswordMessage, setCheckPasswordMessage] = useState("");
    const [profileImg, setProfileImg] = useState(profileimg);//기본이미지 필요
    const imgFileRef = useRef();

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

    useEffect(() => {
        if (!checkPassword || !password) {
            setCheckPasswordMessage(() => null);
            return;
        }

        if (checkPassword === password) {
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
    }, [checkPassword, password]);

    const handleGenderChange = (selectedOption) => {
        setGender(selectedOption.value);
    };

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
        const storageRef = ref(storage, `projectnmt/profile/img/${uuid()}_${files[0].name}`);
        const uploadTask = uploadBytesResumable(storageRef, files[0]);

        uploadTask.on(
            "state_changed",
            Snapshot => { },
            error => { },
            () => {
                alert("업로드를 완료하셨습니다.");
                getDownloadURL(storageRef)
                    .then(url => {
                        if(profileImg.length > 0) {
                            FirebaseDeleter(profileImg);
                        }
                        setProfileImg(() => url);
                    });
            }
        );
    };
    const handleSubmitClick = () => {
        const checkFlags = [
            usernameMessage?.type,
            passwordMessage?.type,
            nameMessage?.type,
            phoneNumberMessage?.type,
            emailMessage?.type
        ];

        if (checkFlags.includes("error") || checkFlags.includes(undefined) || checkFlags.includes(null)) {
            alert("가입 정보를 다시 확인하세요.");
            return;
        }

        signupRequest({
            username,
            password,
            checkPassword,
            name,
            phoneNumber,
            email,
            age,
            gender,
            profileImg
        }).then(response => {
            console.log(response);
            if (response.status === 201) {
                navigate("/auth/signin");
            }
        }).catch(error => {
            if (error.response.status === 400) {
                const errorMap = error.response.data;
                const errorEntries = Object.entries(errorMap);
                for (let [k, v] of errorEntries) {
                    if (k === "username") {
                        setUsernameMessage(() => {
                            return {
                                type: "error",
                                text: v
                            }
                        })
                    }
                }
            } else {
                alert("회원가입 오류");
            }
        });
    }

    return (
        <div css={s.container}>
            <div css={s.header}>
                <h1>회원가입</h1>
            </div>
            <div css={s.imgBox} onClick={() => imgFileRef.current.click()}>
                <input type="file" style={{ display: "none" }} ref={imgFileRef} multiple={true} onChange={handleImgFileChange} />
                <img src={profileImg} alt="" />
            </div>
            <div css={s.div}>
                <div css={s.div4}>
                    <label htmlFor={username}>사용자 ID</label>
                    <AuthPageInput type={"text"} name={"username"} value={username} onChange={userNameChange} message={usernameMessage} />
                </div>
                <div css={s.div2}>
                    <label htmlFor={password}>비밀번호</label>
                    <div css={s.div3}>
                        <AuthPageInput type={"password"} name={"password"} placeholder={"비밀번호"} value={password} onChange={passwordChange} message={passwordMessage} />
                        <AuthPageInput type={"password"} name={"checkPassword"} placeholder={"비밀번호 확인"} value={checkPassword} onChange={checkPasswordChange} message={checkPasswordMessage} />
                    </div>
                </div>
                <div css={s.div4}>
                    <label htmlFor={name}>닉네임</label>
                    <AuthPageInput type={"text"} name={"name"} value={name} onChange={nameChange} message={nameMessage} />
                </div>
                <div css={s.div4}>
                    <label htmlFor={phoneNumber}>전화번호</label>
                    <AuthPageInput type={"text"} name={"phoneNumber"} value={phoneNumber} onChange={phoneNumberChange} message={phoneNumberMessage} />
                </div>
                <div css={s.div4}>
                    <label htmlFor={email}>이메일</label>
                    <AuthPageInput type={"text"} name={"email"} value={email} onChange={emailChange} message={emailMessage} />
                </div>
                <div css={s.div4}>
                    <label htmlFor={gender}>성별</label>
                    <Select
                        css={s.select}
                        placeholder=""
                        options={genderOption}
                        value={gender}
                        onChange={handleGenderChange}
                    />
                </div>
                <div css={s.div4}>
                    <label htmlFor={age}>생년월일</label>
                    <input css={s.input} type={"date"} name={"age"} value={age} onChange={ageChange} />
                </div>
                <div>
                    <button css={s.button} onClick={handleSubmitClick}>가입하기</button>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;