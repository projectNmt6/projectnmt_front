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
    overflow-y: auto;
    margin-bottom: 20px;
`;

const globalStyles = css`

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
  font-family: 'Cafe24Oneprettynight';
  src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.1/Cafe24Oneprettynight.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

@font-face {
    font-family: 'BMYEONSUNG';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMYEONSUNG.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="10px"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="10px"]::before {
      content: '10px';
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="12px"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="12px"]::before {
      content: '12px';
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="14px"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="14px"]::before {
      content: '14px';
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="16px"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16px"]::before {
      content: '16px';
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="18px"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="18px"]::before {
      content: '18px';
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="20px"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20px"]::before {
      content: '20px';
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="24px"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="24px"]::before {
      content: '24px';
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="36px"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="36px"]::before {
      content: '36px';
  }
  .ql-font-nexon-gothic-otf {
    content: 'NEXON Lv1 Gothic OTF';
    font-family: 'NEXON Lv1 Gothic OTF', sans-serif;
}
.ql-font-ridibatang {
    font-family: 'RIDIBatang', serif;
}

.ql-font-bmyeonsung {
  content: 'BMYEONSUNG';
    font-family: 'BMYEONSUNG', sans-serif;
}


    // 폰트 스타일 정의
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="nexon-gothic-otf"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="nexon-gothic-otf"]::before {
      content: 'NEXON Lv1';
      font-family: 'NEXON Lv1 Gothic OTF', sans-serif;
  }


  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="ridibatang"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="ridibatang"]::before {
      content: 'RIDIBatang';
      font-family: 'RIDIBatang', serif;
  }
  
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="bmyeonsung"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="bmyeonsung"]::before {
      content: 'bmyeonsung';
      font-family: 'bmyeonsung', sans-serif;
  }
  
  
`;

const Size = Quill.import('attributors/style/size');
Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px', '24px', '36px'];
Quill.register(Size, true);
const Font = Quill.import('formats/font');
Font.whitelist = ['nexon-gothic-otf', 'ridibatang','bmyeonsung']; // 폰트 이름을 class 이름과 동일하게 설정
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
              [{ font: ['sans-serif', 'serif', 'nexon-gothic-otf', 'ridibatang', 'bmyeonsung'] }],
              [{ size: ['10px', '12px', '14px', '16px', '18px', '20px', '24px', '36px'] }],
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
        'size','bold','italic','underline','strike',
        'align','color',
        'blockquote','list','bullet','indent',
        'link','image',
        'background','float',
        'height','width'
      ];

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
                style={{ width: '700px', height: '500px', margin: "50px" }}
            />
        </div>
    );
}

export default TextEditor;
