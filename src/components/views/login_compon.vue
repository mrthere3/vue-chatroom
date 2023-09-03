<template>
  <!-- component -->
  <div class="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" style="
      background-image: url('https://images.unsplash.com/photo-1499123785106-343e69e68db1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80');
    ">
    <div class="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
      <div class="text-white">
        <div class="mb-8 flex flex-col items-center">
          <img src="https://www.logo.wine/a/logo/Instagram/Instagram-Glyph-Color-Logo.wine.svg" width="150" alt=""
            srcset="" />
          <h1 class="mb-2 text-2xl">Instagram</h1>
          <span class="text-gray-300">Enter Login Details</span>
        </div>
        <form action="#">
          <div class="mb-4 text-lg">
            <input v-model="localform.username"
              class="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
              type="text" name="name" />
          </div>

          <div class="mb-4 text-lg">
            <input v-model.number="localform.password"
              class="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
              type="Password" name="name" />
          </div>
          <div class="mt-8 flex justify-center text-lg text-black">
            <button type="button" @click="login_vaild"
              class="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import requests from "@/utils/axios";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useAuthstor } from "@/store/store.js";
const localform = ref({
  username: "wangxiaogang",
  password: 12345,
});
const Authstor = useAuthstor();
const route = useRouter();
async function login_vaild() {
  const res = await requests.post("login", localform.value);
  console.log(res);
  if (res.status_code == 200) {
    localStorage.clear();
    Authstor.set_auth(res.token);
    Authstor.set_username(localform.value.username);
    route.push({
      name: "home",
    });
  } else {
    ElMessage.error("用户名或者密码错误,请确认!");
  }
}
</script>
