<template>
  <div id="userlayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img
            src="../assets/logo.png"
            style="
               {
                width: 48px;
              }
            "
            class="logo"
            alt="miss"
          />
          <div>跃盾 OJ</div>
        </a-space>
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

<script></script>

<style scoped>
#userlayout {
  text-align: center;
  background: 0% 0% / 100% 100%;
}

#userlayout .header {
  /*margin-bottom: 16px;*/
  margin-top: 16px;
  /*box-shadow: #eee 1px 1px 5px;*/
  /*background-color: red;*/
}

#userlayout .content {
  /*background: linear-gradient(to right, #bbb, #fff);*/
  margin-bottom: 16px;
  padding: 20px;
}

#userlayout .footer {
  /*background-color: #efefef;*/
  padding: 16px;
  position: sticky;
  bottom: 0px;
  left: 0px;

  right: 0px;
  text-align: center;
}

#userlayout .logo {
  width: 64px;
  height: 64px;
}
</style>
