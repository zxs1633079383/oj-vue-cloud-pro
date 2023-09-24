<template>
  <div
    id="code-editor"
    ref="codeEditorRef"
    style="min-height: 600px; height: 70vh"
  ></div>
  <!--  {{ value }}-->

  <!--  <a-button @click="fillValue">填充值</a-button>-->
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { defineProps, onMounted, withDefaults, ref, toRaw, watch } from "vue";

const codeEditorRef = ref();
const codeEditor = ref();

interface Props {
  value: string;
  language: string;
  handleChange: (v: string) => void;
}

// const value = ref("hello world");
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
  language: () => "java",
});

// const fillValue = () => {
//   if (!codeEditor.value) {
//     return;
//   }
//   //改变值
//   toRaw(codeEditor.value).setValue("新的值");
// };
watch(
  () => props.language,
  () => {
    if (codeEditor.value) {
      monaco.editor.setModelLanguage(
        toRaw(codeEditor.value).getModel(),
        props.language
      );
    }
    //todo 修改语言, 高亮显示不切换

    console.log(codeEditor.value);
  }
);

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }

  // const myEditor = monaco.editor.create(codeEditorRef.value, {
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: props.language,
    automaticLayout: true,
    minimap: {
      enabled: true,
      scale: 5,
    },
    lineNumbers: "on",
    colorDecorators: true,
    roundedSelection: false,
    scrollBeyondLastLine: false,
    readOnly: false,
    theme: "vs-dark",
  });

  // 编辑  监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    // console.log("目前内容为: ", toRaw(codeEditor.value).getValue());
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});

// 奢姿 data  更新进去的值
</script>

<style scoped></style>
