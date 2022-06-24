<script lang="ts" setup>
import { IconPreviewButtonEnum, IconPreviewButtonType } from "./buttons";

const emit = defineEmits<{
  (e: "change", value: IconPreviewButtonType): void;
}>();
</script>

<template>
  <div class="preview-buttons">
    <div class="button" @click.stop="emit('change', IconPreviewButtonEnum.MAP)">
      <i class="iconfont icon-grid"></i>
    </div>
    <div
      class="button"
      @click.stop="emit('change', IconPreviewButtonEnum.LIST)"
    >
      <i class="iconfont icon-grid1"></i>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "../../../assets/iconfont/iconfont.css";
@import "../style/icon-buttons.less";
</style>
