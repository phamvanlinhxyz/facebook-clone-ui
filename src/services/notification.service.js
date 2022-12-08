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
      `${constant.API_URL}/api/${constant.API_VER}/notifications/listNotification?limit=${limit}&offset=${offset}`
    );

    return {
      success: true,
      data: res.data,
    };
  } catch (e) {
    return handleError(error);
  }
};

export default { listNotification };
