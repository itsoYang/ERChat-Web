<script setup lang="ts">
  import {reactive, ref, getCurrentInstance, Ref, onMounted} from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import {createProject, IProjectInfo, updateProject} from "../api/home/project.ts";

  const {proxy} = getCurrentInstance() as any

  const projectInfoFormRef = ref<FormInstance>()

  const props = defineProps(["visible", "title", "projectData"])
  const emit = defineEmits(['close'])

  const projectInfo: Ref<IProjectInfo> = ref(props.projectData ? props.projectData : {
    projectDesc: null,
    projectName: null,
    id: null
  })

  const confirm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate( async (valid) => {
      if (valid) {
        // 更新项目
        if (projectInfo.value.id){
          const {success, message} = await updateProject(projectInfo.value)
          if (success){
            emit('close', true)
            proxy.$message({
              message: message,
              type: 'success'
            })
          }
          return
        }
        // 创建项目
        const {success, message} = await createProject(projectInfo.value.projectName, projectInfo.value.projectDesc)
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
    projectInfo.value = null
  }

  const checkProjectName = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error('输入项目名称'))
    }
    callback()
  }

  const rules = reactive<FormRules<typeof ruleForm>>({
    projectName: [{ validator: checkProjectName, trigger: 'blur' }]
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
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="projectInfo.projectName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input
              v-model="projectInfo.projectDesc"
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