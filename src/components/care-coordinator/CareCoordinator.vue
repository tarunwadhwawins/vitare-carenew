<template>
  <a-row class="mb-24" :gutter="24">
    <a-col :sm="12" :xs="24">
      <h2>Specialization</h2>
      <a-row :gutter="24">
        <LongCard customClass="two" :count="specializationTotal" :text="specializationText"></LongCard>
        <LongCard customClass="four" count="5" text="Behaviour"></LongCard>
      </a-row>
    </a-col>
    <a-col :sm="12" :xs="24">
      <h2>Network</h2>
      <a-row :gutter="24">
        <LongCard customClass="six" :count="networkTotal" :text="networkText"></LongCard>
        <LongCard customClass="five" count="6" text="Out"></LongCard>
      </a-row>
    </a-col>
  </a-row>
  
  <CoordinatorTable @edit-clicked="onClickEditPersonal($event)"></CoordinatorTable>
</template>

<script>
import { ref, watch } from 'vue';
import LongCard from "@/components/common/cards/LongCard";
import CoordinatorTable from "@/components/common/tables/CoordinatorTable";
import store from "@/store/index";
export default {
  data() {
    return {
      
    }
  },
  components: {
    LongCard,
    CoordinatorTable,
  },
  setup(props, {emit}) {
    const specializationTotal = ref()
    const specializationText = ref()
    const networkTotal = ref()
    const networkText = ref()
    watch( () => {
      store.dispatch("getSpecializationsCount", 1).then((res) => {
        const specialization = res.data.data;
        specializationTotal.value = specialization.total;
        specializationText.value = specialization.specialization;
        // console.log(specialization.value)
      },
      (error) => {
        console.log(error)
        this.isLoading = false;
        this.message = (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) ||
        error.message ||
        error.toString();
      });
      
      store.dispatch("getNetworkCount", 1)
      .then((res) => {
        const network = res.data.data;
        networkTotal.value = network.total;
        networkText.value = network.network;
      },
      (error) => {
        console.log(error)
        this.isLoading = false;
        this.message = (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) ||
        error.message ||
        error.toString();
      });
    })
    const onClickEditPersonal = (rowId) => {
      store.dispatch("getCoordinatorDetails", rowId)
      .then((res) => {
        const coordinatorData = res.data.data;
        localStorage.setItem('is_update_coordinator', true)
        localStorage.setItem('personalData', JSON.stringify(coordinatorData))
        emit('is-visible', true)
      },
      (error) => {
        console.log(error)
        this.message = (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) ||
        error.message ||
        error.toString();
      });
    }
      
    return {
      onClickEditPersonal,
      specializationTotal,
      specializationText,
      networkTotal,
      networkText,
    }
  }
};
</script>
