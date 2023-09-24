<template>
  <di class="userLoginIn">
    <h2 style="margin-bottom: 16px">用户登录</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width="true"
      layout="horizontal"
      :model="form"
      :style="{ width: '600px' }"
      @submit="handleSubmit"
    >
      <a-form-item field="name" tooltip="Please enter username" label="用户名">
        <a-input v-model="form.userAccount" placeholder="请输入账号..." />
      </a-form-item>
      <a-form-item field="post" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码..."
        />
      </a-form-item>

      <a-form-item>
        <a-button html-type="submit" style="width: 120px" type="primary"
          >登录</a-button
        >
      </a-form-item>
    </a-form>
  </di>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { UserControllerService } from "../../../generated";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import message from "@arco-design/web-vue/es/message";

const form = ref({
  userAccount: "",
  userPassword: "",
});

const store = useStore();
const router = useRouter();

const handleSubmit = async () => {
  // console.log(form.value);

  // 提交登录请求
  const res = await UserControllerService.userLoginUsingPost(form.value);
  if (res.code === 0) {
    await store.dispatch("getLoginUser", {
      userName: res.data.userName,
      userRole: res.data.userRole,
    });
    message.success("登录成功");
    await router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登录失败: " + res.mesage);
  }
  console.log(res);
};
</script>
