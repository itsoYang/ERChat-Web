<script setup lang="ts">
  import { ref } from 'vue'

  const props = defineProps(["visible"])
  const emit = defineEmits(['close'])

  const projectInfo = ref({
    name: "",
    desc: "",
    visibility: ''
  })

  const confirm = () => {
    emit('close')
  }

  const cancel = () => {
    emit('close')
    projectInfo.value = {
      name: "",
      desc: "",
      visibility: ''
    }
  }

</script>

<template>
  <div class="project-info">
    <el-dialog v-model="props.visible" title="项目信息" width="500">
      <el-form :model="projectInfo">
        <el-form-item label="Promotion name">
          <el-input v-model="projectInfo.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Zones">
          <el-select v-model="projectInfo.visibility" placeholder="Please select a zone">
            <el-option label="Zone No.1" value="shanghai" />
            <el-option label="Zone No.2" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">Cancel</el-button>
          <el-button type="primary" @click="confirm">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>

</style>