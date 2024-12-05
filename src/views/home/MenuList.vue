<script setup lang="ts">

  import {menus} from "../../api/home/home.ts";
  import {Ref,ref,watch} from "vue";

  const props = defineProps(['curMenu'])
  const emit = defineEmits(['menuClick'])

  // 当前选择的菜单按钮索引
  const selectedMenu: Ref<number | null> = ref(0)

  const menuClick = (menu: any, index: number) => {
    selectedMenu.value = index
    emit('menuClick', menu, index)
  }

  watch(() => props.curMenu, (newVal: any, oldVal: any) => {
    selectedMenu.value = newVal
  }, {immediate: true})
</script>

<template>
  <div class="er-menu-list">
    <div class="er-menu-item"
         :style="{ backgroundColor: selectedMenu === index ? 'lightblue' : '' }"
         v-for="(menu, index) in menus"
         :key="menu.key"
         @click="menuClick(menu, index)"
    >
      <span><i class="iconfont" v-html="menu.icon"></i></span>
      <span>{{ menu.label }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .er-menu-list {
    display: grid;
    grid-template-rows: 1fr 1fr 5fr;
    .er-menu-item {
      border-radius: 5px;
      padding: 5px 0;
      display: inline-block;
      cursor: pointer;
      span:first-child{
        margin-right: 5px;
      }
    }
    .er-menu-item:hover{
      background-color: #e6e6e6;
    }
  }
</style>