import constant from '../core/common/constant';
import axios from 'axios';
import { handleError } from '../core/common/commonFunction';

/**
 * Cập nhật thông tin
 * @param {*} data
 * @returns
 */
const edit = async (data) => {
  try {
    const res = await axios.post(
      `${constant.API_URL}/api/${constant.API_VER}/users`,
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

/**
 * Service đăng nhập
 * @param {*} loginInfo thông tin đăng nhập
 * @returns Trả về thông tin đăng nhập nếu thành công, lỗi nếu thất bại
 */
const login = async (loginInfo) => {
  try {
    const res = await axios.post(
      `${constant.API_URL}/api/${constant.API_VER}/users/login`,
      loginInfo
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
 * Service đăng ký
 * @param {*} user thông tin đăng ký
 * @returns Trả về thông tin đăng nhập nếu thành công, lỗi nếu thất bại
 * Created by: phamvanlinhxyz - 15.11.2022
 */
const register = async (user) => {
  try {
    const res = await axios.post(
      `${constant.API_URL}/api/${constant.API_VER}/users/register`,
      user
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
  register,
  login,
  edit,
};
