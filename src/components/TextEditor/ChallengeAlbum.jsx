import React, { useState, useRef } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "../../pages/DonationChallengerPage/style";
import { Line } from "rc-progress";
import { useFileUpload } from '../../hooks/useFileUpload';

function ChallengeAlbum({ handleImageUpload, uploadProgress, uploadedUrls }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imgFileRef = useRef();

  const handlePrev = () => {
    setCurrentImageIndex(prevIndex => (prevIndex - 1 + uploadedUrls.length) % uploadedUrls.length);
  };

  const handleNext = () => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % uploadedUrls.length);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    handleImageUpload(files);
  };


  return (
    <div>
      <button onClick={handlePrev}>이전</button>
      <input type="file" multiple ref={imgFileRef} onChange={handleFileChange} />
      <Line percent={uploadProgress} strokeWidth="4" strokeColor="#D3D3D3" />
      {uploadedUrls.length > 0 && (
        <img src={uploadedUrls[currentImageIndex]} alt="Uploaded" style={{ width: '300px', height: 'auto' }} />
      )}
      <button onClick={handleNext}>다음</button>
    </div>
  );
}

export default ChallengeAlbum;
