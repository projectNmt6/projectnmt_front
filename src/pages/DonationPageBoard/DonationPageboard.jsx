import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react'; // css import 추가
import { useMemo } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useMutation } from 'react-query';
import { registerDonationPage } from '../../apis/api/DonationAPI';
import Select from 'react-select';
import { usePageInput } from '../../hooks/usePageInput';
import { buttonBox } from './style';
import { v4 as uuidv4 } from 'uuid'; // uuid 라이브러리 import
import { useRecoilState } from 'recoil';

// CSS 스타일
const textEditorLayout = css `
    overflow-y: auto;  
    margin-bottom: 20px;  
`;

function DonationPageboard() {
    // 상태 변수
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [mainImg, setMainImg] = useState("");
    const [fundCategory, setFundCategory] = useState([]);
    
    // Refs
    const inputRefs = [
        useRef(),   // team_id
        useRef(),   // main_category_id
        useRef(),   // donation_category_id (기부/스토리)
        useRef(),   // donation_name
        useRef(),   // goal_amount
        useRef(),   // story_title
        useRef(),   // story_content
        useRef(),   // main_img_url
        useRef(),   // donation_tag_id        
    ];

    // Custom Hook 사용
    const nextInput = (ref) => {
        ref.current.focus();
    };

    const [ selectOption ] = useRecoilState();
    const teamId = usePageInput(nextInput, inputRefs[1]);
    const mainCategoryId = usePageInput(nextInput, inputRefs[2]);
    const donationCategoryId = usePageInput(nextInput, inputRefs[3]);
    const donationName = usePageInput(nextInput, inputRefs[4]);
    const goalAmount = usePageInput(nextInput, inputRefs[5]);
    const storyTitle = usePageInput(nextInput, inputRefs[6]);
    const storyContent = usePageInput(nextInput, inputRefs[7]);
    const mainImgUrl = usePageInput(nextInput, inputRefs[8]);
    const donationTagId = usePageInput(nextInput, inputRefs[9]);
    

    useEffect(() => {
        teamId.setValue(() => teamId);
        mainCategoryId.setValue(() => ());
    }, [teamId.value]);

    // 이벤트 핸들러
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const handleContentChange = (value) => {
        setContent(value); 
    };
    const handleMainImgUrlChange = (value) => {
        setMainImg(value);
    };

    // 비동기 통신
    const handleSubmitButton = () => {
        axios.post('http://localhost:8080/main/write', {
            donationPageId: 1, 
            teamId: null, 
            mainCategoryId: null, 
            donationCategoryId: null, 
            donationName: title,
            createDate: null, 
            endDate: null, 
            storyTitle: null, 
            storyContent: content,
            mainImgUrl: mainImg, 
            donationTagId: null, 
            donationPageShow: null 
        })
        .then(response => {
            console.log(response.data);
            alert("저장 성공")
            window.location.reload(); // 페이지 새로고침
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handleCancelButton  = () => {
        if (window.confirm("작성 중인 내용을 취소하시겠습니까?")) {
            setTitle("");
            setContent("");
            setMainImg("");
            alert("작성이 취소 되었습니다.");
        }
    };

    // react-quill 관련
    const quillRef = useRef();
    const modules = useMemo(() => {
        return {
            toolbar: [
                [{ font: [] }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["link", "image"],
                ["clean"],
            ]   
        }
    }, []);

    const formats = [
        "font",
        "size",
        "header",
        "color",
        "background",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
    ];

    // 파일 업로드 관련
    const mainImgFileInput = useRef(null);
    const fileChange = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
            reader.onload = () => {
                const base64String = reader.result; // 변환된 base64 문자열
                setMainImg(base64String); // 메인 이미지 상태 설정
                resolve();
            };
        });
    };

    return (       
        <>
            <div>
                <input type="text" placeholder='제목' value={title} onChange={handleTitleChange} />
            </div>
            
            <Select 
                options={fundCategory} 
                value={mainCategoryId.value}
            /> 
            <div>
                <h2>메인 이미지 추가</h2>
                <label htmlFor="inputFile"></label>
                <input  
                    id="inputFile" 
                    type="file" 
                    name="file" 
                    value={setMainImg}
                    accept='image/*'
                    style={{ display: "block" }}
                    onChange={(e) => {fileChange(e.target.files[0])}} 
                /> 
                <img src={mainImg}/> 
            </div>
            
            <div css={textEditorLayout}>
                <ReactQuill
                    value={content}
                    onChange={handleContentChange}
                    modules={modules}
                    formats={formats}
                    theme="snow"
                    placeholder="내용을 입력해주세요."
                    style={{ height: '600px', margin: "50px" }}
                />
            </div>
            
            <div style={buttonBox }>
                <button onClick={handleSubmitButton}>작성완료</button>
                <button onClick={handleCancelButton}>취소</button>
            </div>     
        </>
    );
}

export default DonationPageboard;
