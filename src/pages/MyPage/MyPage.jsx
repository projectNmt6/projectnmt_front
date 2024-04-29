/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { getParticipationRequest, getTeamListRequest } from "../../apis/api/teamApi";
import { useState } from "react";
import { deleteCommentRequest } from "../../apis/api/Admin";
import { deleteUserRequest } from "../../apis/api/SignUp";
import instance from "../../apis/utils/instance";
import MyDonation from "../MyDonation/MyDonation";
import MessagePage from "../MessagePage/MessagePage";
function MyPage(props) {
    const [ temaList, setTeamList ] = useState([]);
    const [selectedTab, setSelectedTab] = useState('profile');
    const queryClient = useQueryClient();

    const principalData = queryClient.getQueryData("principalQuery");
    const getTeamListQuery = useQuery(
        ["getTeamListQuery", principalData?.data],
        async () => {
            return await getTeamListRequest({
                userId: principalData?.data.userId
            })
        },
        {
            refetchOnWindowFocus: false,
            // enabled: principalData?.data !== undefined,
            onSuccess: response => {
                console.log(principalData);
                setTeamList(() => response?.data);
            },
        }
    );
    const deleteUserMutation = useMutation({
        mutationKey: "deleteUserMutation",
        mutationFn: deleteUserRequest,
        onSuccess: response => {
            console.log(response);
            alert("삭제완료.");
        },
        onError: error => { }
    })
    const handleUserDeleteOnClick = () => {
        if (!window.confirm("사용자가 리더인 팀은 해산되게 됩니다.\n회원탈퇴를 하시겠습니까?")) {
            return
        }
        deleteUserMutation.mutate(principalData.data.userId)
        localStorage.removeItem("AccessToken");
        instance.interceptors.request.use((config) => {
            config.headers.Authorization = null;
            return config;
        });
        queryClient.refetchQueries("principalQuery");
        window.location.replace("/auth/signin");
    }
    const getParticipationCount = useQuery(
        ["getParticipationCount", principalData?.data],
        async () => {
            return await getParticipationRequest({
                userId: principalData?.data.userId
            })
        },
        {
            refetchOnWindowFocus: false,
            enabled: principalData?.data !== undefined,
            onSuccess: response => {
                console.log(response.data);
            },
        }
    );
    return (
        <div>
            {
                <div css={s.layout}>
                    <div css={s.header}>
                        <div css={s.infoBox}>
                            <span>기부천사</span>
                            <div css={s.infoText}>{!!principalData?.data.name ? principalData?.data.name : "MyProfile에서 회원정보를 업데이트 해주세요"}</div>
                        </div>
                        <div css={s.imgBox}>
                            <div css={s.propfileImg}>
                                <img src={principalData?.data.profileImg} alt="" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div css={s.div}>
                                <button css={s.button1} onClick={() => setSelectedTab(() => "profile")}>MyProfile</button>
                                <button css={s.button1} onClick={() => setSelectedTab(() => "donation")}>MyDonation</button>
                                <button css={s.button1} onClick={() => setSelectedTab(() => "team")}>MyTeam</button>
                                <button css={s.button1} onClick={() => setSelectedTab(() => "message")}>MyMessage</button>
                            </div>
                            {
                                selectedTab === "profile"
                                    ?
                                    <div css={s.div1}>
                                        <div css={s.div2}>
                                            <div css={s.div3}>
                                                <label css={s.label} htmlFor="">전화번호</label>
                                                <label css={s.label} htmlFor="">이메일</label>
                                                <label css={s.label} htmlFor="">성별</label>
                                                <label css={s.label} htmlFor="">나이</label>
                                            </div>
                                            <div css={s.div4}>
                                                <div css={s.label}>{principalData?.data.phoneNumber}</div>
                                                <div css={s.label}>{principalData?.data.email}</div>
                                                <div css={s.label}>{principalData?.data.gender}</div>
                                                <div css={s.label}>{principalData?.data.age}</div>
                                            </div>
                                        </div>
                                        <div css={s.div6}>
                                            <div css={s.div5}>
                                                <Link css={s.link} to={"/account/mypage/edit"}>회원 정보 수정</Link>
                                            </div>
                                            <button css={s.button} onClick={handleUserDeleteOnClick}>회원탈퇴</button>
                                        </div>
                                    </div>
                                    : selectedTab === "donation"
                                        ? <div>
                                            <span css={s.span}>기부 내역</span>
                                            <MyDonation />
                                        </div>
                                        : selectedTab === "team"
                                        ? <div css={s.div7}>
                                                {temaList.map(team => {
                                                    return <>
                                                        <div css={s.div8} key={team.teamId}>
                                                            <Link to={`/team/info?id=${team.teamId}`}>
                                                                <img src={team.teamLogoImgUrl} alt="" />
                                                            </Link>
                                                            <div css={s.div9}>
                                                                <span css={s.span1}>프로젝트팀</span>
                                                                <div>{team.teamName}</div>
                                                            </div>
                                                        </div>
                                                    </>
                                                })}
                                                <Link css={s.link1} to={"/team/write"}> 팀 만들기</Link>
                                            </div>
                                            : <div>
                                                <span css={s.span}>메시지 리스트</span>
                                                <MessagePage isTeam={0} />
                                            </div>
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default MyPage;