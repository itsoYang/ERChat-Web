<script setup lang="ts">
  const props = defineProps(['visible', 'title'])
  const emit = defineEmits(['close'])
  const closeDlg = () => {
    emit('close')
  }
</script>

<template>
  <div class="diagrams-create-dlg">
    <el-dialog :title="props.title" :visible="props.visible" @close="closeDlg">
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">

</style>