/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useQuery } from "react-query";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FaPen } from "react-icons/fa6";
import { getDonationListRequest, getDonationTagRequest } from "../../../apis/api/DonationAPI";
import Progress from "../../../components/progress/Progress";
import LikeButton from "../../../components/LikeButton/LikeButton";
import { getLike } from "../../../apis/api/Like";

function NowDonationPage() {
    const [donationTagList, setDonationTagList] = useState([]);
    const [donationList, setDonationList] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [sortOrder, setSortOrder] = useState('최신순');  // 초기 정렬 상태를 명시적으로 설정
    const [selectedTagId, setSelectedTagId] = useState(null);
    const [visibleDonations, setVisibleDonations] = useState([]);
    const itemsPerPage = 30;
    const [currentPage, setCurrentPage] = useState(0);
    const [sortedDonations, setSortedDonations] = useState([]);
    useEffect(() => {
        const fetchDonationTags = async () => {
            try {
                const response = await getDonationTagRequest();
                const options = response.data.map(tag => ({
                    value: tag.donationTagId,
                    label: tag.donationTagName
                }));
                setDonationTagList(options);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDonationTags();
    }, []);

    useEffect(() => {
        const fetchDonationList = async () => {
            try {
                const response = await getDonationListRequest();
                const today = new Date();
                const validDonations = response.data.filter(donation => {
                    const endDate = new Date(donation.endDate);
                    return endDate > today;
                });

                const updatedDonationList = validDonations.map(donation => {
                    const endDate = new Date(donation.endDate);
                    const timeDiff = endDate - today;
                    const daysLeft = timeDiff / (1000 * 60 * 60 * 24);
                    console.log(donation.createDate)
                    return {
                        ...donation,
                        timeOut: daysLeft < 3,
                    };
                });
                setDonationList(updatedDonationList);
                setVisibleDonations(updatedDonationList.slice(0, itemsPerPage));
            } catch (error) {
                console.error(error);
            }
        };

        fetchDonationList();
    }, []);

    
    const getDonationListQuery = useQuery(
        "getDonationQuery",
        async () => await getDonationListRequest(),
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                const today = new Date();
                const validDonations = response.data.filter(donation => {
                    const endDate = new Date(donation.endDate);
                    return endDate < today;
                });
                const updatedDonationList = validDonations.map(donation => {
                    const endDate = new Date(donation.endDate);
                    const timeDiff = endDate - today;
                    const daysLeft = timeDiff / (1000 * 60 * 60 * 24);
                    console.log("1"+donation.createDate)
                    return {
                        ...donation,
                        timeOut: daysLeft < 3,
                    };
                });
                setDonationList(updatedDonationList);
                setVisibleDonations(updatedDonationList.slice(0, itemsPerPage));
               
            }
        }
    );


    useEffect(() => {
        const filtered = donationList.filter(donation =>
            !selectedTagId || donation.donationTagId === selectedTagId
        );
        console.log(donationTagList)
        setVisibleDonations(filtered.slice(0, itemsPerPage));
    }, [selectedTagId, donationList, itemsPerPage]);


    useEffect(() => {
        const fetchDonationTags = async () => {
            try {
                const response = await getDonationTagRequest();
                const options = response.data.map(tag => ({
                    value: tag.donationTagId,
                    label: tag.donationTagName
                }));
                setDonationTagList(options);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDonationTags();
    }, []);

    useEffect(() => {
        const filtered = donationList.filter(donation =>
            !selectedTagId || donation.donationTagId === selectedTagId
        );
        setVisibleDonations(filtered.slice(0, itemsPerPage));
    }, [selectedTagId, donationList, itemsPerPage]);



    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const response = await getDonationListRequest();
                const today = new Date();
                const validDonations = response.data.filter(donation => new Date(donation.endDate) >= today);
                setDonationList(validDonations);
            } catch (error) {
                console.error("Failed to fetch donations:", error);
            }
        };

        fetchDonations();
    }, []);

    const handleTagClick = (tagId) => {
        setSelectedTagId(tagId);
    };

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
        setCurrentPage(0);  // 현재 페이지를 0으로 리셋
    
        // 새 정렬 순서에 따라 보이는 기부 목록을 즉시 조정
        const sorted = applySorting(donationList, event.target.value);
        setSortedDonations(sorted);
        setVisibleDonations(sorted.slice(0, itemsPerPage));
    };
    
    // 정렬 순서에 따라 정렬을 적용하는 헬퍼 함수
    const applySorting = (donations, sortOrder) => {
        return donations.sort((a, b) => {
            const dateA = new Date(a.createDate);
            const dateB = new Date(b.createDate);
            switch (sortOrder) {
                case '최신순':
                    return dateB - dateA; // 여기서는 Date 객체의 비교를 수행합니다.
                case '추천순':
                    return b.countLike - a.countLike;
                case '종료임박순':
                    return new Date(a.endDate) - new Date(b.endDate);
                default:
                    return dateB - dateA;
            }
        });
    };
    
    

    useEffect(() => {
        const filteredDonations = donationList.filter(
            donation => !selectedTagId || donation.donationTagId === selectedTagId
        );
        const sorted = filteredDonations.sort((a, b) => {
            switch (sortOrder) {
                case '최신순':
                    return new Date(b.createDate) - new Date(a.createDate);
                case '추천순':
                    return b.countLike - a.countLike;
                case '종료임박순':
                    return new Date(a.endDate) - new Date(b.endDate);
                default:
                    return new Date(b.createDate) - new Date(a.createDate);
            }
        });
        setSortedDonations(sorted);
    }, [donationList, selectedTagId, sortOrder]);


    useEffect(() => {
        const visible = sortedDonations.slice(0, itemsPerPage);
        setVisibleDonations(visible);    
    }, [sortedDonations, currentPage, itemsPerPage]);   
    
    useEffect(() => {
        // 정렬 순서가 변경될 때만 sortedDonations를 재계산하고, 페이지 변경 시에는 하지 않음
        const sorted = applySorting(donationList, sortOrder);
        setSortedDonations(sorted);
        setVisibleDonations(sorted.slice(0, itemsPerPage));
    }, [donationList, sortOrder]);  // selectedTagId와 currentPage 종속성 제거
    
    useEffect(() => {
        const loadMoreVisibleDonations = () => {
            const newVisibleDonations = sortedDonations.slice(0, (currentPage + 1) * itemsPerPage);
            setVisibleDonations(newVisibleDonations);
        };
        loadMoreVisibleDonations();
    }, [currentPage, sortedDonations]);

    useEffect(() => {
        const onScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1) {
                setCurrentPage(current => current + 1);
            }
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <div css={s.tagContainer}>
                <button
                    key="alltag"
                    onClick={() => {
                        setSelectedTagId(null);  // 모든 태그가 선택되지 않았음을 명시적으로 설정
                        setSelectedTag(null);  // 필요한 경우 selectedTag도 초기화
                    }}
                    css={s.tagAllButton(selectedTag === null)}  // 스타일 적용 확인
                >전체보기</button>

                {donationTagList.map(tag => (
                    <button
                        key={tag.value}
                        onClick={() => handleTagClick(tag.value)}
                        aria-pressed={selectedTagId === tag.value}
                        css={s.tagButton}
                    >
                        {tag.label}
                    </button>
                ))}

            </div>
            <div css={s.selectItems}>
                <button css={s.rightButton(sortOrder === '최신순' ? true : false)} onClick={handleSortChange} value={"최신순"}>최신순</button>
                <button css={s.rightButton(sortOrder === '추천순' ? true : false)} onClick={handleSortChange} value={"추천순"}>추천순</button>
                <button css={s.rightButton(sortOrder === '종료임박순' ? true : false)} onClick={handleSortChange} value={"종료임박순"}>종료임박순</button>

            </div>
            <div css={s.donationList}>
                {
                    visibleDonations.map(
                        donation => (
                            <a href={`/donation?page=${donation.donationPageId}`} key={donation.donationPageId} css={s.linkStyle}>
                                <div key={donation.donationPageId} css={s.donationCard}>
                                    <div css={s.donationImage}>
                                        <img src={
                                            !donation.mainImgUrl
                                                ? "https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg"
                                                : donation.mainImgUrl
                                        } alt="" />
                                        {donation.timeOut && <div css={s.RunningOut(true)}>종료임박</div>}
                                    </div>
                                    <div css={s.donationDetails}>
                                        <div css={s.donationTitle}>
                                            <div>{donation.storyTitle}</div>
                                        </div>
                                        <div css={s.teamName}>{donation.teamName}</div>
                                        <div css={s.LikeButtonContainer}>

                                        <LikeButton donationPageId={donation.donationPageId} />
                                        </div>
                                        <Progress pageId={donation.donationPageId} />
                                    </div>
                                </div>
                            </a>
                        )
                    )
                }
            </div>
        </>
    );
}

export default NowDonationPage;