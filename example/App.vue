<script lang="ts" setup>
const iconName = ref("#icon-yezi");
</script>

<template>
  <PIcon :name="iconName"></PIcon>
  <PIconPreview v-model="iconName"></PIconPreview>
</template>

<style lang="less">
body {
  margin: 0;
}
</style>
