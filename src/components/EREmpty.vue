<script setup lang="ts">

  const props = defineProps(['image', 'desc'])
</script>

<template>
  <div class="empty-container">
    <el-empty
        :image="props.image"
        :description="props.desc"
    ></el-empty>
  </div>
</template>

<style scoped lang="scss">
  .empty-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>