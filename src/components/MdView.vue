<template>
  <Viewer :value="value" :plugins="plugins" />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { Editor, Viewer } from "@bytemd/vue-next";
import { defineProps, withDefaults } from "vue";

const plugins = [
  gfm(),
  highlight(),
  // Add more plugins here
];

/***
 * 定义组件的类型
 */
interface Props {
  value: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
});
</script>

<style></style>
