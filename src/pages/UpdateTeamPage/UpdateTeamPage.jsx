/** @jsxImportSource @emotion/react */
import * as s from "./style";
import {css} from "@emotion/react";
import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Select from "react-select";
import {v4 as uuid} from "uuid";
import { storage } from '../../apis/filrebase/config/firebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { registerTeam, updateTeam, updateTeamRequest } from '../../apis/api/teamApi';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from "react-router-dom";

const header = css`
        display: flex;
        flex-direction: column;
        width: 800px;
        margin-bottom: 20px;
        align-items: center;
        font-size: 20px;
        border: 1px solid #dbdbdb;
        font-family: 'NEXON Lv1 Gothic OTF';
`; 

const imgBox = css`
    & > img {
        border: 1px solid #dbdbdb;
        height: 225px;
        width: 225px;
        overflow: hidden;
    }
`
function UpdateTeamPage(props) {
    const location = useLocation();
    const teamInfo = location.state.teamInfo;
    const navigate = useNavigate();
    const accountIdRef = useRef(0);
    const [ teamPhoneNumber, setTeamPhoneNumber ] = useState(teamInfo.teamPhoneNumber);
    const [ teamEmail,  setTeamEmail ] = useState(teamInfo.teamEmail);
    const [ teamHomepage,  setTeamHomepage ] = useState(teamInfo.teamHomepage);
    const [ teamInfoText,  setTeamInfoText ] = useState(teamInfo.teamInfoText);
    const [ teamLogoImgUrl,  setTeamLogoImgUrl ] = useState(teamInfo.teamLogoImgUrl);
    const [ accountInfos, setAccountInfos ] = useState(teamInfo.accounts);
    const [ createAccount, setCreateAccount ] = useState(false);
    const [ accountNumber, setAccount ] = useState();
    const [ bankName, setBankName ] = useState();
    const [ accountUsername, setAccountUsername ] = useState();
    const [ accountUrl, setAccountUrl ] = useState();
    const profileImgRef = useRef();
    const handleContentChange = (value) => {
        setTeamInfoText(() => value);
    }
    const updateTeamMutation = useMutation({
        mutationKey: "updateTeamMutation",
        mutationFn: updateTeamRequest,
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
            teamId: teamInfo.teamId,
            teamPhoneNumber,
            teamEmail,
            teamHomepage,
            teamInfoText,
            teamLogoImgUrl,
            accountInfos      
        };
        updateTeamMutation.mutate(data);
        // accountInfos
        navigate(`/team/info?id=${teamInfo.teamId}`)
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
        accountIdRef.current = accountIdRef.current + 1;
        const accountInfo = {
            "accountId": accountIdRef.current,
            accountUsername,
            accountNumber,
            bankName,
            accountUrl
        }
        setAccountInfos(() => [...accountInfos, accountInfo]);
        setAccountUsername(() => "");
        setAccountUrl(() => "");
        setAccount(() => "");
        setBankName(() => "");
        setCreateAccount(() => false)
    }
    const handleDeleteAccountInfos = (id) => {
        console.log(id);
        setAccountInfos(() => [...accountInfos.filter(accountInfo => accountInfo.accountId !== id)]);
    }
    return (
        <div css={header}>
            <div css={s.div}>
                <div>
                    팀 정보수정
                </div>
                <div css={s.div2}>
                    팀명: {teamInfo.teamName}
                </div>
            </div>
            <div css={s.div}>
                <div>
                    팀로고
                </div>
                <div css={imgBox}>
                    <input type="file" src="" alt="" ref={profileImgRef} style={{ display: "none" }} onChange={(e) => handlefileChange(e, setTeamLogoImgUrl)} />
                    <img src={teamLogoImgUrl} alt="" onClick={() => profileImgRef.current.click()} />
                </div>
            </div>
            <div css={s.div}>
                <div>
                    팀 소개
                </div>
                <div css={s.div2}>
                    <textarea id="story" value={teamInfoText} onChange={(e) => setTeamInfoText(e.target.value)} rows="20" cols="80" />
                </div>
            </div>
            <div css={s.div3}>
                <div css={s.div4}>
                    <span css={s.font}>email</span>
                    <span css={s.font}>전화번호</span>
                    <span css={s.font}>홈페이지</span>
                </div>
                <div css={s.div4}>
                    <input css={s.input} type="text" value={teamEmail}
                        onChange={(e) => setTeamEmail(e.target.value)} />
                    <input css={s.input} type="text" value={teamPhoneNumber}
                        onChange={(e) => setTeamPhoneNumber(e.target.value)} />
                    <input css={s.input} type="url" value={teamHomepage}
                        onChange={(e) => setTeamHomepage(e.target.value)} />
                </div>
            </div>
            <div>
                <button css={s.input2} onClick={accountCounter}>은행 계좌 등록</button>
                {createAccount ?
                    <div css={s.div}>
                        <div css={s.div3}>
                        <div css={s.div4}>
                            <span css={s.font}>예금주명</span>
                            <span css={s.font}>계좌번호</span>
                            <span css={s.font}>은행명</span>
                        </div>
                        <div css={s.div4}>
                            <input css={s.input} type="text" value={accountUsername}
                                onChange={(e) => setAccountUsername(e.target.value)} />
                            <input css={s.input} type="text" value={accountNumber}
                                onChange={(e) => setAccount(e.target.value)} />
                            <input css={s.input} type="text" value={bankName}
                                onChange={(e) => setBankName(e.target.value)} />
                        </div>
                        </div>
                        <button css={s.input3} onClick={() => profileImgRef.current.click()}>파일첨부</button>
                        <input css={s.input4} type="file" src="" alt="" onChange={(e) => handlefileChange(e, setAccountUrl)} />
                        <button css={s.button1} onClick={handleAccountInfos}>은행 등록</button>
                    </div>
                    : null
                }
                {accountInfos.map(accountInfo =>
                   <div css={s.div}>
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
            <button css={s.button3} onClick={submit}>수정하기</button>
        </div>
    );
}

export default UpdateTeamPage;