<template>
  <!-- 嵌套表单 + 动态增减表 -->
  <!-- todo 提交后, 跳转到 结果 的tab. 然后显示当前提交结果, 还有往期提交结果 -->
  <div id="ViewquestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question.title">
              <a-descriptions
                title="判题条件"
                :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item label="时间限制">
                  {{ question.judeConfig.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question.judeConfig.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question.judeConfig.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <div>判题信息:</div>
              <MdView :value="question.content || ''" />
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    color="green"
                  >
                    {{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" title="评论" disabled> 评论区</a-tab-pane>
          <a-tab-pane key="answer" title="答案">
            暂时无法查看答案
            <!--            <template #title>Tab 3</template>-->
            <!--            {{ (question && question.answer) || "" }}-->
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline">
          <a-form-item
            field="language"
            label="questionSubmitView"
            style="min-width: 240px"
          >
            <a-select
              v-model="form.language"
              :style="{ width: '320px' }"
              placeholder="选择语言"
            >
              <a-option>java</a-option>
              <a-option>cpp</a-option>
              <a-option>go</a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <!--        todo 代码编辑器 没有更换语言高亮显示代码-->
        <CodeEditor
          :value="form.code"
          :language="form.language"
          :handle-change="changeCode"
        />
        <a-divider size="0" />
        <a-button type="primary" style="min-width: 200px" @click="doSubmit"
          >提交代码
        </a-button>
        <!--        提交按钮-->
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  reactive,
  ref,
  watchEffect,
  withDefaults,
  defineProps,
} from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionQueryRequest,
  QuestionSubmitAddRequest,
  QuestionSubmitControllerService,
  QuestionVO,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";
import CodeEditor from "@/components/CodeEditor.vue";
import MdView from "@/components/MdView.vue";

const question = ref<QuestionVO>();

const show = ref(true);

const layout = ref("horizontal");

const dataList = ref();
const total = ref(0);
const searchParams = ref<QuestionQueryRequest>({
  title: "",
  tags: [],
  pageSize: 2,
  current: 1,
});

const tableRef = ref();

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
    form.value.questionId = res.data?.id;
  } else {
    message.error("加载失败: " + res.message);
  }
};

const form = ref<QuestionSubmitAddRequest>({
  language: "java",
  code: "",
  questionId: 0,
});

/***
 * 提交代码
 */
const doSubmit = async () => {
  // console.log("表单数据:", form.value);
  if (!form.value.questionId) {
    return;
  }
  const res = await QuestionControllerService.doSubmitQuestionUsingPost(
    form.value
  );
  if (res.code === 0) {
    message.success("提交成功");
  } else {
    message.error("提交失败," + res.message);
  }
};

const changeCode = (value: string) => {
  form.value.code = value;
};

onMounted(() => {
  loadData();
});
</script>

<style scoped>
#ViewquestionView {
  max-width: 1400px;
  margin: 0 auto;
}

#ViewquestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
