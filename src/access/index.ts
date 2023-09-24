import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "@/access/assessEnum";
import checkAccess from "@/access/checkAccess";

router.beforeEach(async (to, from, next) => {
  // if (to.meta?.access === "canAdmin") {
  //   if (store.state.user.loginUser?.role !== "admin") {
  //     next("/noAuth");
  //     return;
  //   }
  // }

  let loginUser = store.state.user.loginUser;
  // console.log("access: ", loginUser);
  // console.log(localStorage.getItem("user"));
  // 本地化存储获取
  // const loginUserLocal = localStorage.getItem("user") as string;
  // console.log(loginUserLocal);
  // if (typeof loginUserLocal !== "undefined") {
  //   try {
  //     const UserJson = JSON.parse(loginUserLocal);
  //     console.log(JSON.parse(loginUserLocal));
  //     if (UserJson?.userName !== "") {
  //       await store.commit("updateUser", UserJson);
  //     }
  //   } catch (error) {
  //     console.error("JSON 解析失败", error);
  //   }
  // }

  // -----------------

  //之前没登录, 自动登录
  if (!loginUser || !loginUser.userRole) {
    // await store.dispatch("user/getLoginUser");
    await store.dispatch("user/getLoginUser");
    // console.log("store: ", store.state);
    loginUser = store.state.user.loginUser;
  }

  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;

  //要跳转的必须要登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    //没登录 继续执行
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === ACCESS_ENUM.NOT_LOGIN
    ) {
      // if (!loginUser.userRole) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    // console.log("已登录");
    //已经登录,判断当前权限是否满足权限页面
    // console.log(loginUser);
    // console.log(loginUser + ": " + needAccess);
    // console.log(checkAccess(loginUser, needAccess as string));
    if (!checkAccess(loginUser, needAccess as string)) {
      next("/noAuth");
      return;
    }
  }

  next();
  // console.log(to);
});
