// useFileUpload.js
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { v4 as uuid } from "uuid";
import { storage } from '../apis/filrebase/config/firebaseConfig';

export function useFileUpload() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedUrls, setUploadedUrls] = useState([]);

  const handleImageUpload = async (files) => {
    const uploads = files.map(file => {
      return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `images/${uuid()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setUploadProgress(progress);
          },
          reject,
          () => {
            getDownloadURL(storageRef).then((url) => {
              resolve({ url, id: uuid() });
            }).catch(reject);
          }
        );
      });
    });
    
    const uploadedImages = await Promise.all(uploads);
    setUploadedUrls(uploadedImages.map(img => img.url));
  };

  return { uploadProgress, uploadedUrls, handleImageUpload };
}
