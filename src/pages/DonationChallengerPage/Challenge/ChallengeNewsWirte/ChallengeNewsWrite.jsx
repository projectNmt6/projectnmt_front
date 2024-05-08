import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import ReactQuill from 'react-quill';
import TextEditor from '../../../../components/TextEditor/TextEditor';
import { PostChallengeNews } from '../../../../apis/api/ChallengeApi';
import { getTeamListRequest } from '../../../../apis/api/teamApi';
import { getPrincipalRequest } from '../../../../apis/api/principal';
import { getUpdateChallengePageRequest, updateChallengeRequest } from '../../../../apis/api/DonationAPI';


function ChallengeNewsWrite() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const challengePageId = queryParams.get('page'); 
       
    const [title, setTitle] = useState("");
    const [mainImg, setMainImg] = useState("");
    const [ teamId, setTeamId ] = useState();
    const [teams, setTeams] = useState([]);
    const [ userId, setUserId] = useState();
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
    const [challengeContent, setChallengeContent] = useState("");
    
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
                    console.error('Failed to fetch teams', error);
                }
            };

            fetchTeams();
        }
    }, [userId]);

    const [selectedTeam, setSelectedTeam] = useState(null);

    
    useEffect(() => {
        if (selectedTeam) {
            setTeamId(selectedTeam.value);
        }
    }, [selectedTeam]);
    const PostNews = useMutation({
        mutationKey: "PostNews",
        mutationFn: PostChallengeNews,
        onSuccess: response => {
            console.log("뉴스 작성 성공" + response)
        },
        onError: error=>{
            console.log(error)
        }
    })

    useEffect(() => {
        const fetchData = async () => {
            if (challengePageId) {
                try {
                    const response = await getUpdateChallengePageRequest({ challengePageId });
                    console.log(response.data)
                    if (response.status === 200) {
                        const data = response.data;
                        setTeamId(data.teamId);
                        setSelectedTeam({ value: data.teamId, label: data.teamName });
                     }
                } catch (error) {
                    console.error('Error fetching challenge page:', error);
                }
            } else {
                console.error('No valid challengePageId provided');
            }
        };
        fetchData();
    }, [challengePageId]);

    const handleSubmitButton = () => {
        const data = {
            challengeNewsPageId: 0,
                challengePageId: challengePageId,
                pageCategoryId: 6,
                challengeNewsContent: challengeContent,
                teamId: teamId
        }
        PostNews.mutate(data);
    };
    
    const fileChange2 = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setMainImg(reader.result);
        };
        reader.readAsDataURL(file);
    };
    return (
        <div>
            
            <h2>후기</h2>
            
             <div>
                <input type="text" 
                placeholder='제목' 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} />
                <input  
                        id="inputFile" 
                        type="file" 
                        name="file" 
                        accept='image/*'
                        style={{ display: "block" }}
                        onChange={fileChange2} 
                    /> 
            </div>
            

            <TextEditor 
            content={challengeContent} 
            setContent={setChallengeContent} />
 

            <div >
                <button onClick={handleSubmitButton}>작성완료</button>
                {/* <button onClick={handleCancelButton}>취소</button> */}
                {/* <button onClick={handleHomeButton}>돌아가기</button> */}
            </div>    
        </div>
    );
}

export default ChallengeNewsWrite;