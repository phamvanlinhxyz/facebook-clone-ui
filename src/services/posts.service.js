import constant from '../core/common/constant';
import axios from 'axios';
import { handleError } from '../core/common/commonFunction';

/**
 * Tạo bài viết mới
 * @param {*} postBody bài viết
 * @returns
 */
const create = async (postBody) => {
  try {
    const res = await axios.post(
      `${constant.API_URL}/api/${constant.API_VER}/posts/create`,
      postBody
    );

    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

const getList = async (userToken) => {
  try {
    const res = await axios.get(
      `${constant.API_URL}/api/${constant.API_VER}/posts/list`,
      {
        headers: { Authorization: `Bearer ${userToken}` },
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

export default {
  create,
  getList,
};
