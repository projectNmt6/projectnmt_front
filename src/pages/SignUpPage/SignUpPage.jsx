/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useRef, useState } from "react";
import { useInput } from "../../hooks/useInput";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { signupRequest } from "../../apis/api/SignUp";


function SignUpPage(props) {    
    const navigate = useNavigate();

    const [ username, userNameChange, usernameMessage, setUsernameValue, setUsernameMessage ] = useInput("username");
    const [ checkPassword, checkPasswordChange ] = useInput("checkPassword");
    const [ password, passwordChange, passwordMessage ] = useInput("password");
    const [ nickname, nicknameChange, nicknameMessage ] = useInput("name");
    const [ phoneNumber, phoneNumberChange, phoneNumberMessage ] = useInput("phoneNumber");
    const [ email, emailChange, emailMessage ] = useInput("email");
    const [ selectGender, setSelectGender ] = useState("");
    const [ age, ageChange, ageMessage ] = useInput("age");
    const [ checkPasswordMessage, setCheckPasswordMessage ] = useState("");
    const [ imgUrl , setImgUrl ] = useState("");
    const imgFileRef = useRef();

    const genderOption = [{
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
    ]

    useEffect(() => {
        if(!checkPassword || !password) {
            setCheckPasswordMessage(() => null);
            return;
        }

        if(checkPassword === password) {
            setCheckPasswordMessage(() => {
                return {
                    type: "success",
                    text: ""
                }
            })
        } else {
            setCheckPasswordMessage(() => {
                return {
                    type: "error",
                    text: "비밀번호가 일치하지 않습니다."
                }
            })
        }
    }, [checkPassword, password]);

    const handleGenderChange = (selectedOption) => {
        setSelectGender(selectedOption.value); 
    };

    const handleImgFileChange = (e) => {
        const fileReader = new FileReader();
        if(e.target.files.length === 0) {
            return;
        }
        fileReader.onload = (e) => {
            setImgUrl(e.target.result);
        };
       fileReader.readAsDataURL(e.target.files[0]);
    }

    const handleSubmitClick = () => {
        const checkFlags = [
            usernameMessage?.type,
            passwordMessage?.type,
            nicknameMessage?.type,
            phoneNumberMessage?.type,
            emailMessage?.type
        ];

        if(checkFlags.includes("error") || checkFlags.includes(undefined) || checkFlags.includes(null)) {
            console.log(checkFlags);
            alert("가입 정보를 다시 확인하세요.");
            return;
        }
            signupRequest({
                username,
                password,
                checkPassword,
                nickname,
                phoneNumber,
                email,
                selectGender,
                imgUrl
            }).then(response => {
                console.log(response);
                if(response.status === 201){
                    navigate("/auth/signin");
                }
            }).catch(error => {
                if(error.response.status === 400) {
                    const errorMap = error.response.data;
                    const errorEntries = Object.entries(errorMap);
                    for(let [ k, v ] of errorEntries) {
                        if(k === "username") {
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
        <>
            <div css={s.header}>
                <h1>회원가입</h1>
                <button onClick={handleSubmitClick}>가입하기</button>
            </div>
                <input type={"text"} name={"username"} placeholder={"사용자 ID"} value={username} onChange={userNameChange} message={usernameMessage} />
                <input type={"password"} name={"password"} placeholder={"비밀번호"} value={password} onChange={passwordChange} message={passwordMessage} />
                <input type={"password"} name={"checkPassword"} placeholder={"비밀번호 확인"} value={checkPassword} onChange={checkPasswordChange} message={checkPasswordMessage} />
                <input type={"text"} name={"nickname"} placeholder={"닉네임"} value={nickname} onChange={nicknameChange} message={nicknameMessage} />
                <input type={"text"} name={"phoneNumber"} placeholder={"전화번호"} value={phoneNumber} onChange={phoneNumberChange} message={phoneNumberMessage} />
                <input type={"text"} name={"email"} placeholder={"이메일"} value={email} onChange={emailChange} message={emailMessage} />
                <Select 
                    options={genderOption}
                    value={{ value: selectGender, label: selectGender }}
                    onChange={handleGenderChange}
                />
                <input type={"text"} name={"age"} placeholder={"age"} value={age} onChange={ageChange} message={ageMessage} />
            <div css={s.imgBox} onClick={() => imgFileRef.current.click()}>
                <input type="file" style={{display : "none"}} ref={imgFileRef} multiple={true} onChange={handleImgFileChange}/>
                <img src={imgUrl} alt="" />
            </div>           
        </>
    );
}

export default SignUpPage;