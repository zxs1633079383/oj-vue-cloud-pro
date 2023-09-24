import { StoreOptions } from "vuex";
import ACCESS_ENUM from "@/access/assessEnum";
import { UserControllerService } from "../../generated";
import { routes } from "@/router/routes";
import router from "@/router";
import store from "@/store/index";

export default {
  namespace: true,
  state: () => ({
    // todo 用户没登录 过几秒自动登录bug
    loginUser: {
      userName: "未登录",
      userRole: ACCESS_ENUM.NOT_LOGIN,
    },
  }),
  actions: {
    //todo 改成从远程获取登录信息

    async getLoginUser({ commit, state }, payload) {
      //获取当前用户
      const res = await UserControllerService.getLoginUserUsingGet();
      // console.log(res);
      if (res.code === 0) {
        // console.log("已登录===>");
        commit("updateUser", res.data);
      } else {
        // console.log("未登录===>");
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESS_ENUM.NOT_LOGIN,
        });
      }
      // const products = await getProducts();
      // commit("updateUser", payload);
    },
  },
  mutations: {
    updateUser(state, payload) {
      // console.log("更新用户", payload);

      state.loginUser = payload;
      //本地存储
      // localStorage.setItem("user", JSON.stringify(payload));
      // console.log(state.loginUser);
    },
    clearUser(state) {
      state.loginUser = {
        userName: "未登录",
        userRole: ACCESS_ENUM.NOT_LOGIN,
      };
      // localStorage.removeItem("user");
    },
  },
} as StoreOptions<any>;
