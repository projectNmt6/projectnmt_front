import React, { useRef, useState } from 'react';
import { getUserListRequest } from '../../../apis/api/Admin'
import { useQuery } from 'react-query';

function UserManagement() {
    const checkBoxRef = useRef();
    const [ userList, setUserList ] = useState([]);
    const userListQuery = useQuery(["userListQuery"], getUserListRequest, {
        retry: 3,
        refetchOnWindowFocus: false,
        onSuccess: response => {
            setUserList(() => response.data.map(user => {
                return {
                    ...user,
                    checked: false
                }
            }));
            console.log(response.data);
        }
    });
    const handleAllCheckOnChange = (e) => {
        setUserList(() =>userList.map(user => {
            return {
                ...user,
                checked: e.target.checked
            }
        }));
    }
    const handleCheckOnChange = (e) => {
        const userId = parseInt(e.target.value);
        setUserList(() =>userList.map(user => {
            if (userId === user.userId) {
                return {
                    ...user,
                    checked: e.target.checked
                }
            } else {
                return user
            }
            }));
        if(!e.target.checked) {
            checkBoxRef.current.checked = false
        }
    }
    return (
        <>
            <div>
                유저관리
            </div>
            <div >
                <table >
                    <thead>
                        <tr >
                            <th><input type="checkbox" ref={checkBoxRef} onChange={handleAllCheckOnChange}/></th>
                            <th>유저번호</th>
                            <th>아이디</th>
                            <th>유저명</th>
                            <th>전화번호</th>
                            <th>이메일</th>
                            <th>성별</th>
                            <th>권한</th>
                            <th>표지URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userList.map(
                                user => 
                                <tr key={user.userId}>
                                    <td><input type="checkbox" value={user.userId} checked={user.checked} onChange={handleCheckOnChange}/></td>
                                    <td>{user.userId}</td>
                                    <td>{user.username}</td>
                                    <td>{user.name}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.email}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.role?.roleNameKor}</td>
                                    <td><img src={user.profileImg} alt="" /></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default UserManagement;