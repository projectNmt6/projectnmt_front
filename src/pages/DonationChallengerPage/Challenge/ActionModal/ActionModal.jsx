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
import { getChallengePageRequest } from "../../../../apis/api/DonationAPI";
import { IoIosCamera } from "react-icons/io";
function ActionModal({  setShowNewModal, challengePageId  }) {
    const handleCloseClick = () => {
        setShowNewModal(false);
    };

    const [files, setFiles] = useState([]);
    const [fileError, setFileError] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [ actionContent, setActionContent ] = useState("");
    const [uploadedUrls, setUploadedUrls] = useState([]);
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");
    const [charCount, setCharCount] = useState(0);
    const [userId, setUserId] = useState(null);
    const principalQuery = useQuery(
        ["principalQuery"], 
        getPrincipalRequest,
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: (response) => {
                setUserId(response.data.userId);
            },
            onError: (error) => {
                console.error("Authentication error", error);
            }
        }
    );
    const imgFileRef = useRef();

    const handleFileChange = (e) => {
        let loadedFiles = Array.from(e.target.files);
        if (loadedFiles.length > 5) {
            setFileError('사진 개수가 초과되었습니다.');
            loadedFiles = loadedFiles.slice(0, 5);  // Only take the first five files
        } else {
            setFileError('');  // Clear error message when within the limit
        }
        setFiles(loadedFiles);  // Store the selected files in state
        handleImageUpload(loadedFiles);  // Call the upload function with the selected files
    };

    const handleInputChange = (e) => {
        const content = e.target.value;
        if (content.length <= maxCharCount) {
            setActionContent(content);
            setCharCount(content.length);
        }
    };

    const handleImageUpload = async (files) => {
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

    const [challengePage, setChallengePage] = useState({});
    const getChallengePageQuery = useQuery(
        ["getChallengePageQuery", challengePageId],
        async () => {
            const response = await getChallengePageRequest(challengePageId);
            return response.data;
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                setChallengePage(data);
            },
            onError: (error) => {
                console.error('Failed to fetch challenge page:', error);
                setChallengePage(null);
            }
        }
    );
    const maxCharCount = 300;
    const handleDeleteImage = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };
    
    return (
        <>
        <div css={s.modalBackground}>
            <div css={s.modalContainer}>
                <div css={s.header}>
                    <button css={s.button} onClick={handleCloseClick}><GrClose /></button>
                </div>
                <div css={s.body}>
                    <div css={s.actionTitleText}>행동하기</div>
                    <div css={s.actionText}>{challengePage.challengeTitle}</div>

                   
        <div css={s.fileInputContainer}>
                        <label css={s.fileInputLabel} htmlFor="file-input">
                            <IoIosCamera />사진 첨부하기
                        </label>
                        <input
                            type="file"
                            id="file-input"
                            multiple
                            ref={imgFileRef}
                            onChange={handleFileChange}
                            css={s.fileInput}
                        />
                         {fileError && (
                            <div css={css`color: red; margin-top: 5px;`}>
                                {fileError}
                            </div>
                        )}
                    </div>
        <div css={s.imageContainer}>
        {files.map(file => (
    <div key={file.name} css={s.imageLayout}>
        <img src={URL.createObjectURL(file)} alt="" />
        <button css={s.deleteButton} onClick={() => handleDeleteImage(file)}>
            <GrClose />
        </button>
    </div>
))}


            </div>


        <div>
            <textarea
                value={actionContent}
                onChange={handleInputChange}
                placeholder="실행한 행동을 입력해주세요"
                css={s.textInput}
            />
        </div>

                <div>
                    <p>{charCount}/{maxCharCount}</p>
                    <p>사진은 10MB 이내, 최대 5장까지 첨부 가능합니다.</p>
                    <p>미션 내용이 맞지 않거나 게시글 정책을 위반한 경우 삭제됩니다.</p>
                </div>
                    <div css={s.button}>
                        <button css={s.closeButton} onClick={handleCloseClick}>취소</button>
                        <button css={s.loginButton} onClick={handleSubmit}>등록</button>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default ActionModal;
