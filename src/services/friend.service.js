import constant from '../core/common/constant';
import axios from 'axios';
import { handleError } from '../core/common/commonFunction';

/**
 * Lấy danh sách block
 * @returns
 */
const listBlock = async () => {
  try {
    const res = await axios.get(
      `${constant.API_URL}/api/${constant.API_VER}/friends/block`
    );

    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Lấy danh sách yêu cầu kết bạn
 * @returns
 */
const listRequest = async (userToken, offset) => {
  try {
    let config;
    if (userToken) {
      config = {
        headers: { Authorization: `Bearer ${userToken}` },
      };
    }
    const res = await axios.get(
      `${constant.API_URL}/api/${constant.API_VER}/friends/getRequests?limit=${constant.LOAD_LIMIT}&offset=${offset}`,
      config ? config : null
    );

    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Lấy ra danh sách gợi ý
 * @param {*} userToken
 * @param {*} offset
 * @returns
 */
const listSuggest = async (userToken, offset) => {
  try {
    let config;
    if (userToken) {
      config = {
        headers: { Authorization: `Bearer ${userToken}` },
      };
    }
    const res = await axios.get(
      `${constant.API_URL}/api/${constant.API_VER}/friends/getSuggests?limit=${constant.LOAD_LIMIT}&offset=${offset}`,
      config ? config : null
    );

    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Trả lời yêu cầu kết bạn
 * @param {*} sender
 * @param {*} isAccept
 * @returns
 */
const replyRequest = async (sender, isAccept) => {
  try {
    const res = await axios.post(
      `${constant.API_URL}/api/${constant.API_VER}/friends/replyRequest`,
      {
        senderId: sender,
        isAccept: isAccept,
      }
    );

    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Gửi lời mời kết bạn
 * @param {*} receiverId
 * @returns
 */
const sendRequest = async (receiverId) => {
  try {
    const res = await axios.post(
      `${constant.API_URL}/api/${constant.API_VER}/friends/sendRequest`,
      {
        receiverId: receiverId,
      }
    );

    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Lấy 1 lời mời kết bạn
 * @param {*} sender
 * @returns
 */
const singleRequest = async (sender) => {
  try {
    const res = await axios.get(
      `${constant.API_URL}/api/${constant.API_VER}/friends/getRequest/${sender}`
    );

    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Lấy danh sách bạn bè
 * @param {*} userToken
 * @param {*} offset
 * @returns
 */
const listFriend = async (userToken, offset, search) => {
  try {
    let config;
    if (userToken) {
      config = {
        headers: { Authorization: `Bearer ${userToken}` },
      };
    }
    const res = await axios.get(
      `${constant.API_URL}/api/${constant.API_VER}/friends/list?limit=20&offset=${offset}&search=${search}`,
      config ? config : null
    );

    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

export default {
  listRequest,
  replyRequest,
  listSuggest,
  sendRequest,
  singleRequest,
  listFriend,
  listBlock,
};
