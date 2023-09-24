<template>
  <div>
    <a-row class="grid-demo" align="center" :wrap="false">
      <a-col flex="100px">
        <div>1--px</div>
      </a-col>
      <a-col flex="auto">
        <div>
          <a-menu
            mode="horizontal"
            :default-selected-keys="['1']"
            :selected-keys="selectedKeys"
            @menu-item-click="domenuClick"
          >
            <a-menu-item
              key="0"
              :style="{ padding: 0, marginRight: '38px' }"
              disabled
            >
              <div class="title-bar">
                <img class="logo" src="../assets/logo.png" alt="failed" />
                <div class="title">跃宙 OJ</div>
              </div>
            </a-menu-item>

            <a-menu-item v-for="item in visibleRoutes" :key="item.path">
              {{ item.name }}
            </a-menu-item>
          </a-menu>
        </div>
      </a-col>
      <a-col flex="100px">
        <div>{{ store.state.user?.loginUser?.userName ?? "未登录" }}</div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { routes } from "../router/routes";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/assessEnum";

const router = useRouter();
const route = useRoute();

const store = useStore();

const loginUser = computed(() => store.state.user.loginUser);

const test = ref(0);

// console.log(store.state.user.loginUser);

//跳转路由更新菜单..
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

const domenuClick = (key) => {
  router.push({
    path: key,
  });
};

const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item?.meta?.hideInMenu) {
      return false;
    }

    //todo 根据权限过滤菜单
    if (!checkAccess(loginUser.value, item?.meta?.access as string)) {
      return false;
    }
    return true;
  });
});
// const conmit = () => {
//   // console.log("loginUser 改变");
//   visibleRoutes.value;
// };
//
// watch(loginUser, conmit);

let selectedKeys = ref(["/"]);
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 16px;
}

.logo {
  height: 48px;
}
</style>
