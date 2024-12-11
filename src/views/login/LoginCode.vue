<script setup lang="ts">

</script>

<template>
  <div class="login-code">
    <el-input v-model="code"></el-input>
    <el-input v-model="code"></el-input>

    <el-button type="primary" @click="login">登录</el-button>
  </div>
</template>

<style scoped lang="scss">
  .el-input{
    opacity: 0.4;
  }
</style>