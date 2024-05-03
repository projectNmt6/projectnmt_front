/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { css } from "@emotion/react";
import React, { useEffect, useMemo, useState, useRef } from 'react';
import ReactQuill from "react-quill";
import Select from "react-select";
import { v4 as uuid } from "uuid";
import { storage } from '../../apis/filrebase/config/firebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { registerTeam } from '../../apis/api/teamApi';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import teamdefault from "../../assets/profileimg.png";
import { div } from "../MyPage/style";
import { container } from "../../Routes/style";

const textEditorLayout = css`
    overflow-y: hidden;
    margin-bottom: 20px;
    overflow-x: hidden;
`;

const header = css`
    & > div{
        max-width: 300px;
        margin-bottom: 20px;
    }
`
const imgBox = css`
    border: 1px solid #dbdbdb;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    overflow: hidden;
    & > img {
        z-index: 1;
        height: 100%;
    }
`
function TeamCreatePage(props) {
    const [isCompany, setIsCompany] = useState(true);
    const [teamTypeCategory, setTeamTypeCategory] = useState();
    const [teamName, setTeamName] = useState();
    const [teamPhoneNumber, setTeamPhoneNumber] = useState();
    const [teamEmail, setTeamEmail] = useState();
    const [companyRegisterNumber, setCompanyRegisterNumber] = useState();
    const [companyRegisterNumberUrl, setCompanyRegisterNumberUrl] = useState();
    const [teamHomepage, setTeamHomepage] = useState();
    const [teamInfoText, setTeamInfoText] = useState();
    const [teamLogoImgUrl, setTeamLogoImgUrl] = useState("https://firebasestorage.googleapis.com/v0/b/react-study-20240226-jsm-4f336.appspot.com/o/donation%2Fteam%2Fprofile%2F5fe1562a-7f10-4486-a76c-a3b8b3ba3d9c_teamdefault.png?alt=media&token=4003e556-8a2b-475f-a9bc-bfadb1dd9ed2");
    const [accountInfos, setAccountInfos] = useState([]);
    const [createAccount, setCreateAccount] = useState(false);
    const [accountNumber, setAccount] = useState();
    const [bankName, setBankName] = useState();
    const [accountUsername, setAccountUsername] = useState();
    const [accountUrl, setAccountUrl] = useState();
    const [content, setContent] = useState("");

    const profileImgRef = useRef();
    const accountRef = useRef(0);
    const fileRef = useRef();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const principalData = queryClient.getQueryData("principalQuery");
    const handleCheckBox = () => {
        setIsCompany(() => !isCompany);
    }
    const handleContentChange = (value) => {
        setTeamInfoText(() => value);
    }
    const teamTypeCategoryOption = [
        { value: 0, label: " 선택해주세요 " },
        { value: 1, label: " 사회복지시설/사회복지법인 " },
        { value: 2, label: " 복지관(종합/노인/장애인 등) " },
        { value: 3, label: " 비영리법인/비영리민간단체 " },
        { value: 4, label: " 비영리(임의)단체 " },
        { value: 5, label: " 사회적경제 영역(소셜벤처, 사회적기업, 협동조합 등) " },
        { value: 6, label: " 기타 " }
    ]
    const modules = useMemo(() => {
        return {
            toolbar: [
                [{ font: [] }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ color: [] }, { background: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
                ["link"],
                ["clean"],
            ]
        };
    }, []);

    const formats = [
        "font", "size", "header", "color", "background", "bold", "italic", "underline",
        "strike", "blockquote", "list", "bullet", "indent", "link", "image"
    ];
    const [defaultValue, setDefaultValue] = useState(teamTypeCategoryOption[0]);
    const registerTeamMutation = useMutation({
        mutationKey: "registerTeamMutation",
        mutationFn: registerTeam,
        onSuccess: response => {
            console.log(response);
            alert("등록완료.");
        },
        onError: error => { }
    })
    const accountCounter = (e) => {
        setCreateAccount(() => true);
    }
    const submit = () => {
        const data = {
            userId: principalData?.data.userId,
            teamName,
            teamType: isCompany,
            teamTypeCategory: isCompany ? teamTypeCategory.value : 0,
            teamPhoneNumber,
            teamEmail,
            companyRegisterNumber: isCompany ? companyRegisterNumber : "",
            companyRegisterNumberUrl: isCompany ? companyRegisterNumberUrl : "",
            teamHomepage,
            teamInfoText,
            teamLogoImgUrl,
            accountInfos
        };
        registerTeamMutation.mutate(data);
        navigate("/account/mypage")
    }
    const handlefileChange = (e, setFile) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) {
            e.target.value = "";
            return;
        }
        const storageRef = ref(storage, `donation/team/profile/${uuid()}_${files[0].name}`);
        const uploadTask = uploadBytesResumable(storageRef, files[0]);
        console.log();
        uploadTask.on(
            "state_changed",
            Snapshot => { },
            error => { console.log(error.message); },
            () => {
                getDownloadURL(storageRef)
                    .then(url => {
                        setFile(() => url);
                    });
            }
        )
    }
    const handleAccountInfos = () => {
        accountRef.current = accountRef.current + 1;
        const accountInfo = {
            "accountId": accountRef.current,
            accountUsername,
            accountNumber,
            bankName,
            accountUrl
        }
        setAccountUsername(() => "");
        setAccountUrl(() => "");
        setAccount(() => "");
        setBankName(() => "");
        setAccountInfos(() => [...accountInfos, accountInfo]);
        setCreateAccount(() => false)
    }
    const handleDeleteAccountInfos = (id) => {
        setAccountInfos(() => [...accountInfos.filter(accountInfo => accountInfo.accountId !== id)]);
    }
    return (
        <div css={s.container}>
            <div css={s.haeder}>
                <div css={s.div}>
                    <div css={s.team}>팀 유형</div>
                    <input css={s.check} type="checkbox" name="개인" id="개인" checked={!isCompany} onClick={handleCheckBox} />
                    <label htmlFor="개인"> 개인</label>
                    <input css={s.check} type="checkbox" name="법인" id="법인" checked={isCompany} onClick={handleCheckBox} />
                    <label htmlFor="법인"> 법인</label>
                </div>
                {
                    isCompany ?
                        <div css={s.div1}>
                            <span>단체/기관</span>
                            <Select
                                css={s.select}
                                options={teamTypeCategoryOption}
                                defaultValue={defaultValue}
                                value={teamTypeCategory}
                                onChange={(option) => {
                                    setTeamTypeCategory(() => option);
                                    setDefaultValue(() => option);
                                }} />
                            <span>사업자번호</span>
                            <input css={s.input} type="text"
                                value={companyRegisterNumber}
                                onChange={(e) => setCompanyRegisterNumber(e.target.value)} />
                            <button css={s.input2} onClick={() => fileRef.current.click()}>파일첨부</button>
                            <input css={s.input3} type="file" ref={fileRef} src="" alt="" onChange={(e) => handlefileChange(e, setCompanyRegisterNumberUrl)} />
                        </div>
                        : null}
            </div>
            <div css={imgBox} onClick={() => profileImgRef.current.click()}>
                <input type="file" ref={profileImgRef} style={{display:"none"}} onChange={(e) => handlefileChange(e, setTeamLogoImgUrl)}/>
                <img src={teamLogoImgUrl} alt="" />
            </div>
            <div>
            <textarea id="story" value={teamInfoText}  placeholder="팀 소개" onChange={(e) => setTeamInfoText(e.target.value)}  rows="20" cols="80"/>       
            </div>
            <div>
                <input type="text" placeholder="email" value={teamEmail} 
                    onChange={(e) => setTeamEmail(e.target.value)}/>
                <input type="text" placeholder="전화번호" value={teamPhoneNumber} 
                    onChange={(e) => setTeamPhoneNumber(e.target.value)}/>
                <input type="url" placeholder="홈페이지" value={teamHomepage} 
                    onChange={(e) => setTeamHomepage(e.target.value)}/>
            </div>
            <div>
                <button onClick={accountCounter}>은행 계좌 등록</button>
                
                {createAccount ?  
                    <div>  
                        <input type="text" placeholder="예금주명"  value={accountUsername} 
                            onChange={(e) => setAccountUsername(e.target.value)}/>
                        <input type="text" placeholder="계좌번호"  value={accountNumber } 
                            onChange={(e) => setAccount(e.target.value)}/>
                        <input type="text"placeholder="은행명"  value={bankName} 
                            onChange={(e) => setBankName(e.target.value)}/>   
                        <input type="file" src="" alt="" onChange={(e) => handlefileChange(e, setAccountUrl)}/>
                        <button onClick={handleAccountInfos}>은행 등록</button>
                    </div>
                    : null
                }
                <div css={s.div2}>
                    <span>팀 이름</span>
                    <input css={s.input} type="text" value={teamName}
                        onChange={(e) => setTeamName(e.target.value)} />
                </div>
                <div css={s.div4}>
                    <div>
                        팀 로고
                    </div>
                    <div css={s.div3} onClick={() => profileImgRef.current.click()}>
                        <input type="file" ref={profileImgRef} style={{ display: "none" }} onChange={(e) => handlefileChange(e, setTeamLogoImgUrl)} />
                        <img src={teamLogoImgUrl} />
                        <span css={s.span}>선택시 이미지 등록 가능</span>
                    </div>
                </div>
                <div>
                    <span css={s.div4}>팀 소개</span>
                    <div css={textEditorLayout}>
                        <ReactQuill
                            value={content}
                            onChange={setContent}
                            modules={modules}
                            formats={formats}
                            theme="snow"
                            placeholder="내용을 입력해주세요."
                            style={{ height: '400px', margin: "50px", width: '700px' }}
                        />
                        {/* < DonationWrite /> */}
                    </div>
                </div>
                <div css={s.div5}>
                    <span>이메일</span>
                    <input css={s.input} type="text" value={teamEmail}
                        onChange={(e) => setTeamEmail(e.target.value)} />
                    <span>전화번호</span>
                    <input css={s.input} type="text" value={teamPhoneNumber}
                        onChange={(e) => setTeamPhoneNumber(e.target.value)} />
                    <span>홈페이지</span>
                    <input css={s.input} type="url" value={teamHomepage}
                        onChange={(e) => setTeamHomepage(e.target.value)} />
                </div>
                <div css={s.div5}>
                    <button css={s.button} onClick={accountCounter}>은행 계좌 등록</button>

                    {createAccount ?
                        <div css={s.div6}>
                            <span>예금주명</span>
                            <input css={s.input} type="text" value={accountUsername}
                                onChange={(e) => setAccountUsername(e.target.value)} />
                            <span>계좌번호</span>
                            <input css={s.input} type="text" value={accountNumber}
                                onChange={(e) => setAccount(e.target.value)} />
                            <span>은행명</span>
                            <input css={s.input} type="text" value={bankName}
                                onChange={(e) => setBankName(e.target.value)} />
                            <button css={s.input2} onClick={() => fileRef.current.click()}>파일첨부</button>
                            <input css={s.input3} type="file" src="" alt="" onChange={(e) => handlefileChange(e, setAccountUrl)} />
                            <button css={s.button1} onClick={handleAccountInfos}>은행 등록</button>
                        </div>
                        : null
                    }
                    {accountInfos.map(accountInfo =>
                        <div>
                            <div css={s.div7}>
                                <div css={s.div8}>
                                    <span css={s.span1}>예금주</span>
                                    <span css={s.span1}>은행</span>
                                    <span css={s.span1}>계좌번호</span>
                                </div>
                                <div css={s.div8}>
                                    <div css={s.span2}>{accountInfo.accountUsername}</div>
                                    <div css={s.span2}>{accountInfo.bankName}</div>
                                    <div css={s.span2}>{accountInfo.accountNumber}</div>
                                    <img src={accountInfo.accountUrl} alt="" />
                                </div>
                            </div>
                            <button css={s.button2} onClick={() => handleDeleteAccountInfos(accountInfo.accountId)}>계좌 삭제</button>
                        </div>
                    )}
                </div>
                <button css={s.button3} onClick={submit}>팀 생성하기</button>
            </div>
        </div>
    );
}

export default TeamCreatePage;