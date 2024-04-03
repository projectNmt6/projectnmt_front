import { useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import axios from 'axios'; // axios 라이브러리 import
import { useMutation } from 'react-query';
import { registerDonationPage } from '../../apis/api/bookApi';

function DonationPageboard() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

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

    const registerBookMutation = useMutation({
        mutationKey: "registerBookMutation",
        mutationFn: registerDonationPage,
        onSuccess: response => {
            alert("추가완료.");
            window.location.replace("/write");
        }
    }); 
    


    return (

        <div>
            <div>
                <input type="text" placeholder='제목' value={title} onChange={handleTitleChange} />
            </div>

            <Editor
                previewStyle="vertical"
                height="600px"
                initialEditType="wysiwyg"
                useCommandShortcut={false}
                hideModeSwitch= {true}
                language="ko-KR"
                value={content}
                onChange={handleContentChange}
                
            />
            <button onClick={handleSubmitButton }>작성완료</button>
        </div>
    );
}

export default DonationPageboard;