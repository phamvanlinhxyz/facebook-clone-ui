import constant from '../core/common/constant';
import axios from 'axios';
import { handleError } from '../core/common/commonFunction';

/**
 * Lấy danh sách trả lời comment
 * @param {*} commentId Id comment
 * @returns
 */
const listAnswer = async (commentId, offset) => {
  try {
    const res = await axios.get(
      `${constant.API_URL}/api/${constant.API_VER}/postComment/answers/${commentId}?offset=${offset}`
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
 * Lấy danh sách comment
 * @param {*} postId Id bài viết
 * @returns
 */
const list = async (postId, offset) => {
  try {
    const res = await axios.get(
      `${constant.API_URL}/api/${constant.API_VER}/postComment/${postId}?offset=${offset}`
    );

    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

const create = async (data, postId) => {
  try {
    console.log(data);
    const res = await axios.post(
      `${constant.API_URL}/api/${constant.API_VER}/postComment/${postId}`,
      data
    );

    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    console.log(error);
    // return handleError(error);
  }
};

export default {
  list,
  listAnswer,
  create,
};
