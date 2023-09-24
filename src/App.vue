<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view></router-view>
    </template>
    <template v-else>
      <BasicLayout></BasicLayout>
    </template>
  </div>
</template>

<style></style>

<script setup>
import { onMounted } from "vue";
import BasicLayout from "@/layouts/BasicLayout";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

/***
 * 全局初始化函数,有全局单次调用的代码, 都可以写到这里. (预留全局初始化)
 */

const route = useRoute();

const doInit = () => {
  console.log("hello 欢迎来到我的项目");
};

const store = useStore();
//
//
//
// const router = useRouter();
//
//
//
// router.beforeEach((to, from, next) => {
//   if (to.meta?.access === "canAdmin") {
//     if (store.state.user.loginUser?.role !== "admin") {
//       next("/noAuth");
//       return;
//     }
//   }
//   next();
//   // console.log(to);
// });

onMounted(() => {
  doInit();
  store.dispatch("getLoginUser");
});
</script>
