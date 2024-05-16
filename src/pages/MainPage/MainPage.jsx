/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa6";
import EndedDonationsPage from "./donations/EndedDonationsPage";
import NowDonationPage from "./donations/NowDonationPage";
import { getPrincipalRequest } from "../../apis/api/principal";

function MainPage() {
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedTab, setSelectedTab] = useState('now'); //news, story 중 하나의 값을 가짐
    const handleTabChange = (tab) => {
        setSelectedTab(tab);
        }  
        const [userId, setUserId] = useState();
        const navigate = useNavigate(); // Hook from React Router for navigation
    
        const principalQuery = useQuery(
            ["principalQuery"],
            getPrincipalRequest,
            {
                retry: 0,
    
                refetchOnWindowFocus: false,
                onSuccess: (response) => {
                    console.log("Auth", response.data);
                    setUserId(response.data.userId);
                },
                onError: (error) => {
                    console.error("Authentication error", error);
                }
            }
        );
        const handleDonationProposalClick = () => {
            if (userId) {
                navigate('/main/write'); 
            } else {
                navigate('/auth/signin');
            }
        }
    
    return (
        <>
            <header css={s.header}>
                <div css={s.headerButton(selectedCategory)}>
                    <button onClick={() => {handleTabChange('now'); setSelectedCategory(0);}}>모금중 </button>
                    <button onClick={() => {handleTabChange('end'); setSelectedCategory(1);}}>모금종료 </button>
                </div>
                <div >
                    <div css={s.write} onClick={handleDonationProposalClick}>
                        <FaPen color="black" size={14} /> 모금제안
                    </div>
                </div>
            </header>
            <main css={s.main}>
            {selectedTab === 'now' ? <NowDonationPage /> : <EndedDonationsPage />}
            </main>

        </>
    );
}

export default MainPage;