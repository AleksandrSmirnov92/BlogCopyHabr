const checkAuthorization = (
  userId: string,
  getCookie: (name: string) => string | RegExp
) => {
  if (userId === null && !getCookie("nickname")) {
    return false;
  }
  return true;
};
export default checkAuthorization;
