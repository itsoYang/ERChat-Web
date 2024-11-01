<script setup lang="ts">

  const props = defineProps(['content', 'visible'])

</script>

<template>
  <el-tooltip class="box-item" effect="dark" :content="props.content" placement="top" :visible="props.visible">
    <div>sssssssssssssssssssssssssssssss</div>
  </el-tooltip>
</template>

<style scoped>

</style>