import { css } from '@emotion/react';
import React, { useCallback, useMemo, useRef } from 'react';
import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../apis/filrebase/config/firebaseConfig';
import { v4 as uuid } from "uuid"

/** @jsxImportSource @emotion/react */
Quill.register('modules/imageActions', ImageActions);
Quill.register('modules/imageFormats', ImageFormats);

export const textEditorLayout = css`
    overflow-y: auto;
    margin-bottom: 20px;
`;

function TextEditor({ content, setContent, downloadURL }) {
    // console.log("onUploadImages" +onUploadImages)
    // const imageHandler = useCallback(() => {
    //     const input = document.createElement('input');
    //     input.setAttribute('type', 'file');
    //     input.setAttribute('accept', 'image/*');
    //     input.click();

    //     input.onchange = () => {
    //         const file = input.files[0];
    //         if (file) {
    //             onUploadImages(file); // 상위 컴포넌트로 파일 객체 전달
    //         }
    //     };
    // }, [onUploadImages]);

    const ReactQuillRef = useRef();
    const imageHandler = () =>{
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accpet", "image/*");
      input.onchange = async () => {
        console.log("work");
        const file = input.files[0];
        const storageRef = ref(storage, `images/${uuid()}_${file.name}`);
        const uploadResponse = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(uploadResponse.ref);
        const editor = ReactQuillRef.current.getEditor();
        const range = editor.getSelection(true);
        editor.insertEmbed(range.index, "image", downloadURL);
        editor.setSelection(range.index + 1);
      }
      input.click();
    }
  

    // const handleFileChange = (e) => {
    //     const loadedFiles = Array.from(e.target.files);
    //     onUploadImages(loadedFiles); // 상위 컴포넌트로 파일 데이터 전달
    // };

    const modules = useMemo(
        () => ({
          imageActions: {},
          imageFormats: {},
          // 툴바 설정
          toolbar: {
            container: [
              [{ header: [1, 2, false] }], // header 설정
              ['bold', 'italic', 'underline', 'strike', 'blockquote'], // 굵기, 기울기, 밑줄 등 부가 tool 설정
              [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }], // 리스트, 인덴트 설정
              ['link', 'image'], // 링크, 이미지, 비디오 업로드 설정
              [{ align: [] }, { color: [] }, { background: [] }], // 정렬, 글자 색, 글자 배경색 설정
              ['clean'] // toolbar 설정 초기화 설정
            ],
    
            // 핸들러 설정
            handlers: {
              image: imageHandler // 이미지 tool 사용에 대한 핸들러 설정
            },
    
            // 이미지 크기 조절
            ImageResize: {
              modules: ['Resize']
            }
          }
        }),
        [downloadURL]
      );

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'align',
        'color',
        'background',
        'float',
        'height',
        'width'
      ];


    const imgFileRef = useRef();

    return (
        <div css={textEditorLayout}>
            {/* <div>
                <input type="file" multiple ref={imgFileRef} onChange={handleFileChange} />
            </div> */}
            <ReactQuill
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                theme="snow"
                placeholder="내용을 입력해주세요."
                ref={ReactQuillRef}
                style={{ height: '500px', margin: "50px" }}
            />
        </div>
    );
}

export default TextEditor;
