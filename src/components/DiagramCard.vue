<script setup lang="ts">

  const props = defineProps(['title', 'content'])


  const handleClick = () => {

  }

</script>

<template>
  <div class="custom-card">
    <div class="card-header">
      <h2>{{ props.title }}</h2>
    </div>
    <div class="card-body">
      <p>{{ props.content }}</p>
    </div>
    <div class="card-footer">
      <button @click="handleClick">了解更多</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .custom-card {
    width: 265px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin: 20px;
    transition: box-shadow 0.3s, transform 0.3s;
    background-color: #fff;
    .card-header {
      padding: 16px;
      background-color: #f5f5f5;
      border-bottom: 1px solid #e0e0e0;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    .card-body {
      padding: 16px;
    }

    .card-footer {
      padding: 16px;
      display: flex;
      justify-content: flex-end;
    }

    .card-footer button {
      background-color: #409eff;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .card-footer button:hover {
      background-color: #66b1ff;
    }
  }

  .custom-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
</style>