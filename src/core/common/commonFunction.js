import * as FileSystem from 'expo-file-system';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import moment from 'moment';
import { storage } from '../../helpers';
import { authResource } from '../../resources';
import commonResource from '../../resources/commonResource';
import { enumFileType, enumNotificationType } from './enum';
import { io } from 'socket.io-client';
import constant from '../../core/common/constant';
import notiRequest from '../../../assets/images/noti-request.png';
import notiAccept from '../../../assets/images/noti-accept.png';
import notificationResource from '../../resources/notificationResource';

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

export const convertTimeToAgo = (time) => {
  var secondAgo = Math.round(parseInt(Date.now() - Date.parse(time)) / 1000);

  if (secondAgo < 5) return commonResource.now;
  if (secondAgo < 60) return secondAgo.toString() + commonResource.secondAgo;
  if (Math.round(secondAgo / 60) < 60)
    return Math.round(secondAgo / 60).toString() + commonResource.minuteAgo;
  if (Math.round(secondAgo / (60 * 60)) < 24)
    return (
      Math.round(secondAgo / (60 * 60)).toString() + commonResource.hourAgo
    );
  if (Math.round(secondAgo / (60 * 60 * 24)) < 30)
    return (
      Math.round(secondAgo / (60 * 60 * 24)).toString() + commonResource.dayAgo
    );
  return (
    Math.round(secondAgo / (60 * 60 * 24 * 30)).toString() +
    commonResource.monthAgo
  );
};

export const convertDateTimeByFormat = (time, format) => {
  var timeString = new Date(time).toString();
  console.log(timeString);
  if (timeString) {
    return moment(timeString).format(format);
  }
  return null;
};

let socketClient = null;

/**
 * Kết nối socket
 * @param {*} token
 */
export const connectSocket = (token) => {
  if (!socketClient) {
    const socket = io(constant.API_SOCKET, {
      withCredentials: true,
      transportOptions: {
        polling: {
          extraHeaders: {
            token: token,
          },
        },
      },
    });
    socketClient = socket;
  }
  return socketClient;
};

/**
 * Lấy ra socket
 * @returns
 */
export const getSocket = () => {
  return socketClient;
};

/**
 * Lấy icon thông báo
 * @param {*} type
 * @returns
 */
export const getNotificationIcon = (type) => {
  switch (type) {
    case enumNotificationType.requestFriend:
      return notiRequest;
      break;
    case enumNotificationType.acceptRequest:
      return notiAccept;
      return;
    default:
      break;
  }
};

/**
 * Convert số cho dễ nhìn. VD: 1,1K 2,3M
 * @param {*} number
 * @returns
 */
export const convertNumber = (number) => {
  let sNumber = number.toString();
  if (parseInt(number) >= 1000) {
    sNumber = (number / 1000).toFixed(1).toString() + 'K';
  } else if (parseInt(number >= 1000000)) {
    sNumber = (number / 1000000).toFixed(1).toString() + 'M';
  }
  return sNumber.replace('.', ',');
};

/**
 * Build câu thông báo theo type
 * @param {*} type
 * @returns
 */
export const buildNotificationContent = (type) => {
  switch (type) {
    case enumNotificationType.requestFriend:
      return notificationResource.requestFriend;
      break;
    case enumNotificationType.acceptRequest:
      return notificationResource.acceptRequest;
      break;
    default:
      break;
  }
};
