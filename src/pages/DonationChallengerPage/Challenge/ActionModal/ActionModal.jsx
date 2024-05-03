/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { GrClose } from "react-icons/gr";
import { css } from "@emotion/react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid"
import { storage } from "../../../../apis/filrebase/config/firebaseConfig";
import { Line } from "rc-progress";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { PostActionBoard } from "../../../../apis/api/ChallengeApi";
import { getPrincipalRequest } from "../../../../apis/api/principal";

function ActionModal({  setShowNewModal, challengePageId  }) {
    const handleCloseClick = () => {
        setShowNewModal(false);
    };

    const [files, setFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [ actionContent, setActionContent ] = useState("");
    const [uploadedUrls, setUploadedUrls] = useState([]);
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");

    const [userId, setUserId] = useState(null);
    const principalQuery = useQuery(
        ["principalQuery"], 
        getPrincipalRequest,
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: (response) => {
                console.log("챌린지페이지", response.data);
                setUserId(response.data.userId);
            },
            onError: (error) => {
                console.error("Authentication error", error);
            }
        }
    );
    const handleFileChange = (e) => {
        const loadedFiles = Array.from(e.target.files);
        if (loadedFiles.length === 0) {
            return;
        }
        setFiles(loadedFiles);  // 모든 파일을 상태에 저장
    };
    const imgFileRef = useRef();


    const handleImageUpload = async () => {
        const uploads = files.map(file => {
            return new Promise((resolve, reject) => {
                const storageRef = ref(storage, `images/${uuid()}_${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);
    
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        setUploadProgress(progress);
                    },
                    reject,
                    () => {
                        getDownloadURL(storageRef).then((url) => {
                            const imageId = uuid(); // 각 이미지에 대한 고유 ID 생성
                            resolve({ url, imageId });
                        }).catch(reject);
                    }
                );
            });
        });
    
        const uploadedImages = await Promise.all(uploads);
        setUploadedUrls(uploadedImages); // 업로드된 이미지의 URL과 ID 저장
    };
    
    const handleSubmit = () => {
        const now = new Date();
        uploadedUrls.forEach(({ url }, index) => {
            // 각 이미지에 대해 인덱스를 이용하여 고유한 정수 ID를 생성 (예제로 인덱스 활용)
            const imageId = index + 1; // 예를 들어, 첫 번째 이미지는 ID 1을 가집니다.
            const data = {
                userId: userId,
                actionContent,
                imageId, 
                imageURL: url,
                createDate: now,
                challengePageId
            };
            registerActionBoard.mutate(data);
        });
    };
    

    const registerActionBoard = useMutation({
        mutationKey: "registerActionBoard",
        mutationFn: PostActionBoard,
        onSuccess: response => {
            console.log(response);
            alert("등록완료.");
        },
        onError: error => {}
    })


    return (
        <>
        <div css={s.modalBackground}>
            <div css={s.modalContainer}>
                <div css={s.header}>
                    <button css={s.button} onClick={handleCloseClick}><GrClose /></button>
                </div>
                <div css={s.body}>
                    <h3>행동하기</h3>
                    <p>춘식이와 함께 태극기를 달아주세요!</p>
                    <p>사진 첨부하기</p>
                    <input type="file" multiple ref={imgFileRef} onChange={handleFileChange} />
                    {files.map(file => (
                        <div key={file.name} css={s.imageLayout}>
                            <img src={URL.createObjectURL(file)} alt="" />
                        </div>
                    ))}
                    <Line percent={uploadProgress} strokeWidth={4} strokeColor={"#dbdbdb"} />
                    <input type="text" value={actionContent} onChange={e => setActionContent(e.target.value)} />
                    <p>입력 글자수: 0 / 최대 입력 글자수: 300</p>
                    <p>사진은 10MB 이내, 최대 5장까지 첨부 가능합니다.</p>
                    <p>미션 내용이 맞지 않거나 게시글 정책을 위반한 경우 삭제됩니다.</p>
                    <div css={s.button}>
                        <button onClick={handleImageUpload}>이미지 업로드</button>
                        <button css={s.loginButton} onClick={handleSubmit}>등록</button>
                        <button css={s.closeButton} onClick={handleCloseClick}>취소</button>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default ActionModal;
