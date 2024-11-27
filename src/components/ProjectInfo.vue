<script setup lang="ts">
  import {reactive, ref, getCurrentInstance} from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import {createProject} from "../api/home/project.ts";

  const {proxy} = getCurrentInstance() as any

  const projectInfoFormRef = ref<FormInstance>()

  const props = defineProps(["visible", "title"])
  const emit = defineEmits(['close'])

  const projectInfo = ref({
    name: "",
    desc: ""
  })

  const confirm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate( async (valid) => {
      if (valid) {
        const {success, message} = await createProject(projectInfo.value.name, projectInfo.value.desc)
        if (success){
          emit('close', true)
          proxy.$message({
            message: message,
            type: 'success'
          })
        }
      }
    })
  }

  const closeDlg = () => {
    emit('close', false)
    projectInfo.value = {
      name: "",
      desc: ""
    }
  }

  const checkProjectName = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error('输入项目名称'))
    }
    callback()
  }

  const rules = reactive<FormRules<typeof ruleForm>>({
    name: [{ validator: checkProjectName, trigger: 'blur' }]
  })

</script>

<template>
  <div class="project-info">
    <el-dialog
        v-model="props.visible"
        width="500"
        @close="closeDlg"
    >
      <template #header>
        <div style="border-bottom: 1px solid #dcdfe6; padding-bottom: 15px;">{{ props.title }}</div>
      </template>
      <el-form
          ref="projectInfoFormRef"
          :model="projectInfo"
          :rules="rules"
          status-icon
          label-position="top"
      >
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="projectInfo.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input
              v-model="projectInfo.desc"
              :rows="4"
              type="textarea"
              placeholder="请输入项目描述信息"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="confirm(projectInfoFormRef)">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>

</style>