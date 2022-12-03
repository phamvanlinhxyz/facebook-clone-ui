import constant from '../core/common/constant';
import axios from 'axios';
import { handleError } from '../core/common/commonFunction';

/**
 * Tìm kiếm
 * @param {*} key key tìm kiếm
 * @returns
 */
const search = async (key) => {
  try {
    const res = await axios.get(
      `${constant.API_URL}/api/${constant.API_VER}/search/${key}`
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
  search,
};
