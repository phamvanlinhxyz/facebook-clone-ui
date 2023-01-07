import constant from '../core/common/constant';
import axios from 'axios';
import { handleError } from '../core/common/commonFunction';

/**
 * Cập nhật option
 * @param {*} optionName
 * @param {*} optionValue
 * @returns
 */
const listNotification = async (limit, offset) => {
  try {
    const res = await axios.get(
      `${constant.API_URL}/api/${constant.API_VER}/notifications?limit=${limit}&offset=${offset}`
    );

    return {
      success: true,
      data: res.data,
    };
  } catch (e) {
    return handleError(error);
  }
};

/**
 * Cập nhật thông báo
 * @param {*} data
 * @param {*} id
 * @returns
 */
const updateNotification = async (data, id) => {
  try {
    const res = await axios.put(
      `${constant.API_URL}/api/${constant.API_VER}/notifications/${id}`,
      data
    );

    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

export default { listNotification, updateNotification };
