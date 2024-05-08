import { Global, css } from '@emotion/react';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../apis/filrebase/config/firebaseConfig';
import { v4 as uuid } from "uuid"
import { toolbarStyles } from './style';

/** @jsxImportSource @emotion/react */
Quill.register('modules/imageActions', ImageActions);
Quill.register('modules/imageFormats', ImageFormats);

export const textEditorLayout = css`
    position: relative;
    height: 500px; // 전체 컨테이너 높이 설정
    overflow-y: auto; // 내부 스크롤 활성화
`;


const globalStyles = css`
.ql-toolbar {
  position: sticky;
  top: 0;
  background: white;
  z-index: 1000;
}
@font-face {
    font-family: 'NEXON Lv1 Gothic OTF';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv1 Gothic OTF.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
  font-family: 'RIDIBatang';
  src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/RIDIBatang.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Pretendard-Regular';
  src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'D2Coding';
  src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_three@1.0/D2Coding.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}


.ql-font-nexon-gothic-otf {
    content: 'NEXON Lv1 Gothic OTF';
    font-family: 'NEXON Lv1 Gothic OTF', sans-serif;
}

.ql-font-ridibatang {
    font-family: 'RIDIBatang', serif;
}

.ql-font-pretendard-regular {
  content: 'Pretendard-Regular';
    font-family: 'Pretendard-Regular', serif;
}

.ql-font-d2coding {
  content: 'D2Coding';
    font-family: 'D2Coding', sans-serif;
}


    // 폰트 스타일 정의

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="nexon-gothic-otf"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="nexon-gothic-otf"]::before {
      content: 'NEXON Lv1';
      font-family: 'NEXON Lv1 Gothic OTF', serif;
  }


  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="ridibatang"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="ridibatang"]::before {
      content: 'RIDIBatang';
      font-family: 'RIDIBatang', serif;
  }
  
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="pretendard-pegular"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="pretendard-pegular"]::before {
      content: 'Pretendard';
      font-family: 'Pretendard-Regular', serif;
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="d2coding"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="d2coding"]::before {
      content: 'D2Coding';
      font-family: 'D2Coding', sans-serif;
  }
  
  
`;


const Font = Quill.import('formats/font');
Font.whitelist = ['nexon-gothic-otf', 'ridibatang','pretendard-pegular', 'd2coding']; // 폰트 이름을 class 이름과 동일하게 설정
Quill.register(Font, true);


function TextEditor({ content, setContent, downloadURL }) {

    const ReactQuillRef = useRef();
    const imageHandler = () =>{
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accpet", "image/*");
      input.onchange = async () => {
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
  
    const modules = useMemo(
        () => ({
          imageActions: {},
          imageFormats: {},
          // 툴바 설정
          toolbar: {
            container: [
              [{ font: ['sans-serif', 'serif', 'nexon-gothic-otf', 'ridibatang', 'pretendard-pegular', 'd2coding'] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }], // 정렬, 글자 색, 글자 배경색 설정
              ['bold', 'italic', 'underline', 'strike', 'blockquote'], // 굵기, 기울기, 밑줄 등 부가 tool 설정
              [{ align: [] },{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }], // 리스트, 인덴트 설정
              ['link', 'image'], // 링크, 이미지, 비디오 업로드 설정              
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
        'font',
        'header','bold','italic','underline','strike',
        'align','color',
        'blockquote','list','bullet','indent',
        'link','image',
        'background','float',
        'height','width'
      ];
      const editorContainerStyle = css`
      position: relative; // 컨테이너를 상대 위치로 설정
      height: 500px; // 전체 컨테이너의 높이 설정
      overflow-y: auto; // 내부 스크롤 활성화
    `;
    
    const toolbarStyle = css`
      .ql-toolbar {
        position: sticky; // 툴바를 상단에 고정
        top: 0; // 가장 상단에 위치
        background: white; // 스크롤 시 배경이 투명해지는 것을 방지
        z-index: 1; // 다른 요소들 위에 오도록 설정
      }
    `;
    return (
      <div css={textEditorLayout}>
      <Global styles={globalStyles} />
       <ReactQuill
           value={content}
           onChange={setContent}
           modules={modules}
           formats={formats}
           theme="snow"
           placeholder="내용을 입력해주세요."
           ref={ReactQuillRef}
           style={{ width: '700px', height: '400px' }} // 에디터 영역 높이 수정
       />
   </div>
    );
}

export default TextEditor;