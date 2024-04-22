import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

function LoginModal({setShowModal}) {
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");



    return (
        <div>
            
            <div>
                로그인이 필요한 기능입니다.
                로그인 하시겠습니까?
            </div>

            <div>
                <button>취소</button>
                <button>확인</button>
            </div>
        </div>
    );
}

export default LoginModal;