<script lang="ts" setup>
import { IconfontType } from "../../../types/index";
import { useIconfontToJsonApi } from "../../hooks/use-iconfont-api/index";
import { useIconfontId } from "../../utils";
import PIcon from "../icon/index.vue";
import {
  IconPreviewButtonEnum,
  IconPreviewButtonType,
} from "./components/buttons";
import IconPreviewButtons from "./components/IconPreviewButtons.vue";
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

const activePreview = ref<IconPreviewButtonType>(IconPreviewButtonEnum.MAP);
</script>

<template>
  <div class="icon-all">
    <IconPreviewTabs v-model="activeTabName" :data="iconfontData">
      <template #default="icons">
        <div class="header">
          <div class="icon-quantity">{{ icons.glyphs.length }} Icons</div>
          <IconPreviewButtons @change="activePreview = $event" />
        </div>
        <ElRow class="icons" :gutter="20" type="flex" :class="activePreview">
          <div v-for="icon in icons.glyphs" class="icon-item">
            <div
              class="icon-item-content"
              @click.stop="
                emit('update:modelValue', iconPrefix(icons) + icon.font_class)
              "
            >
              <PIcon
                :name="iconPrefix(icons) + icon.font_class"
                size="40"
                :style="
                  activePreview === 'MAP' ? { 'margin-left': '10px' } : {}
                "
              />
              <div class="icon-name" v-if="activePreview === 'MAP'">
                {{ icon.font_class }}
              </div>
            </div>
          </div>
        </ElRow>
      </template>
    </IconPreviewTabs>
  </div>
</template>

<style lang="less" scoped>
@import "./style/index.less";
</style>
