<script setup lang="ts">

  import { ref } from 'vue'

  const phone = ref('')
  const verifyCode = ref('')
  const isCounting = ref(false);
  const countdown = ref(60);

  const sendVerificationCode = () => {
    if (isCounting.value) return; // 如果在倒计时中，不允许发送验证码

    // 发送验证码的逻辑，例如调用接口
    console.log(`Sending verification code to ${phone.value}`);

    // 开始倒计时
    isCounting.value = true;
    countdown.value = 60;

    const timer = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        clearInterval(timer);
        isCounting.value = false; // 倒计时结束，允许重新发送
      }
    }, 1000);
  }

  const verifyCodeLogin = () => {
    // 登录
  }
</script>

<template>
  <div class="login-code">
    <div class="phone">
      <el-input v-model="phone" placeholder="手机号"></el-input>
    </div>
    <div class="verify-code">
      <el-input v-model="verifyCode" placeholder="验证码"></el-input>
      <el-button type="primary" :disabled="isCounting" @click="sendVerificationCode">
        {{ isCounting ? `${countdown}秒后重发` : '发送验证码' }}
      </el-button>
    </div>
    <div>
      <el-button style="width: 100%" type="primary" @click="verifyCodeLogin">开始使用</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .login-code {
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
    .verify-code {
      display: flex;
      gap: 20px;
      align-items: center;
    }
    div {
      width: 100%;
    }
  }
</style>