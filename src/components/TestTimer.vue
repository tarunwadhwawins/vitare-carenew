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
              <h2 class="pageTittle">Test Timer</h2>
            </a-col>
            <a-col :span="24">
              <div class="timer">
                <p>
                  {{ diff.year }} Years, {{ diff.month }} Months, {{ diff.day }} Days,
                  {{ diff.hour }} Hours, {{ diff.minute }} Minute, {{ diff.second }} Seconds
                  Until
                  {{ formatDate(futureDate) }}
                </p>
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
import { onBeforeMount, onBeforeUnmount, ref } from "vue";

export default {
  components: {
    Header,
    Sidebar,
  },
  setup() {
    const futureDate = ref(null);
    const diff = ref({})
    const timer = ref(undefined);

    futureDate.value = new Date(2050, 0, 1);
    const getDateDiff = (date1, date2) => {
      const diff = new Date(date2.getTime() - date1.getTime());
      return {
        year: diff.getUTCFullYear() - 1970,
        month: diff.getUTCMonth(),
        day: diff.getUTCDate() - 1,
        hour: diff.getUTCHours(),
        minute: diff.getUTCMinutes(),
        second: diff.getUTCSeconds(),
      };
    };
    
    const getDiff = () => {
      diff.value = getDateDiff(new Date(), futureDate.value);
    }

    const formatDate = (date) => {
      let d = new Date(date),
        month = (d.getMonth() + 1).toString(),
        day = d.getDate().toString(),
        year = d.getFullYear().toString();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      return [year, month, day].join("-");
    }
    
    onBeforeMount(() => {
      timer.value = setInterval(getDiff, 1000);
    })

    onBeforeUnmount(() => {
      clearInterval(timer.value);
    })

    return {
      formatDate,
      diff,
      futureDate
    };
  },
};
</script>
