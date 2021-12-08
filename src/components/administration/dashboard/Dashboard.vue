<template>
  <div>
    <!---->
    <a-layout>
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <Header />
      </a-layout-header>
      <a-layout>
        <Sidebar />
        <a-layout-content> </a-layout-content>
      </a-layout>
    </a-layout>
    <!---->
  </div>
</template>

<script>
import Header from "@/components/administration/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";

export default {
  components: {
    Header,
    Sidebar,
  },

  setup() {
    function logout() {
      localStorage.removeItem("auth");
      localStorage.clear();
    }

    return {
      logout,
    };
  },
};
</script>
