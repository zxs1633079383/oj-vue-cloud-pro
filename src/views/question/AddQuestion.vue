<template>
  <!-- 嵌套表单 + 动态增减表 -->
  <div id="addQuestionView">
    <h2>创建标题</h2>
    <a-form :model="form" :style="{ width: '600px' }" @submit="handleSubmit">
      <a-form-item field="title" label="标题">
        <a-input v-model="form.title" placeholder="请输入标题" />
      </a-form-item>
      <a-form-item field="tags" label="标签">
        <a-input-tag v-model="form.tags" placeholder="请选择标签" allow-clear />
      </a-form-item>
      <a-form-item field="content" label="题目内容">
        <MdEditor :value="form.content" :handle-change="onContentChange" />
        <!--        <a-input v-model="form.content" placeholder="请输入题目内容" />-->
      </a-form-item>
      <a-form-item field="answer" tooltip="Please enter username" label="答案">
        <MdEditor :value="form.answer" :handle-change="onAnswerChange" />
      </a-form-item>

      <a-form-item label="判题配置" :content-flex="false" :merge-props="false">
        <a-space direction="vertical" style="min-width: 480px">
          <a-form-item field="judeConfig.timeLimit" :label="时间限制" no-style>
            <a-input-number
              v-model="form.judeConfig.timeLimit"
              placeholder="请输入时间限制"
              min="0"
            ></a-input-number>
          </a-form-item>

          <a-form-item field="judeConfig.stackLimit" :label="堆栈限制" no-style>
            <a-input-number
              v-model="form.judeConfig.stackLimit"
              placeholder="请输入堆栈限制"
              min="0"
            ></a-input-number>
          </a-form-item>

          <a-form-item
            field="judeConfig.memoryLimit"
            :label="内存限制"
            no-style
          >
            <a-input-number
              v-model="form.judeConfig.memoryLimit"
              placeholder="请输入内存限制"
              min="0"
            ></a-input-number>
          </a-form-item>
        </a-space>
      </a-form-item>
      <!--   判题用例   -->
      <!--      <a-form-item label="判题样例">-->
      <a-form-item
        label="测试用例配置"
        :content-flex="false"
        :merge-props="false"
      >
        <a-form-item
          v-for="(judeCaseItem, index) of form.judeCase"
          :field="`from.judeCaseItem[${index}].input`"
          :key="index"
          no-style
        >
          <a-space direction="vertical" style="min-width: 640px">
            <a-form-item
              :field="`form.judeCase[${index}].input`"
              :label="`输入用例-${index}`"
              :key="index"
            >
              <a-input
                v-model="judeCaseItem.input"
                placeholder="请输入测试输入用例"
              />
            </a-form-item>

            <a-form-item
              :field="`form.judeCase[${index}].output`"
              :label="`输出用例-${index}`"
              :key="index"
            >
              <a-input
                v-model="judeCaseItem.output"
                placeholder="请输入测试输出用例"
              />
            </a-form-item>

            <a-button status="danger" @click="handleDelete(index)"
              >删除用例
            </a-button>
          </a-space>
        </a-form-item>
        <!--      </a-form-item>-->
        <div style="margin-top: 32px">
          <a-button type="outline" status="success" @click="handleAdd"
            >新增测试用例
          </a-button>
        </div>
      </a-form-item>

      <!--      <a-form-item>-->
      <!--        <div style="margin-top: 16px"></div>-->
      <!--      </a-form-item>-->
      <a-form-item>
        <a-button
          type="primary"
          style="min-width: 200px"
          html-type="submit"
          @click="doSubmit"
          >提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import { QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute } from "vue-router";

const route = useRoute();
// 更新
const updatePage = route.path.includes("update");
// 更新请求获取数据
const loadData = async () => {
  // console.log(JSON.parse('[{"input":"1 2","outout":"3 4"}]'));
  // console.log(
  //   JSON.parse('{"timeLimit":1000,"memoryLimit":1000,"stackLimit":1000}')
  // );
  // console.log('["栈","简单"]');
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await QuestionControllerService.getQuestionByIdUsingGet(
    id as any
  );
  if (res.code === 0) {
    form.value = res.data as any;

    if (!form.value.judeCase) {
      form.value.judeCase = [
        {
          input: "",
          output: "",
        },
      ];
    } else {
      form.value.judeCase = JSON.parse(form.value.judeCase as any);
    }
    if (!form.value.judeConfig) {
      form.value.judeConfig = {
        memoryLimit: 1000,
        stackLimit: 1000,
        timeLimit: 1000,
      };
    } else {
      form.value.judeConfig = JSON.parse(form.value.judeConfig as any);
    }

    if (!form.value.tags) {
      form.value.tags = [];
    } else {
      form.value.tags = JSON.parse(form.value.tags as any);
    }
    form.value = res.data as any;
  } else {
    message.error("加载失败: " + res.message);
  }
};

onMounted(() => {
  loadData();
});

const form1 = reactive({
  name: "",
  posts: [{ value: "" }],
});
const handleAdd = () => {
  form.value.judeCase.push({
    input: "",
    output: "",
  });
};
const handleDelete = (index: number) => {
  form.value.judeCase.splice(index, 1);
};

const onAnswerChange = (value: string) => {
  form.value.answer = value;
};

const onContentChange = (value: string) => {
  form.value.content = value;
};

const form = ref({
  answer: "",
  content: "",
  judeCase: [
    {
      input: "",
      output: "",
    },
  ],
  judeConfig: {
    memoryLimit: 1000,
    stackLimit: 1000,
    timeLimit: 1000,
  },
  tags: [],
  title: "",
});
const doSubmit = async () => {
  console.log(form.value);
  if (updatePage) {
    const res = await QuestionControllerService.updateQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("更新成功");
    } else {
      message.error("更新失败: " + res.message);
    }
  } else {
    const res = await QuestionControllerService.addQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("创建成功");
    } else {
      message.error("创建失败: " + res.message);
    }
  }
};
</script>

<style scoped></style>
