<script lang="ts" setup>
import { IconfontType } from "../../../types/index";
import { useIconfontToJsonApi } from "../../hooks/use-iconfont-api/index";
import { useIconfontId } from "../../utils";
import PIcon from "../icon/index.vue";

defineOptions({
  name: "PIconPreview",
});

interface Props {
  modelValue?: string;
  id?: string[];
}

interface Emits {
  (e: "update:modelValue", value: string): void;
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<Emits>();

const iconfontJsonApis = computed(() =>
  props?.id?.length
    ? useIconfontToJsonApi(props.id)
    : useIconfontToJsonApi(useIconfontId())
);

const iconfontData = ref<IconfontType[]>([]);

const iconPrefix = (icon: IconfontType) => `#${icon?.css_prefix_text}`;

watchEffect(async () => {
  if (iconfontJsonApis.value?.length)
    for (const api of iconfontJsonApis.value) {
      if (!api) continue;

      const res = await fetch(api);

      const data = await res.json();

      iconfontData.value.push(data);
    }
});
</script>

<template>
  <div class="icon-all">
    <div
      v-for="iconGroup in iconfontData"
      :key="iconGroup.id"
      class="icon-group-item"
    >
      <div class="icon-group-title">{{ iconGroup.name }}</div>

      <div class="icons">
        <div
          v-for="icon in iconGroup.glyphs"
          @click="
            emit('update:modelValue', iconPrefix(iconGroup) + icon.font_class)
          "
        >
          <ElTooltip
            :content="icon.font_class"
            placement="bottom"
            effect="light"
          >
            <PIcon :name="iconPrefix(iconGroup) + icon.font_class" size="42" />
          </ElTooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "./style/index.less";
</style>
