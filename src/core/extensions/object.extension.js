/**
 * Clone object
 * @param {*} obj
 * @returns
 */
const cloneObbject = (obj) => {
  if (obj !== null) {
    obj = JSON.parse(JSON.stringify(obj));
  }
  return obj;
};

Object.clone = cloneObbject;
