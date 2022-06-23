<script lang="ts" setup>
defineOptions({
  name: "PIcon",
});

interface Props {
  name?: string;
  size?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  size: 32,
});

const iconName = computed(() => props.name?.split(",")?.[0]);

const bgColor = computed(() => props.name?.split(",")?.[1]);

const blockSize = computed(() => {
  const { size } = toRefs(props);

  if (typeof size.value === "number") return Number(size.value) + "px";

  return size.value;
});
</script>

<template>
  <span v-if="iconName">
    <svg aria-hidden="true" class="p-icon" :style="{ background: bgColor }">
      <use :xlink:href="iconName"></use>
    </svg>
  </span>
</template>

<style lang="less" scoped>
.p-icon {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: v-bind(blockSize);
  height: v-bind(blockSize);
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  padding: 6px;
  border-radius: 8px;
}
</style>
