/**
 * Format string dùng khi gọi String.format
 * @param {*} str
 * @param  {...any} args
 * @returns
 */
const formatString = (str, ...args) => {
  for (let i = 0; i < args.length; i++) {
    let regex = new RegExp('\\{' + i + '\\}', 'gi');
    str = str.replace(regex, args[i]);
  }

  return str;
};

String.format = formatString;
