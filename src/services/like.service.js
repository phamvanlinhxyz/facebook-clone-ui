import constant from '../core/common/constant';
import axios from 'axios';
import { handleError } from '../core/common/commonFunction';

/**
 * Like bài viết
 */
const action = async (postId) => {
  try {
    const res = await axios.post(
      `${constant.API_URL}/api/${constant.API_VER}/postLike/${postId}`
    );

    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

export default { action };
