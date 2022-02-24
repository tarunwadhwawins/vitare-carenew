<template>
  <div>
    <a-layout>
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <Header />
      </a-layout-header>
      <a-layout>
        <Sidebar />
        <a-layout-content>
          <Loader />
          <a-row :gutter="24">
            <a-col :span="24">
              <h2 class="pageTittle">Countdown Session</h2>
            </a-col>
            <a-col :span="24">
              <div id="app">
                <button @click="start">Start</button>
                <button @click="pause">Pause</button>
                <button @click="reset">Reset</button>
                <p>{{formattedElapsedTime}}</p>
              </div>
            </a-col>
          </a-row>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import { computed, ref } from 'vue-demi';

export default {
  components: {
    Header,
    Sidebar,
  },
  setup() {
    const elapsedTime = ref(0)
    const timer = ref(undefined)
    
    const formattedElapsedTime = computed(() => {
      const date = new Date(null);
      date.setSeconds(elapsedTime.value / 1000);
      const utc = date.toUTCString();
      return utc.substr(utc.indexOf(":") - 2, 8);
    })

    const start = () => {
      timer.value = setInterval(() => {
        elapsedTime.value += 1000;
      }, 1000);
    }

    const pause = () => {
      clearInterval(timer.value);
    }
    
    const reset = () => {
      elapsedTime.value = 0;
    }

    return {
      formattedElapsedTime,
      start,
      pause,
      reset,
    };
  },
};
</script>
