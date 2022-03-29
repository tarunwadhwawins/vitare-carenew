<template>
  <div class="patientTable">
    <a-table
      rowKey="id"
      :columns="meta.column"
      :data-source="meta.patientList"
      :scroll="{ y: tableYScrollerCounterPage, x: 2000 }"
      :pagination="false"
    >
      <template
        #firstName="{ text, record }"
        v-if="arrayToObjact(patientsPermissions, 65)"
      >
        <router-link
          :to="{ name: 'PatientSummary', params: { udid: record.id } }"
          >{{ text }}</router-link
        >
      </template>
      <template #firstName="{ text }" v-else>
        <span>{{ text }}</span>
      </template>
      <template #flags="text">
        <span class="box" :style="{ 'background-color': text.text }"></span>
        <!-- <span class="box" :class="(text = text.match(/yellowBgColor/g))" v-if="text.match(/yellowBgColor/g)"></span> -->
      </template>
      <!-- <template #compliance>
        <a class="icons">
            <WarningOutlined /></a>
    </template> -->
      <template #patientVitals>
        <WarningOutlined />
      </template>

      <template #lastReadingDate>
        <WarningOutlined />
      </template>
    </a-table>
  </div>
</template>

<script>
import { WarningOutlined } from "@ant-design/icons-vue";
import { onMounted, computed } from "vue";
import { useStore } from "vuex";

import { arrayToObjact ,tableYScrollerCounterPage} from "@/commonMethods/commonMethod";
export default {
  name: "DataTable",
  components: {
    WarningOutlined,
  },
  props: {},
  setup() {
    const store = useStore();
    const meta = store.getters.patientsRecord.value;
    let data = [];
    let scroller = "";
    onMounted(() => {
      var tableContent = document.querySelector(".ant-table-body");
      tableContent.addEventListener("scroll", (event) => {
        let maxScroll = event.target.scrollHeight - event.target.clientHeight;
        let currentScroll = event.target.scrollTop + 2;
        if (currentScroll >= maxScroll) {
          let current_page = meta.patientMeta.current_page + 1;
          if (current_page <= meta.patientMeta.total_pages) {
            scroller = maxScroll;
            meta.patientMeta = "";
            
            data = meta.patientList;
            store.state.patients.patientList = "";
            let url=store.getters.searchTable.value ? store.getters.searchTable.value :''
            store.dispatch("patients", "?search="+url+"&page=" + current_page).then(() => {
              //console.log('response',response)
              loadMoredata();
            });
          }
        }
      });
    });

    function loadMoredata() {
      const newData = meta.patientList;
      newData.forEach((element) => {
        data.push(element);
      });
      meta.patientList = data;
      var tableContent = document.querySelector(".ant-table-body");

      setTimeout(() => {
        tableContent.scrollTo(0, scroller);
      }, 50);
    }
    const patientsPermissions = computed(() => {
      return store.state.screenPermissions.patientsPermissions;
    });
    return {
      patientsPermissions,
      arrayToObjact,
      meta,
      tableYScrollerCounterPage
    };
  },
};
</script>
