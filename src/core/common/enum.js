/**
 * Enum giới tính
 */
export const enumGender = {
  male: 1,
  female: 0,
  other: 2,
};

/**
 * Enum kiểm file
 */
export const enumFileType = {
  image: 0,
  video: 1,
  other: 2,
};

/**
 * Enum editmode
 */
export const enumEditMode = {
  add: 0,
  edit: 1,
};

/**
 * Enum trạng thái file
 */
export const enumMediaStatus = {
  old: 0,
  new: 1,
};

/**
 * Enum kiểu thông báo
 */
export const enumNotificationType = {
  requestFriend: 1,
  acceptRequest: 2,
  comment: 3,
};

/**
 * Enum trạng thái bài post
 */
export const enumPostType = {
  draft: 0,
  posted: 1,
  deleted: 2,
};

/**
 * Enum chính sách
 */
export const enumPolicyType = {
  term: 0, // Điều khoản dịch vụ
  privacy: 1, // Chính sách quyền riêng tư
  standard: 2, // Tiêu chuẩn cộng đồng
};
