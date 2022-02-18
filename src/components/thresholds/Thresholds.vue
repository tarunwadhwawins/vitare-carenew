<template>
  <a-layout-content>
    <div class="common-bg">
      <a-row>
        <a-col :span="24">
          <h2 class="pageTittle">
            {{ $t("thresholds.generalParameters") }}

            <div class="commonBtn">
              <a-button class="btn primaryBtn" @click="showModal(true)">{{
                $t("thresholds.addNewParameters")
                }}</a-button>
            </div>
          </h2>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-select v-model:value="value" :size="size" mode="tags" style="width: 100%" placeholder="Search . . ."
            :options="options" @change="handleChange">
          </a-select>
        </a-col>
        <a-col :span="12">
          <div class="text-right mb-24">
            <a-button class="primaryBtn">{{
              $t("global.exportToExcel")
              }}</a-button>
          </div>
        </a-col>
       
          
       
        <ThresholdsTable v-if="vitalList" :thresholdsData="vitalList" ></ThresholdsTable>
        <div v-else><Loader /></div>
        
      </a-row>
    </div>
    
  </a-layout-content>

  <Thresholds v-model:visible="Thresholds" @is-visible="showModal($event)" />
</template>
<script>
  import { ref, watchEffect, computed } from "vue";
  import Thresholds from "@/components/modals/Thresholds";
  import ThresholdsTable from "./ThresholdsTable";
  import { useStore } from "vuex";
  import Loader from "@/components/loader/Loader";

  export default {
    components: {
      ThresholdsTable,
      Thresholds,
      Loader
    },

    setup() {
      const store = useStore();
      watchEffect(() => {
        store.dispatch("generalParameterList");
      });
      const vitalList = computed(() => {
        return store.state.thresholds.vitalList;
      });
      const handleChange = (value) => {
        console.log(`selected ${value}`);
      };
      const checked = ref([false]);

      const Thresholds = ref(false);
      const showModal = (e) => {
        Thresholds.value = e;
      };
      const options = ref([
        {
          value: "Group One",
          label: "Group One",
        },
        {
          value: "Blood Glucose",
          label: "Blood Glucose",
        },
        {
          value: "Systolic BP",
          label: "Systolic BP",
        },
        {
          value: "Weight",
          label: "Weight",
        },
        {
          value: "Spo2",
          label: "Spo2",
        },
        {
          value: "Pulse (BP Cuff)",
          label: "Pulse (BP Cuff)",
        },
        {
          value: "Group Three",
          label: "Group Three",
        },
      ]);

      return {
        
        vitalList,
        checked,
        Thresholds,
        showModal,
        value: ref([]),
        handleChange,
        options,
        size: ref([]),
      };
    },
  };
</script>
<style lang="scss"></style>