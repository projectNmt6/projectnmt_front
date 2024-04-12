import React, { useEffect, useRef, useState } from 'react';
import { getUserListRequest, postMessageRequest } from '../../../apis/api/Admin'
import { useMutation, useQuery } from 'react-query';
import { Link } from 'react-router-dom';

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
    useEffect(() => {
        for(let user of userList) {
            checkBoxRef.current.checked = user.checked;
            if(!checkBoxRef.current.checked) {
                break;
            }
        }
        
    },[userList])
    const [ message, setMessage ] = useState();
    const handleTextareaOnchange = (e) => {
        setMessage(() => e.target.value);
        console.log(message);
    }
    const sendMessageMutation = useMutation({
        mutationKey: "sendMessageMutation",
        mutationFn: postMessageRequest,
        onSuccess: response => {
            console.log(response);
            alert("전송완료.");
        },
        onError: error => {}
    })
    const handleMessageOnClick = (e) => {
        let userIds = [];
        for(let user of userList) {
            if(user.checked) {
                userIds = [...userIds, user.userId];
            }
        }
        sendMessageMutation.mutate({
            message,
            userId: userIds
        });
     }
    return (
        <>
            <div>
                유저관리
                <p><textarea placeholder="공지 사항 입력" value={message} onChange={handleTextareaOnchange}></textarea></p>
                <button onClick={handleMessageOnClick}>공지보내기</button>
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
                            <th>상세정보 보기</th>
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
                                    <td><Link to={`/admin/user?id=${user.userId}`}>상세정보</Link></td>
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