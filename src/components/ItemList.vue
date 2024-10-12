<script setup lang="ts">

  import {ref} from "vue";

  const props = defineProps(['data'])

  const emit = defineEmits(['returnItem'])

  const fieldTypes = Object.values(props.data)

  const hoveredIndex = ref<number | null>(null);

  const handleMouseOver = (index: number) => {
    hoveredIndex.value = index;
  }

  const handleMouseLeave = (index: number) => {
    if (hoveredIndex.value === index) {
      hoveredIndex.value = null;
    }
  }

</script>

<template>
  <div class="item-list-wrapper">
    <ul class="item-list">
      <li
          class="item"
          v-for="(item, index) in fieldTypes"
          :key="index"
          @click="emit('returnItem', item)"
          @mouseover="handleMouseOver(index)"
          @mouseleave="handleMouseLeave(index)"
          :class="{ 'hovered': hoveredIndex === index }"
      >
        <span style="margin-left: 4px;">{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  .item-list-wrapper {
    text-align: center;
    background-color: #1f293b;
    padding: 5px;
    .item-list {
      max-height: 250px;
      overflow-y: scroll;
      list-style: none;
      padding: 0;
      margin: 0;
      .item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 30px;
        margin: 0 4px;
        color: #cbd5e1;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.3s ease;
        &.hovered {
          background-color: #24b8a6 /* 鼠标滑过时的背景颜色 */
        }
      }
    }
    /* 垂直滚动条的宽度 */
    .item-list::-webkit-scrollbar {
      width: 5px;
    }
    /* 滚动条轨道 */
    .item-list::-webkit-scrollbar-track {
      background: #3a4352;
    }
    /* 滚动条滑块 */
    .item-list::-webkit-scrollbar-thumb {
      background: #a0aab4; /* 滑块的背景颜色 */
      border-radius: 6px; /* 滑块的圆角 */
    }
  }

</style>