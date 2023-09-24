import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/ExampleView.vue";
import AdminView from "@/views/AdminView.vue";
import ACCESS_ENUM from "@/access/assessEnum";
import NoAuthView from "@/views/NoAuthView.vue";
import UserLogin from "@/views/UserLogin.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import UserRegisterView from "@/views/user/UserRegister.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import AddQuestionView from "@/views/question/AddQuestion.vue";
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";
import QuestionView from "@/views/question/QuestionView.vue";
import QuestionSubmitView from "@/views/question/QuestionSubmitView.vue";
import ViewQuestionView from "@/views/question/ViewQuestionView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    meta: {
      hideInMenu: true,
    },
    children: [
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
      {
        path: "/user/login",
        name: "用户登录新",
        component: UserLoginView,
      },
    ],
  },
  {
    path: "/",
    name: "主页",
    component: QuestionView,
  },

  {
    path: "/questions",
    name: "浏览题目",
    component: QuestionView,
  },
  // {
  //   path: "/admin",
  //   name: "管理员可见",
  //   component: AdminView,
  //   meta: {
  //     access: ACCESS_ENUM.ADMIN,
  //   },
  //   },
  // {
  //   path: "/about",
  //   name: "关于我的",
  //
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  //   // components: HomeView,
  // },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/login",
    name: "用户登录-old",
    component: UserLogin,
    meta: {
      hideInMenu: true,
      access: ACCESS_ENUM.NOT_LOGIN,
    },
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/update/question",
    name: "更新题目",
    component: AddQuestionView,
    meta: {
      hideInMenu: true,
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/manage/question",
    name: "管理题目",
    component: ManageQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/question_submit",
    name: "浏览题目提交",
    component: QuestionSubmitView,
  },
  {
    path: "/view/question/:id",
    name: "在线做题",
    component: ViewQuestionView,
    props: true, //可以在页面中props直接获取id
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },

  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];
