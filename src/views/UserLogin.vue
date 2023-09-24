<template>
  <div class="grid-demo-background">
    <a-space direction="vertical" :size="24" style="display: block">
      <a-row class="grid-demo">
        <a-col :span="8">
          <div>8 - 33.33%</div>
        </a-col>
        <a-col :span="8">
          <div>
            <a-card
              :style="{ width: '360px' }"
              title="用户登录"
              :bordered="false"
            >
              <template #extra></template>
              <a-form
                :model="form"
                :style="{ width: '600px' }"
                @submit="handleSubmit"
              >
                <a-form-item
                  field="name"
                  tooltip="Please enter username"
                  label="用户名"
                >
                  <a-input
                    :style="{ width: '200px' }"
                    v-model="form.userAccount"
                    placeholder="please enter your username..."
                  />
                </a-form-item>
                <a-form-item field="post" label="密码">
                  <a-input-password
                    :style="{ width: '200px' }"
                    v-model="form.userPassword"
                    placeholder="please enter your post..."
                  />
                </a-form-item>

                <a-form-item>
                  <a-button html-type="submit">Submit</a-button>
                </a-form-item>
              </a-form>
              <br />
              Card content
            </a-card>
          </div>
        </a-col>
        <a-col :span="8">
          <div>8 - 33.33%</div>
        </a-col>
      </a-row>
    </a-space>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { UserControllerService } from "../../generated";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const form = ref({
  userAccount: "",
  userPassword: "",
});

const store = useStore();
const router = useRouter();

const handleSubmit = async (data) => {
  // console.log(form.value);

  // 提交登录请求
  const res = await UserControllerService.userLoginUsingPost(form.value);
  if (res.code === 0) {
    await store.dispatch("getLoginUser", {
      userName: res.data.userName,
      userRole: res.data.userRole,
    });
    await router.push({
      path: "/",
    });
  }
  console.log(res);
};
</script>

<style scoped>
.grid-demo-background {
  background-image: linear-gradient(
    90deg,
    var(--color-fill-2) 4.16666667%,
    transparent 4.16666667%,
    transparent 8.33333333%,
    var(--color-fill-2) 8.33333333%,
    var(--color-fill-2) 12.5%,
    transparent 12.5%,
    transparent 16.66666667%,
    var(--color-fill-2) 16.66666667%,
    var(--color-fill-2) 20.83333333%,
    transparent 20.83333333%,
    transparent 25%,
    var(--color-fill-2) 25%,
    var(--color-fill-2) 29.16666667%,
    transparent 29.16666667%,
    transparent 33.33333333%,
    var(--color-fill-2) 33.33333333%,
    var(--color-fill-2) 37.5%,
    transparent 37.5%,
    transparent 41.66666667%,
    var(--color-fill-2) 41.66666667%,
    var(--color-fill-2) 45.83333333%,
    transparent 45.83333333%,
    transparent 50%,
    var(--color-fill-2) 50%,
    var(--color-fill-2) 54.16666667%,
    transparent 54.16666667%,
    transparent 58.33333333%,
    var(--color-fill-2) 58.33333333%,
    var(--color-fill-2) 62.5%,
    transparent 62.5%,
    transparent 66.66666667%,
    var(--color-fill-2) 66.66666667%,
    var(--color-fill-2) 70.83333333%,
    transparent 70.83333333%,
    transparent 75%,
    var(--color-fill-2) 75%,
    var(--color-fill-2) 79.16666667%,
    transparent 79.16666667%,
    transparent 83.33333333%,
    var(--color-fill-2) 83.33333333%,
    var(--color-fill-2) 87.5%,
    transparent 87.5%,
    transparent 91.66666667%,
    var(--color-fill-2) 91.66666667%,
    var(--color-fill-2) 95.83333333%,
    transparent 95.83333333%
  );
}

.grid-demo .arco-col {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}

.grid-demo .arco-col:nth-child(2n) {
  background-color: rgba(var(--arcoblue-6), 0.9);
}

.grid-demo .arco-col:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}
</style>
