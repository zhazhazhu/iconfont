<script lang="ts" setup>
import { IconfontType } from "../../../../types";

defineOptions({
  name: "IconPreviewTabs",
});

interface Props {
  modelValue?: string;
  data?: IconfontType[];
}

withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div class="icon-tabs">
    <el-tabs v-model="modelValue" type="card" style="width: 100%">
      <el-tab-pane
        v-for="item in data"
        :key="item.id"
        :name="item.id"
        :label="item.name"
        class="icon-group-item"
        lazy
      >
        <slot v-bind="item"></slot>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="less" scoped>
@import "../style/icon-tabs.less";
</style>
