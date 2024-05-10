/** @jsxImportSource @emotion/react */
import TeamCreatePage from "../TeamCreatePage/TeamCreatePage";
import TeamInfoPage from "../TeamInfoPage/TeamInfoPage";
import TeamJoinPage from "../TeamJoinPage/TeamJoinPage";
import TeamMemberPage from "../TeamMemberPage/TeamMemberPage";
import TeamPage from "../TeamPage/TeamPage";
import TeamStoryManagepage from "../TeamStoryManagePage/TeamStoryManagepage";
import UpdateTeamPage from "../UpdateTeamPage/UpdateTeamPage";
import * as s from "./style";
import { Route, Routes } from 'react-router-dom';

function TeamRoutePage(props) {
    return (
        <div css={s.layout}>    
            <Routes>
                <Route path="/management" element={<TeamPage />} />
                <Route path="/member" element={<TeamMemberPage />} />
                <Route path="/write" element={<TeamCreatePage />} />
                <Route path="/info" element={<TeamInfoPage />} />
                <Route path="/update" element={<UpdateTeamPage />} />
                <Route path="/story" element={<TeamStoryManagepage />} />
                <Route path="/join" element={<TeamJoinPage />} />
            </Routes>
        </div>
    );
}

export default TeamRoutePage;