<template>
  <div class="container mx-auto shadow-lg rounded-lg">
    <!-- headaer -->
    <!-- end header -->
    <!-- Chatting -->
    <div class="flex flex-row justify-between bg-white">
      <!-- chat list -->
      <div class="flex flex-col w-1/5 h-screen border-r-2">
        <div v-for="(item, index) in model_list" :key="index" :class="{
          'flex flex-row py-4 px-2 justify-center items-center border-b-2': true,
          'bg-red-300': selectedItem === index,
        }" @click="selecteItem(item, index)">
          <div class="w-1/4 flex-shrink-0">
            <img src="https://source.unsplash.com/_7LbC5J-jw4/600x600" class="object-cover h-12 w-12 rounded-full"
              alt="" />
          </div>
          <div class="w-3/5 text-lg font-serif font-medium ml-2 text-center" @mouseover="showfulltext(index)">
            <el-tooltip :disabled="isTooltipVisible != index" class="box-item" :content="item" placement="bottom">
              <div class="truncate text-center">
                <span ref="spanref">{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </div>
      <!-- end chat list -->
      <!-- message -->
      <div class="w-full h-screen px-5 flex flex-col justify-between">
        <div class="flex flex-col mt-5 overflow-y-auto overscroll-contain h-6/10" ref="chatroom">
          <div class="" v-for="(item, index) in records" :key="index">
            <div class="flex justify-end mb-4" v-if="index % 2 == 0">
              <div @click="copy(item)"
                class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                {{ item }}
              </div>
              <img src="https://source.unsplash.com/vpOeXr5wmR4/600x600" class="object-cover h-8 w-8 rounded-full"
                alt="" />
            </div>
            <div class="flex justify-start mb-4" v-else>
              <img src="https://source.unsplash.com/_7LbC5J-jw4/600x600" class="object-cover h-8 w-8 rounded-full"
                alt="" />
              <div @click="copy(item)"
                class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                {{ item }}
              </div>
            </div>
          </div>
        </div>
        <div class="py-4">
          <textarea v-model="prompt" @keydown.enter="sendprompt()" class="w-full h-40 bg-gray-300 py-5 px-3 rounded-xl"
            placeholder="type your message here..." />
        </div>
      </div>
      <!-- end message -->
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps, onMounted, onUpdated } from "vue";
import requests from "@/utils/axios";
import useClipboard from "vue-clipboard3";
import { ElMessage } from "element-plus";
const { toClipboard } = useClipboard();
const props = defineProps({
  username: {
    type: String,
    required: true,
  },
});
const prompt = ref("");
const model_list = ref([
  "sigma_v16_aigc",
  "sigma_38b_v16",
  "sigma_71b_v16_aigc_猫眼_0824_v15dsadadadsadadsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
]);
const selectedItem = ref(null);
const current_model = ref(null);
const records = ref([]);
const chatroom = ref(null);
const spanref = ref(null);
const isTooltipVisible = ref(false);
async function selecteItem(model_name, index) {
  // 让选择的模型对话框显示高亮 用用户方便识别
  selectedItem.value = index;
  current_model.value = model_name;
  console.log(props.username);
  records.value = await requests
    .post("/model_record", {
      model_name: current_model.value,
    })
    .then((res) => res.records);
  console.log(records.value);
}

function sendprompt() {
  const message = prompt.value;
  records.value.push(message);
  prompt.value = "";
  scrollToBottom();
}
onMounted(() => {
  scrollToBottom();
});
onUpdated(() => {
  scrollToBottom();
});

function scrollToBottom() {
  if (chatroom.value) {
    chatroom.value.scrollTop = chatroom.value.scrollHeight;
  }
}

function showfulltext(index) {
  const spanrefs = spanref.value[index];
  if (spanrefs.parentNode.offsetWidth < spanrefs.offsetWidth) {
    isTooltipVisible.value = index;
  } else {
    isTooltipVisible.value = null;
  }
  console.log(isTooltipVisible.value);
}
const copy = async (val) => {
  try {
    await toClipboard(val);
    ElMessage.success("复制成功");
    // console.log("复制成功!");
  } catch (e) {
    ElMessage.error(e);
    // console.log(e);
  }
};
</script>
