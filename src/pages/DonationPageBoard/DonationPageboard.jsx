import React, { useEffect, useMemo, useRef, useState } from 'react';
import { css } from '@emotion/react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import Select from 'react-select';
import { buttonBox } from './style';
import { imgUrlBox } from './style';
import { getDonationListRequest } from '../../apis/api/donationAPI';
import { useQuery } from 'react-query';

const textEditorLayout = css `
    overflow-y: auto;  
    margin-bottom: 20px;  
`;

function DonationPageboard() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [mainImg, setMainImg] = useState("");
    const [selectedDonationMainTag, setSelectedDonationMainTag] = useState(null);

    const [donationMainTagList, setDonationMainTagList] = useState([]);
    const [tagOption, setTagOption] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:8080/main/storytypes")
            .then(response => {
                console.log(response.data);
                setDonationMainTagList(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    
    useEffect(() => {
        setTagOption(donationMainTagList.map(mainTag => ({
            value: mainTag.mainCategoryId,
            label: mainTag.mainCategoryName
        })));
    }, [donationMainTagList]);
    
    const handleMainTagChange = (selectedOption) => {
        console.log(selectedOption);
        setSelectedDonationMainTag(selectedOption);
    };
    
    const handleSubmitButton = () => {
        axios.post('http://localhost:8080/main/write', {
            donationPageId: 1, 
            teamId: null, 
            mainCategoryId: selectedDonationMainTag.value,
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
            // window.location.reload(); 
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

    const modules = useMemo(() => {
        return {
            toolbar: [
                [{ font: [] }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ color: [] }, { background: [] }],
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

    const fileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setMainImg(reader.result);
        };
        reader.readAsDataURL(file);
    };


    const [donationList, setDonationList] = useState([]);
    const getDonationListQuery = useQuery(
        "getDonationQuery",
        async () => await getDonationListRequest({
            
        }),
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                setDonationList(response.data.map(donation => ({
                    ...donation
                })));
            }
        }
        );

    return (       
        <>
            <div>
                <input type="text" placeholder='제목' value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            
            <Select 
                options={tagOption || []} 
                value={selectedDonationMainTag}
                placeholder="종류를 선택해주세요"
                onChange={handleMainTagChange}
            />

            <div>
                <h2>메인 이미지 추가</h2>

                <div css={imgUrlBox}>
                    <label htmlFor="inputFile"></label>
                    <img src={mainImg} alt="Main" style={{ width: '300px', height: 'auto' }}/> 
                <input  
                    id="inputFile" 
                    type="file" 
                    name="file" 
                    accept='image/*'
                    style={{ display: "block" }}
                    onChange={fileChange} 
                    /> 
                    </div>
                    
            </div>
            
            <div css={textEditorLayout}>
                <ReactQuill
                    value={content}
                    onChange={setContent}
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
