/** @jsxImportSource @emotion/react */
import { useMutation, useQueryClient } from "react-query";
import * as s from "./style";
import { Link, useNavigate } from "react-router-dom";

function MyPage(props) {
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");
    console.log(principalData);
    return (
        <>
        {
            <div css={s.layout}>
                <div css={s.header}>
                    <div css={s.imgBox}>
                        <div css={s.propfileImg}>
                            <img src={principalData?.data.img} alt="" />
                        </div>
                    </div>
                    <div css={s.infoBox}>
                        <div css={s.infoText}>사용자이름: {principalData?.data.username}</div>
                        <div css={s.infoText}>이름: {principalData?.data.name}</div>
                        <div css={s.infoText}>전화번호: {principalData?.data.phone_number}</div>
                        <div css={s.infoText}>이메일: {principalData?.data.email}</div>
                        <div css={s.infoText}>성별: {principalData?.data.gender}</div>
                        <div css={s.infoText}>나이: {principalData?.data.age}</div>
                    </div>
                </div>
                <div>
                <Link to={"/account/create/team"}> 팀 만들기</Link>
                <Link to={"/account/infoedit"}>회원 정보 수정</Link>
                </div>
            </div>
        }
        </>
    )
}

export default MyPage;