<script setup lang="ts">
  import { ref } from 'vue'

  const phone = ref('')
  const password = ref('')

  const passwordLogin = () => {
    // 登录

  }
</script>

<template>
  <div class="password-login">
    <div class="phone">
      <el-input v-model="phone" placeholder="手机号"></el-input>
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