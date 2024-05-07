import React, { useState, useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";

function DonationHeader({ donationPageId, selectedTab, handleTabChange, contentRef }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const checkVisibility = () => {
            if (!contentRef.current) {
                return; // contentRef가 없으면 함수를 종료합니다.
            }
            console.log(contentRef)
            // contentRef 요소의 뷰포트 내 상단 위치를 계산
            const targetTop = contentRef.current.getBoundingClientRect().top;

            // 요소가 뷰포트 상단보다 위로 지나갔는지 확인 (즉, 사용자가 요소를 지나쳤는지 확인)
            if (targetTop < 0) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', checkVisibility);
        checkVisibility(); // 초기 위치 확인

        return () => {
            window.removeEventListener('scroll', checkVisibility);
        };
    }, [contentRef]); // contentRef가 변경될 때마다 이 효과를 다시 실행합니다.

    return (
        <div style={{ display: isVisible ? 'block' : 'none' }}>
            <div css={[s.headerPanel2, { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }]}>
                <div css={s.buttonGroupContainer2}>
                    <div css={s.buttonGroup2}>
                        <button
                            css={[s.tabButton2, selectedTab === 'story' && s.activeTabButton2]}
                            onClick={() => handleTabChange('story')}
                        >
                        Story
                        </button>
                        <button
                            css={[s.tabButton2, selectedTab === 'donators' && s.activeTabButton2]}
                            onClick={() => handleTabChange('donators')}
                        >
                        Donators
                        </button>
                        <button
                            css={[s.tabButton2, selectedTab === 'news' && s.activeTabButton2]}
                            onClick={() => handleTabChange('news')}
                        >
                        News
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DonationHeader;
