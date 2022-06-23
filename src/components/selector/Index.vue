<script lang="ts" setup>
interface Props {
  id?: string[];
  modelValue?: string;
}

interface Emits {
  (e: "update:modelValue", value: string): void;
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<Emits>();
</script>

<template></template>

<style lang="less" scoped></style>
