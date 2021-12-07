<template>


          <a-row class="mb-24" :gutter="24">
            <a-col :sm="12" :xs="24">
              <h2>Specialization</h2>
              <a-row :gutter="24">
                <LongCard customClass="two" :count="this.specialization.total" :text="specialization.specialization"></LongCard>
                <LongCard customClass="four" count="5" text="Behaviour"></LongCard>
              </a-row>
            </a-col>
            <a-col :sm="12" :xs="24">
              <h2>Network</h2>
              <a-row :gutter="24">
                <LongCard customClass="six" :count="this.network.total" :text="network.network"></LongCard>
                <LongCard customClass="five" count="6" text="Out"></LongCard>
              </a-row>
            </a-col>
          </a-row>
          
          <CoordinatorTable></CoordinatorTable>
          <!-- <template #action>
            <a class="icons"><EyeOutlined /></a>
            <a class="icons"><EditOutlined /></a>
            <a class="icons"> <DeleteOutlined /></a>
          </template> -->
</template>

<script>
import LongCard from "@/components/common/cards/LongCard";
import CoordinatorTable from "@/components/common/tables/CoordinatorTable";
// import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons-vue";
export default {
  data() {
    return {
      specialization: [{}],
      network: [{}]
    }
  },
  components: {
    LongCard,
    CoordinatorTable,
    // DeleteOutlined,
    // EditOutlined,
    // EyeOutlined,
  },
  created() {
    this.$store.dispatch("getSpecializationsCount", 1)
    .then((res) => {
      this.specialization = res.data.data;
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
    
    this.$store.dispatch("getNetworkCount", 1)
    .then((res) => {
      this.network = res.data.data;
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
  }
};
</script>
