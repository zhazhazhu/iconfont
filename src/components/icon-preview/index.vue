<script lang="ts" setup>
import { IconfontType } from "../../../types/index";
import { useIconfontToJsonApi } from "../../hooks/use-iconfont-api/index";
import { useIconfontId } from "../../utils";
import PIcon from "../icon/index.vue";
import IconPreviewTabs from "./components/IconTabs.vue";

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

const activeTabName = ref("");

watchEffect(async () => {
  if (iconfontJsonApis.value?.length)
    for (const api of iconfontJsonApis.value) {
      if (!api) continue;

      const res = await fetch(api);

      const data = await res.json();

      iconfontData.value.push(data);

      if (!activeTabName.value) activeTabName.value = data.id;
    }
});
</script>

<template>
  <div class="icon-all">
    <IconPreviewTabs v-model="activeTabName" :data="iconfontData">
      <template #default="icons">
        <div>
          <div class="icon-quantity">{{ icons.glyphs.length }} Icons</div>
          <div></div>
        </div>
        <ElRow class="icons" :gutter="20">
          <ElCol v-for="icon in icons.glyphs" :xs="8" :sm="6" :md="4">
            <div
              class="icon-item"
              @click.stop="
                emit('update:modelValue', iconPrefix(icons) + icon.font_class)
              "
            >
              <PIcon
                :name="iconPrefix(icons) + icon.font_class"
                size="38"
                style="margin-left: 10px"
              />
              <div class="icon-name">{{ icon.font_class }}</div>
            </div>
          </ElCol>
        </ElRow>
      </template>
    </IconPreviewTabs>
  </div>
</template>

<style lang="less" scoped>
@import "./style/index.less";
</style>
