import * as FileSystem from 'expo-file-system';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../helpers';
import { authResource } from '../../resources';
import { enumFileType } from './enum';

/**
 * Xử lý error trả về
 * @param {*} err
 * @returns
 */
export const handleError = (err) => {
  return {
    success: false,
    message: err.response.data.message,
  };
};

/**
 * Validate số điện thoại
 * @param {*} phonenumber
 * @returns
 */
export const validatePhonenumber = (phonenumber) => {
  const regex = /^([+]84|84|0)+([3|5|7|8|9])+([0-9]{8})$/;
  if (!phonenumber) {
    return authResource.phonenumberError;
  }
  if (!regex.test(phonenumber.toString())) {
    return authResource.phonenumberNotValid;
  }
  return null;
};

/**
 * Validate mật khẩu
 * @param {*} pass
 * @returns
 */
export const validatePass = (pass) => {
  const regex = /[^A-Za-z0-9]/;
  if (pass.length < 8) {
    return authResource.passwordError;
  }
  if (regex.test(pass.toString())) {
    return authResource.passwordNotValid;
  }
  return null;
};

/**
 * Upload file lên firenase
 * @param {*} base64 file dạng base64
 * @param {*} fileType dạng file: 0 - ảnh, 1 - video, 2 - khác
 * @returns {fileName, fileLink}
 */
export const uploadFileToFirebase = async (base64, fileType) => {
  try {
    // Tạo blob
    const fetchRes = await fetch(base64);
    const blob = await fetchRes.blob();

    // Tạo file trên firebase
    let fileUrl = '';
    switch (fileType) {
      case enumFileType.image:
        fileUrl = `images/image-${Date.now()}`;
        break;
      case enumFileType.video:
        fileUrl = `videos/video-${Date.now()}`;
        break;
      default:
        fileUrl = `other/other-${Date.now()}`;
        break;
    }
    const fileRef = ref(storage, fileUrl);

    // Upload
    const uploadRes = await uploadBytes(fileRef, blob);
    const fileLink = await getDownloadURL(uploadRes.ref);

    return {
      fileName: uploadRes.metadata.name,
      fileLink: fileLink,
    };
  } catch (error) {
    console.log(error);
  }
};
