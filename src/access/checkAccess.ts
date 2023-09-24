/***
 *  判断用户是否具有某个权限
 * @param loginUser
 * @param needAccess
 */

import ACCESS_ENUM from "@/access/assessEnum";

const checkAccess = (loginUser: any, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;

  // console.log(loginUser.userRole, needAccess);
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }
  if (needAccess === ACCESS_ENUM.USER) {
    //登录就可以
    if (loginUserAccess !== ACCESS_ENUM.NOT_LOGIN) {
      return true;
    }
  }
  // 管理员
  if (needAccess === ACCESS_ENUM.ADMIN) {
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }
  return true;
};

export default checkAccess;
