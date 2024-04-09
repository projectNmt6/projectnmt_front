import React, { useRef } from 'react';
import { getUserListRequest } from '../../../apis/api/Admin';
import { useQuery } from 'react-query';
import * as s from "./style";

function UserManagement(props) {
    // const inputRef = [
    //     useRef(),//0bookId
    //     useRef(),//1isbn
    //     useRef(),//2형식
    //     useRef(),//3카테고리
    //     useRef(),//4도서명
    //     useRef(),//5저자명
    //     useRef(),//6출판사
    //     useRef() //7Url
    // ];

    // const userListQuery = useQuery(["userListQuery"], getUserListRequest,{//focus 변경정로도
    //     retry: 0,
    //     refetchOnWindowFocus: false,
    //     onSuccess: response => {
    //         console.log(response.data);
    //     },
    //     onError: error => {
    //         console.log("오류");
    //         console.log(error);
    //     }
    // });
    return (
        <></>
        // userListQuery.map(user => {
        //     <div css={s.topLayout}>
        //         <table css={s.registerTable}>
        //             <tbody>
        //                 <tr>
        //                     <th css={s.registerTh}>도서코드</th>
        //                     <td>
        //                         <BookRegiserInout 
        //                             value={bookId.value}
        //                             bookRef={inputRef[0]}
        //                             onChange={bookId.handleOnChange}
        //                             onKeyDown={bookId.handleOnKeyDown}
        //                             isDisable={true}
                                    
        //                         />
        //                     </td>
        //                     <th css={s.registerTh}>ISBN</th>
        //                     <td>
        //                         <BookRegiserInout 
        //                             value={isbn.value}
        //                             bookRef={inputRef[1]}
        //                             onChange={isbn.handleOnChange}
        //                             onKeyDown={isbn.handleOnKeyDown}
        //                             isDisable={![1, 2].includes(actionStatus)}
        //                         />
        //                     </td>
        //                     <td rowSpan={5} css={s.preview}>
        //                         <div css={s.imageBox}>
        //                             <img src={!imgUrl.value 
        //                                 ? "https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-600nw-2079504220.jpg" 
        //                                 : imgUrl.value } alt="" />
        //                         </div>
        //                     </td>
        //                 </tr>
        //                 <tr>
        //                     <th css={s.registerTh}>도서형식</th>
        //                     <td>
        //                         <Select styles={selectStyle}
        //                             value={bookTypeId.value}
        //                             options={bookTypesOption}
        //                             onKeyDown={bookTypeId.handleOnKeyDown}
        //                             onChange={bookTypeId.handleOnChange}
        //                             ref={inputRef[2]}
        //                         />
        //                     </td>
        //                     <th css={s.registerTh}>카테고리</th>
        //                     <td>
        //                         <Select styles={selectStyle}
        //                             options={categoriesOption}
        //                             value={categoryId.value}
        //                             onKeyDown={categoryId.handleOnKeyDown} 
        //                             onChange={categoryId.handleOnChange}
        //                             ref={inputRef[3]}
        //                         />
        //                     </td>
        //                 </tr>
        //                 <tr>
        //                     <th css={s.registerTh}>도서명</th>
        //                     <td colSpan={3}>
        //                         <BookRegiserInout 
        //                             value={bookName.value}
        //                             bookRef={inputRef[4]}
        //                             onChange={bookName.handleOnChange}
        //                             onKeyDown={bookName.handleOnKeyDown}
        //                             isDisable={![1, 2].includes(actionStatus)}

        //                         />
        //                     </td>
        //                 </tr>
        //                 <tr>
        //                     <th css={s.registerTh}>저자명</th>
        //                     <td>
        //                         <BookRegiserInout 
        //                             value={authorName.value}
        //                             bookRef={inputRef[5]}
        //                             onChange={authorName.handleOnChange}
        //                             onKeyDown={authorName.handleOnKeyDown}
        //                             isDisable={![1, 2].includes(actionStatus)}

        //                         />
        //                     </td>
        //                     <th css={s.registerTh}>출판사</th>
        //                     <td>
        //                         <BookRegiserInout 
        //                             value={publisherName.value}
        //                             bookRef={inputRef[6]}
        //                             onChange={publisherName.handleOnChange}
        //                             onKeyDown={publisherName.handleOnKeyDown}
        //                             isDisable={![1, 2].includes(actionStatus)}

        //                         />
        //                     </td>
        //                 </tr>
        //                 <tr>
        //                     <th css={s.registerTh}>표지URL</th>
        //                     <td colSpan={3}>
        //                         <div css={s.imgUrl}>
        //                             <span css={s.imgUrlBox}>
        //                                 <BookRegiserInout 
        //                                     value={imgUrl.value}
        //                                     bookRef={inputRef[7]}
        //                                     onChange={imgUrl.handleOnChange}
        //                                     onKeyDown={imgUrl.handleOnKeyDown}
        //                                     isDisable={![1, 2].includes(actionStatus)}

        //                                 />
        //                             </span>
        //                             <input type="file" 
        //                                 style={{
        //                                     display:"none"
        //                                 }} 
        //                                 onChange={handlefileChange}
        //                                 ref={fileRef}
        //                             />
        //                             <button css={s.imgAddButton} onClick={() => fileRef.current.click()} disabled={![1, 2].includes(actionStatus)}>
        //                                 <CiSquarePlus/>
        //                             </button>
        //                         </div>
        //                     </td>
        //                 </tr>
        //             </tbody>
        //         </table>
        //     </div>
        // })
    );
}

export default UserManagement;