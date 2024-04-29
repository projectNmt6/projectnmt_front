import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import Select from "react-select";
import {v4 as uuid} from "uuid";
import { storage } from '../../apis/filrebase/config/firebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { registerTeam } from '../../apis/api/teamApi';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

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
    const [ isCompany, setIsCompany] = useState(true);
    const [ teamTypeCategory,  setTeamTypeCategory ] = useState();
    const [ teamName,  setTeamName ] = useState();
    const [ teamPhoneNumber, setTeamPhoneNumber ] = useState();
    const [ teamEmail,  setTeamEmail ] = useState();
    const [ companyRegisterNumber,  setCompanyRegisterNumber ] = useState();
    const [ companyRegisterNumberUrl, setCompanyRegisterNumberUrl ] = useState();
    const [ teamHomepage,  setTeamHomepage ] = useState();
    const [ teamInfoText,  setTeamInfoText ] = useState();
    const [ teamLogoImgUrl,  setTeamLogoImgUrl ] = useState();
    const [ accountInfos, setAccountInfos ] = useState([]);
    const [ createAccount, setCreateAccount ] = useState(false);
    const [ accountNumber, setAccount ] = useState();
    const [ bankName, setBankName ] = useState();
    const [ accountUsername, setAccountUsername ] = useState();
    const [ accountUrl, setAccountUrl ] = useState();
    const profileImgRef = useRef();
    const accountRef = useRef(0);
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
        {value: 0, label: " 선택해주세요 "},
        {value: 1, label: " 사회복지시설/사회복지법인 "},
        {value: 2, label: " 복지관(종합/노인/장애인 등) "},
        {value: 3, label: " 비영리법인/비영리민간단체 "},
        {value: 4, label: " 비영리(임의)단체 "},
        {value: 5, label: " 사회적경제 영역(소셜벤처, 사회적기업, 협동조합 등) "},
        {value: 6, label: " 기타 "}
    ]
    
    const [ defaultValue,  setDefaultValue ] = useState(teamTypeCategoryOption[0]);
    const registerTeamMutation = useMutation({
        mutationKey: "registerTeamMutation",
        mutationFn: registerTeam,
        onSuccess: response => {
            console.log(response);
            alert("등록완료.");
        },
        onError: error => {}
    })
    const accountCounter = (e) => {
        setCreateAccount(() => true);
    }
    const submit = () => {
        const data = {
            userId: principalData?.data.userId,
            teamName,
            teamType:isCompany,
            teamTypeCategory: isCompany ? teamTypeCategory.value : 0,
            teamPhoneNumber,
            teamEmail,
            companyRegisterNumber: isCompany ? companyRegisterNumber : "",
            companyRegisterNumberUrl: isCompany ? companyRegisterNumberUrl: "",
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
        if(files.length === 0) {
            e.target.value = "";
            return;
        }
        const storageRef = ref(storage, `donation/team/profile/${uuid()}_${files[0].name}`);
        const uploadTask = uploadBytesResumable(storageRef, files[0]);
        console.log();
        uploadTask.on(
            "state_changed",
            Snapshot => {},
            error => {console.log(error.message);},
            () => {
                getDownloadURL(storageRef)
                .then(url => {
                    setFile(() => url);
                });
            }
        )
    }
    const handleAccountInfos = () => {
        accountRef.current =  accountRef.current + 1;
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
        <div css={header}>
            <div>
                팀 제작
            </div>
            <input type="checkbox" name="개인" id="개인" checked={!isCompany} onClick={handleCheckBox}/>
            <label htmlFor="개인">개인</label>
            <input type="checkbox" name="법인" id="법인" checked={isCompany} onClick={handleCheckBox}/>
            <label htmlFor="법인">법인</label>
            {
                isCompany ? 
                <div>
                    <Select options={teamTypeCategoryOption}
                    defaultValue={defaultValue}
                    value={teamTypeCategory}
                    onChange={(option) => {
                        setTeamTypeCategory(() => option);
                        setDefaultValue(() => option);
                    }}/> 
                    <input type="text" 
                    placeholder="사업자번호" 
                    value={companyRegisterNumber} 
                    onChange={(e) => setCompanyRegisterNumber(e.target.value)}/>
                    <input type="file" src="" alt=""  onChange={(e) => handlefileChange(e, setCompanyRegisterNumberUrl)}/>
                </div>
                : null
                
            }
            <div>
                <input type="text" placeholder="팀 이름" value={teamName} 
                    onChange={(e) => setTeamName(e.target.value)}/>
            </div>
            <div>

                팀로고
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
                {accountInfos.map(accountInfo => 
                    <div>  
                        <span>예금주: {accountInfo.accountUsername}</span>
                        <span>은행:{accountInfo.bankName}</span>
                        <span>계좌번호: {accountInfo.accountNumber}</span>
                        <img src={accountInfo.accountUrl} alt="" />
                        <button onClick={() => handleDeleteAccountInfos(accountInfo.accountId)}>계좌 삭제</button>
                    </div>
                )}
            </div>
            <button onClick={submit}>팀 생성</button>
        </div>
    );
}

export default TeamCreatePage;