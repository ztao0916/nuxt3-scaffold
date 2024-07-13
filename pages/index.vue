<script lang="ts" setup></script>

<template>
  <div>
    <div class="bg-red-500 demo">我是首页</div>
    <el-button @click="ElMessage('hello')">button</el-button>
    <ElButton :icon="ElIconEditPen" type="success">button</ElButton>
    <LazyElButton type="warning">lazy button</LazyElButton>
  </div>
</template>

<style lang="scss" scoped>
  @import '~/assets/css/common.scss';
</style>
