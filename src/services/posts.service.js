import constant from '../core/common/constant';
import axios from 'axios';
import { handleError } from '../core/common/commonFunction';

/**
 * Lấy bài viết theo Id
 * @param {*} postId
 * @returns
 */
const getPost = async (postId) => {
  try {
    const res = await axios.get(
      `${constant.API_URL}/api/${constant.API_VER}/posts/${postId}`
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
 * Tạo bài viết mới
 * @param {*} postBody bài viết
 * @returns
 */
const create = async (postBody) => {
  try {
    const res = await axios.post(
      `${constant.API_URL}/api/${constant.API_VER}/posts`,
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

/**
 * Lất danh sách bài viết
 * @param {*} userToken
 * @returns
 */
const getList = async (userToken) => {
  try {
    const res = await axios.get(
      `${constant.API_URL}/api/${constant.API_VER}/posts`,
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

/**
 * Chỉnh sửa bài viết
 * @param {*} body
 * @returns
 */
const edit = async (body) => {
  try {
    const res = await axios.put(
      `${constant.API_URL}/api/${constant.API_VER}/posts/${body.postId}`,
      body
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
 * Xóa bài viết
 * @param {*} id
 * @returns
 */
const deletePost = async (id) => {
  try {
    const res = await axios.delete(
      `${constant.API_URL}/api/${constant.API_VER}/posts/${id}`
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
  edit,
  deletePost,
  getPost,
};
