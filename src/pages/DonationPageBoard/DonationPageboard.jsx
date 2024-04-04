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

const textEditorLayout = css `
    overflow-y: auto;  
    margin-bottm: 20px;  
`;

function DonationPageboard() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [ fundCategory, setFundCategory ] = useState([])

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

    const nextInput = (ref) => {
        ref.current.focus();
    }
    const teamId = usePageInput(nextInput, inputRefs[1]);
    const mainCategoryId = usePageInput(nextInput, inputRefs[2]);
    const donationCategoryId = usePageInput(nextInput, inputRefs[3]);
    const donation_name = usePageInput(nextInput, inputRefs[4]);
    const goalAmount = usePageInput(nextInput, inputRefs[5]);
    const storyTitle = usePageInput(nextInput, inputRefs[6]);
    const storyConetent = usePageInput(nextInput, inputRefs[7]);
    const mainImgUrl = usePageInput(nextInput, inputRefs[8]);
    const donationTagId = usePageInput(nextInput, inputRefs[9]);

    useEffect(() => {
        // teamId 상태가 변경될 때만 setValue 호출하도록 수정
        teamId.setValue(() => teamId);
    }, [teamId.value]); // teamId 상태 값이 변경될 때만 useEffect 실행

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const handleContentChange = (value) => {
        setContent(value); 
    };

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
            mainImgUrl: null, 
            donationTagId: null, 
            donationPageShow: null 
        })
        .then(response => {
            console.log(response.data);
            alert("저장 성공")
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const handleCancelButton  = () => {
        if (window.confirm("작성 중인 내용을 취소하시겠습니까?")) {
            setTitle("");
            setContent("");
            alert("작성이 취소 되었습니다.");
          }
    }




    const registerBookMutation = useMutation({
        mutationKey: "registerBookMutation",
        mutationFn: registerDonationPage,
        onSuccess: response => {
            alert("추가완료.");
            window.location.replace("/main/write");
        }
    }); 

    const quillRef = useRef()
     const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          ["blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }, "link", "image"],
        ],
      },
    }
  }, [])

  const [ mainImg, setMainImg ] = useState(""); // 글 메인 이미지
  const mainImgFileInput = useRef(null);

    return (       

    <>
    <div>
        <input type="text" placeholder='제목' value={title} onChange={handleTitleChange} />
    </div>
    
    <Select options={fundCategory} /> {/* options prop 추가 */}

    <div>
        
    </div>

        <div css={textEditorLayout}>
                <ReactQuill
                    value={content}
                    onChange={handleContentChange}
                    modules={modules}
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