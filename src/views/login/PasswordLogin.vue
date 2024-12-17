<script setup lang="ts">
  import { ref } from 'vue'
  import {login} from "../../api/login/login.ts";
  import bcrypt from 'bcryptjs'

  const username = ref('')
  const password = ref('')

  const passwordLogin = async () => {

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password.value, salt);
    console.log('hash', hash)
    // 登录
    const {success, data} = await login(username.value, hash)
    if (success){
      console.log('登录Token', data)
    }
  }
</script>

<template>
  <div class="password-login">
    <div class="phone">
      <el-input v-model="username" placeholder="账号"></el-input>
    </div>
    <div class="verify-code">
      <el-input
          v-model="password"
          type="password"
          show-password
          placeholder="密码"
      />
    </div>
    <div>
      <el-button style="width: 100%;" type="primary" @click="passwordLogin">开始使用</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .password-login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    .el-input{
      opacity: 0.4;
      :deep(.el-input__wrapper) {
        border-radius: 10px;
        padding: 5px 20px;
      }
    }
    div {
      width: 100%;
    }
  }
</style>