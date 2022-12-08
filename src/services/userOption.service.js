import constant from '../core/common/constant';
import axios from 'axios';
import { handleError } from '../core/common/commonFunction';

/**
 * Cập nhật option
 * @param {*} optionName
 * @param {*} optionValue
 * @returns
 */
const updateOptionByName = async (optionName, optionValue) => {
  try {
    const res = await axios.post(
      `${constant.API_URL}/api/${constant.API_VER}/userOptions/${optionName}`,
      { optionValue }
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
 * Lấy user option theo tên
 * @param {*} optionName
 * @returns
 */
const getOptionByName = async (optionName) => {
  try {
    const res = await axios.get(
      `${constant.API_URL}/api/${constant.API_VER}/userOptions/${optionName}`
    );

    return {
      success: true,
      data: res.data,
    };
  } catch (e) {
    return handleError(error);
  }
};

export default { getOptionByName, updateOptionByName };
