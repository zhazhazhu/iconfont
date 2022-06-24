# iconfont-picker-v3

## 📦 Install

```bash
pnpm i iconfont-picker-v3
```

### 全局注册组件

```ts
//main.ts

import IconFontPicker, { setupIcon } from 'iconfont-picker-v3'
import "iconfont-picker-v3/dist/style.css" //引入样式文件
...

setupIcon({
  id: string[],
});

const app = createApp(App);

app.use(IconFontPicker)
```

### 单独引入

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import { PIcon,IconPicker } from 'iconfont-picker'

const iconName = ref("")
</script>

<template>
  <IconPicker v-model="iconName"></IconPicker>

  <PIcon name="#Tomato">
</template>
```
