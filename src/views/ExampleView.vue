<template>
  <div class="exampleView">
    {{ codeValue }}
    <CodeEditor :value="codeValue" :handle-change="onCodeChange" />
    {{ mdValue }}
    <MdEditor :value="mdValue" :handle-change="onMdChange" />
    <!--    <img alt="Vue logo" src="../assets/logo.png" />-->
    <!--    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />-->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue"; // @ is an alias to /src

const codeValue = ref();

const onCodeChange = (v: string) => {
  codeValue.value = v;
};

const mdValue = ref();

const onMdChange = (v: string) => {
  mdValue.value = v;
};
</script>
