<script setup lang="ts">

  const props = defineProps(['data'])

  const emit = defineEmits(['returnItem'])

  const fieldTypes = Object.keys(props.data)
  console.log(fieldTypes)
</script>

<template>
  <div class="item-list">
    <ul>
      <li v-for="(item, index) in fieldTypes" :key="index" @click="emit('returnItem', item)">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>