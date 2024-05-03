import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import { useLocation } from 'react-router-dom';
import NonePage from './NonePage';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import 'react-quill/dist/quill.snow.css';
import { getPrincipalRequest } from '../../../apis/api/principal';
import { getTeamListRequest } from '../../../apis/api/teamApi';
import { useQuery } from 'react-query';

const textEditorLayout = css`
    overflow-y: auto;
    margin-bottom: 20px;
`;

function NewsUpdatePage() {

    const [ pageCategoryId, setPageCategoryId ] = useState();
    const [ userId, setUserId ] = useState();
    const [ donationNewsPageId, setDonationNewsPageId ] = useState("");
    const [content, setContent] = useState('');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const donationPageId = queryParams.get('page');    
    const [ teamId, setTeamId ] = useState();
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);

    const principalQuery = useQuery(
        ["principalQuery"], 
        getPrincipalRequest,
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: (response) => {
                console.log("Auth", response.data);
                setUserId(response.data.userId); // 예제로 userId 설정
            },
            onError: (error) => {
                console.error("Authentication error", error);
            }
        }
    );

    useEffect(() => {
        if (userId) {
            const fetchTeams = async () => {
                try {
                    const response = await getTeamListRequest({ userId });
                    if (response.status === 200) {
                        const formattedTeams = response.data.map(team => ({
                            value: team.teamId,
                            label: team.teamName
                        }));
                        setTeams(formattedTeams);
                    }
                } catch (error) {
                    console.error(error);
                }
            };
            fetchTeams();
        }
    }, [userId]);

    const modules = useMemo(() => {
        return {
            toolbar: [
                [{ font: [] }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ color: [] }, { background: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
                ["link"],
                ["clean"],
            ]
        };
    }, []);

    const formats = [
        "font", "size", "header", "color", "background", "bold", "italic", "underline",
        "strike", "blockquote", "list", "bullet", "indent", "link", "image"
    ];

    
    useEffect(() => {
        const fetchData = async () => {
            console.log(`Request URL: http://localhost:8080/main/donation/news/update/${donationPageId}`);
            try {
                const response = await axios.get(`http://localhost:8080/main/donation/news/update/${donationPageId}`);
                const data = response.data;
                console.log("Response Data:", data);
                setContent(data.newsContent);
                setTeamId(data.teamId);
                setPageCategoryId(data.pageCategoryId);
                setDonationNewsPageId(data.donationNewsPageId);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData(); 
    }, [donationPageId]);
    
    const handleContentChange = (value) => { 
        setContent(value);
    };

    const handleSubmitButton = () => {

        axios.put(`http://localhost:8080/main/donation/news/update/${donationPageId}`, {
            donationPageId: donationPageId,            
            pageCategoryId: pageCategoryId,
            newsContent: content
        })
        .then(response => {
            alert("저장 성공");
            console.log(response)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div>
            NewsPage
            <div> 

                <div css={textEditorLayout}>
                <ReactQuill
                    value={content}
                    onChange={handleContentChange}
                    modules={modules}
                    formats={formats}
                    theme="snow"
                    style={{ height: '500px', margin: "50px" }}
                />
                <button onClick={handleSubmitButton}>수정 완료</button>
            </div>
            </div>
        </div>
    );
}

export default NewsUpdatePage;