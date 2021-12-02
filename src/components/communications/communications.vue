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
          <a-row class="mb-24">
            <MainHeader heading="Communications" buttonText="Add Message" modalScreen="communication"></MainHeader>
            <a-col :span="24">
              <a-row :gutter="24">
                <LongCard customClass="bg-purple" count="10" text="Today"></LongCard>
                <LongCard customClass="bg-sky" count="10" text="Tomorrow"></LongCard>
                <LongCard customClass="bg-yellow" count="10" text="Week"></LongCard>
              </a-row>
            </a-col>
          </a-row>
          <CommunicationsTable/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Header from "../layout/header/header";
import Sidebar from "../layout/sidebar/sidebar";
import { ref } from "vue";
import LongCard from "@/components/common/cards/LongCard";
import CommunicationsTable from "@/components/common/tables/CommunicationsTable";
import MainHeader from "@/components/common/MainHeader";
export default {
  components: {
    Header,
    Sidebar,
    LongCard,
    CommunicationsTable,
    MainHeader
  },
};
</script>
