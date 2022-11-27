import constant from '../core/common/constant';
import axios from 'axios';
import { handleError } from '../core/common/commonFunction';

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

export default {
  create,
};
