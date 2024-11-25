<script setup lang="ts">

  import {ref} from "vue";
  import logoUrl from '../../assets/logo/trans_bg.png'
  import avatarUrl from '../../assets/images/dog.png'
  import {Search} from "@element-plus/icons-vue";

  const searchQuery = ref('')


  const search = () => {
    if (searchQuery.value) {
      // 处理搜索操作
      console.log(`搜索: ${searchQuery.value}`);
      searchQuery.value = ''; // 清空搜索框
    }
  }
</script>

<template>
  <header class="header">
    <div class="logo-container">
      <el-image :src="logoUrl" style="height: 150px; width: 150px" fit="cover"></el-image>
    </div>
    <div class="header-center">
      <el-input
          v-model="searchQuery"
          placeholder="搜索..."
          class="search-input"
          :suffix-icon="Search"
          @keyup.enter="search"
      />
    </div>
    <div class="avatar-container">
      <el-avatar :src="avatarUrl" size="simall"></el-avatar>
    </div>
  </header>
</template>

<style scoped lang="scss">
  .header {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    height: 75px;

    .header-center {
      flex-grow: 1; /* 中间区域占据剩余空间 */
      display: flex;
      justify-content: flex-end;
      .search-input {
        width: 100px; /* 根据需要设置搜索框宽度 */
        padding: 8px;
        border-radius: 4px;
        outline: none;
        :deep(.el-input__wrapper) {
          background-color: #efefef;
        }
      }
      .search-input:focus {
        border-color: #409eff; /* 聚焦时边框颜色 */
      }
    }
    .avatar-container {
      cursor: pointer;
    }
  }
</style>