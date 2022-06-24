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

      <ElRow class="icons" :gutter="20">
        <ElCol v-for="icon in iconGroup.glyphs" :xs="8" :sm="6" :md="4">
          <div
            class="icon-item"
            @click.stop="
              emit('update:modelValue', iconPrefix(iconGroup) + icon.font_class)
            "
          >
            <PIcon
              :name="iconPrefix(iconGroup) + icon.font_class"
              size="38"
              style="margin-left: 10px"
            />
            <div class="icon-name">{{ icon.font_class }}</div>
          </div>
        </ElCol>
      </ElRow>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "./style/index.less";
</style>
