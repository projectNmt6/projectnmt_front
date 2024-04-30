/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import * as s from "./style";
import { useInput } from "../../hooks/useInput";
import { signinRequest } from "../../apis/api/SignIn";
import naverimg from '../../assets/naver_login.png';
import googleimg from '../../assets/google_login.png';
import kakaoimg from '../../assets/kakao_login.png';

function SignInPage(props) {

    const [username, usernameChange] = useInput();
    const [password, passwordChange] = useInput();

    const handleLogin = (e) => {

        signinRequest({
            username,
            password
        }).then(response => {
            const accessToken = response.data;
            console.log(accessToken);
            localStorage.setItem("AccessToken", accessToken);
            window.location.replace("/main");
        }).catch(error => {
            alert(error.response.data);
        }
        )
    }

    return (
        <>
            <div css={s.header}>
                <h1 css={s.h1}>로그인</h1>
                <div css={s.div1}>
                    <div css={s.div}>
                        <label css={s.span}>사용자 ID</label>
                        <label css={s.span}>비밀번호</label>
                    </div>
                    <div css={s.div}>
                        <input css={s.input} type={"text"} name={"username"} value={username} onChange={usernameChange} />
                        <input css={s.input} type={"password"} name={"password"} value={password} onChange={passwordChange} />
                    </div>
                </div>
                <div css={s.div2}>
                    <button css={s.button} onClick={handleLogin}>로그인하기</button>
                    <Link css={s.link} to={"/auth/signup"}>회원가입</Link>
                </div>
                <div css={s.div3}>
                    <a href="http://localhost:8080/oauth2/authorization/kakao"><img css={s.img} src={kakaoimg}></img></a>
                    <a href="http://localhost:8080/oauth2/authorization/google"><img css={s.img} src={googleimg}></img></a >
                    <a href="http://localhost:8080/oauth2/authorization/naver"><img css={s.img} src={naverimg}></img></a>
                </div>
            </div>
        </>
    );
}

export default SignInPage;