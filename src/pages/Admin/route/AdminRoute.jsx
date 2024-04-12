import React from 'react';
import AdminMain from '../main/AdminMain';
import UserManagement from '../userManagement/UserManagement'
import CommentManagement from '../commentManagement/CommentManagement';
import StoryManagement from '../storyManagement/StoryManagement';
import { Route, Routes } from 'react-router-dom';
import UserInfo from '../userInfo/UserInfo';

function AdminRoute(props) {
    return (
        <div>
            <Routes>
                <Route path='/main' element={ <AdminMain /> }/>
                <Route path='/management/user' element={ <UserManagement /> }/>
                <Route path='/user' element={ <UserInfo /> }/>
                <Route path='/management/comment' element={ <CommentManagement /> }/>
                <Route path='/management/story' element={ <StoryManagement /> }/>
            </Routes>
        </div>
    );
}

export default AdminRoute;