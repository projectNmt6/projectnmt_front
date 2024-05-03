/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import LikeButton from "../../components/LikeButton/LikeButton";
import { getDonationListRequest, getDonationTagRequest } from "../../apis/api/DonationAPI";
import Progress from "../../components/progress/Progress";
import NowFundingPage from "./fundings/NowFundingPage";
import { FaPen } from "react-icons/fa6";
import EndedDonationsPage from "./donations/EndedDonationsPage";
import NowDonationPage from "./donations/NowDonationPage";

function MainPage() {
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedTab, setSelectedTab] = useState('now'); //news, story 중 하나의 값을 가짐
    const handleTabChange = (tab) => {
        setSelectedTab(tab);
        }    
    return (
        <>
            <header css={s.header}>
                <div css={s.headerButton(selectedCategory)}>
                    <button onClick={() => {handleTabChange('now'); setSelectedCategory(0);}}>모금중 </button>
                    <button onClick={() => {handleTabChange('end'); setSelectedCategory(1);}}>모금종료 </button>
                    
                </div>
                <div css={s.write}>
                    <a href='/main/write'><FaPen color="black" size={14} /> 모금제안 </a>
                </div>
            </header>
            <main css={s.main}>
            {selectedTab === 'now' ? <NowDonationPage /> : <EndedDonationsPage />}
            </main>

        </>
    );
}

export default MainPage;