<script setup lang="ts">
  import bgImg from "../../assets/login/bg01.jpg";
  import {ref} from "vue";
  import LoginCode from "./VerifyCodeLogin.vue";
  import LoginPassword from "./PasswordLogin.vue";

  const loginType = ref('password')

  const changeLoginType = (type: string) => {
    loginType.value = type
  }
</script>

<template>
  <el-image :src="bgImg" style="width: 100%;height: 100%;" fit="fill"></el-image>
  <div class="er-login-container">
    <div class="login-type">
      <el-text type="warning" @click="changeLoginType('password')">密码</el-text>
      <el-text type="info" @click="changeLoginType('code')">验证码</el-text>
    </div>
    <LoginCode v-if="loginType === 'code'"/>
    <login-password v-else/>
  </div>
</template>

<style scoped lang="scss">
  .el-image {
    background-size: cover; /* 确保背景图覆盖整个容器 */
    background-position: center; /* 背景图居中 */
    background-attachment: fixed; /* 固定背景图，使其随着页面滚动 */
    background-repeat: no-repeat; /* 防止背景图重复 */
    overflow: auto; /* 确保容器可以滚动 */
    width: 100vw;
    height: 100vh;

    position: fixed;
    filter: blur(1px);
    z-index: 1;
  }
  .er-login-container {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 300px;
    border-radius: 10px;
    z-index: 2;
    padding: 30px;
    display: grid;
    grid-template-rows: 1fr 4fr;
    .login-type{
      display: flex;
      justify-content: center;
      .el-text{
        margin: 0 10px;
        color: aliceblue;
        cursor: pointer;
      }
    }
  }

</style>