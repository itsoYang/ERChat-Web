<script setup lang="ts">
  import {Ref, ref, onMounted, watch} from "vue";
  import {deleteProject, getProjectList, IProjectInfo} from "../../api/home/project.ts";
  import NoProject from "../../assets/images/NoProject.svg";
  import EREmpty from "../../components/EREmpty.vue";
  import ProjectInfo from "../../components/ProjectInfo.vue";

  const props = defineProps(['curProject'])
  const emit = defineEmits(['projectClick'])

  const visible = ref(false)
  const popVisible = ref(false)
  const title = ref('')

  const projectData: Ref<IProjectInfo | null> = ref(null)
  // 当前选择的项目索引
  const selectedProject: Ref<number | null> = ref(null);


  const projectList: Ref<IProjectInfo[] | null> = ref([])

  const projectDelete = async (id: string | undefined) => {
    popVisible.value = false
    if (!id){
      return
    }
    const {success} = await deleteProject(id)
    if (success){
      await loadProjectList()
    }
  }

  const projectClick = (project: IProjectInfo, index: number) => {
    selectedProject.value = index
    projectData.value = project
    emit('projectClick', project, index)
  }

  const openProjectInfo = (project: IProjectInfo) => {
    popVisible.value = false
    if (project){
      title.value = '编辑项目'
      projectData.value = project
    }
    visible.value = true
  }

  const closeProjectInfo = (isConfirm: boolean) => {
    if (isConfirm){
      loadProjectList()
    }
    visible.value = false
    projectData.value = null
  }

  const loadProjectList = async () => {
    const {success, data} = await getProjectList()
    if (success){
      projectList.value = data as IProjectInfo[]
    }
  }

  onMounted( () => {
    loadProjectList()
  })

  watch(() => props.curProject, (newVal: any, oldVal: any) => {
    selectedProject.value = newVal
  }, {immediate: true})
</script>

<template>
  <div class="er-project-list">
    <div v-if="projectList"
         class="er-project-item"
         v-for="(project, index) in projectList"
         :key="project.id"
         :style="{ backgroundColor: selectedProject === index ? 'lightblue' : '' }"
    >
      <div @click="projectClick(project, index)">
        <span><i class="iconfont">&#xe634;</i></span>
        <span>{{ project.projectName }}</span>
      </div>
      <div>
        <el-popover
            :visible="popVisible"
            placement="right-start"
        >
          <template #reference>
            <span @click="popVisible = !popVisible"><i class="iconfont icon-more"></i></span>
          </template>
          <template #default>
            <div>
              <div style="display: flex; align-items: center;cursor: pointer;" @click="projectDelete(project.id)">
                <span><i class="iconfont icon-shanchu"></i></span>
                <span style="margin-left: 5px;">删除</span>
              </div>
              <div style="display: flex; align-items: center;cursor: pointer;" @click="openProjectInfo(project)">
                <span><i class="iconfont icon-bianji"></i></span>
                <span style="margin-left: 5px;">编辑</span>
              </div>
            </div>
          </template>
        </el-popover>
      </div>
    </div>
    <EREmpty v-else :image="NoProject" desc="暂无数据"></EREmpty>
  </div>
  <ProjectInfo
      v-if="visible"
      :visible="visible"
      @close="closeProjectInfo"
      :title="title"
      :projectData="projectData"
  />
</template>

<style scoped lang="scss">
.er-project-list {
  display: flex;
  flex-direction: column;
  .er-project-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    padding: 5px 0;
    cursor: pointer;
    span:first-child{
      margin-right: 5px;
    }
    div:last-child{
      display: none;
    }
    &:hover div:last-child{
      display: inline-block;
    }
  }
  .er-project-item:hover{
    background-color: #e6e6e6;
  }
}
</style>