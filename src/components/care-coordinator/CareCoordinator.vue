<template>
  <div>
    <a-layout>
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <Header/>
      </a-layout-header>
      <a-layout>
        <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
          <Sidebar/>
        </a-layout-sider>
        <a-layout-content>
          <a-row>
            <MainHeader heading="Manange Care Coordinator" buttonText="Add New Coordinator" modalScreen="coordinator"></MainHeader>
          </a-row>

          <a-row class="mb-24" :gutter="24">
            <a-col :span="12">
              <h2>Specialization</h2>
              <a-row :gutter="24">
                <LongCard customClass="bg-purple" count="4" text="Wellness"></LongCard>
                <LongCard customClass="bg-yellow" count="5" text="Behaviour"></LongCard>
              </a-row>
            </a-col>
            <a-col :span="12">
              <h2>Network</h2>
              <a-row :gutter="24">
                <LongCard customClass="bg-blue" count="5" text="In"></LongCard>
                <LongCard customClass="bg-sky" count="6" text="Out"></LongCard>
              </a-row>
            </a-col>
          </a-row>
          
          <CoordinatorTable/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Header from "../layout/header/header";
import Sidebar from "../layout/sidebar/sidebar";
import LongCard from "@/components/common/cards/LongCard";
import CoordinatorTable from "@/components/common/tables/CoordinatorTable";
import MainHeader from "@/components/common/MainHeader";
export default {
  components: {
    Header,
    Sidebar,
    LongCard,
    CoordinatorTable,
    MainHeader
  },
};
</script>
