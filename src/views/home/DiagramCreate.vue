<script setup lang="ts">

  import {reactive, ref, getCurrentInstance} from "vue";
  import type {FormInstance} from "element-plus";
  import {FormRules} from "element-plus";
  import {diagramCreate} from "../../api/home/diagram.ts";

  const diagramsCreateFormRef = ref<FormInstance>()

  const { proxy } = getCurrentInstance() as any

  const props = defineProps(['visible', 'title', 'projectId'])
  const emit = defineEmits(['close'])

  const diagramInfo = ref({
    name: "",
    visibility: "public"
  })

  const checkDiagramName = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error('输入项目名称'))
    }
    callback()
  }

  const rules = reactive<FormRules<typeof ruleForm>>({
    name: [{ validator: checkDiagramName, trigger: 'blur' }]
  })
  const closeDlg = () => {
    emit('close', '')
  }

  const create = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate( async (valid) => {
      if (valid) {
        const {success, data} = await diagramCreate(diagramInfo.value.name, diagramInfo.value.visibility, props.projectId)
        if (success){
          emit('close', data)
        }
      }
    })
  }
</script>

<template>
  <div class="diagrams-create-dlg">
    <el-dialog
        v-model="props.visible"
        width="500"
        @close="closeDlg"
    >
      <template #header>
        <div style="border-bottom: 1px solid #dcdfe6; padding-bottom: 15px;">{{ props.title }}</div>
      </template>
      <el-form
          ref="diagramsCreateFormRef"
          :model="diagramInfo"
          :rules="rules"
          status-icon
          label-position="top"
      >
        <el-form-item label="ER图名称" prop="name">
          <el-input v-model="diagramInfo.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="可见性" prop="visibility">
          <el-radio-group v-model="diagramInfo.visibility">
            <el-radio value="public">公开</el-radio>
            <el-radio value="private">私有</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="create(diagramsCreateFormRef)">创建</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">

</style>