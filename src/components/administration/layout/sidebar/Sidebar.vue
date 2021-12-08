<template>
  <a-layout-sider
    :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
  >
    <div class="menuList">
      <a-menu>
        <router-link to="/dashboard"
          ><a-menu-item
            ><HomeOutlined /><span class="menuItem">Dashboard</span></a-menu-item
          ></router-link
        >
        <router-link to="/communications"
          ><a-menu-item
            ><MailOutlined /><span class="menuItem">Communications</span></a-menu-item
          ></router-link
        >
        <router-link to="/dashboard"
          ><a-menu-item
            ><MailOutlined /><span class="menuItem">Home</span></a-menu-item
          ></router-link
        >
      </a-menu>
    </div>
  </a-layout-sider>
</template>

<script>
import { defineComponent, ref, reactive, toRefs, onUnmounted } from "vue";
import { HomeOutlined, MailOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    HomeOutlined,
    MailOutlined,
  },

  setup() {
    const state = reactive({
      selectedKeys: ["1"],
    });
    onUnmounted(() => {
      document.body.classList.remove("show");
    });
    return { ...toRefs(state) };
  },
});
</script>
<style lang="scss">
#nav {
  a {
    color: #000;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
