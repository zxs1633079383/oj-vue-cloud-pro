<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer"
        >底部
        <a href="http://github.com/zxs1633079383" target="_blank">My GitHub</a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import GlobalHeader from "@/components/GlobalHeader";

export default {
  components: { GlobalHeader },
};
</script>

<style scoped>
#basicLayout {
}

#basicLayout .header {
  margin-bottom: 16px;
  box-shadow: #eee 1px 1px 5px;
  /*background-color: red;*/
}

#basicLayout .content {
  background: linear-gradient(to right, #fefefe, #fff);
  margin-bottom: 16px;
  padding: 20px;
}

#basicLayout .footer {
  background-color: #efefef;
  padding: 16px;
  position: sticky;
  bottom: 0px;
  left: 0px;

  right: 0px;
  text-align: center;
}
</style>
