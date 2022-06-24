<script lang="ts" setup>
const iconName = ref("#icon-yezi");
</script>

<template>
  <p>hello iconfont-picker</p>
  <PIcon :name="iconName"></PIcon>
  <PIconPreview v-model="iconName"></PIconPreview>
</template>

<style lang="less" scoped></style>
