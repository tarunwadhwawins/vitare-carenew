<template>
<div>
    <a-layout>
        <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
            <Header />
        </a-layout-header>
        <a-layout>
            <Sidebar />
            <a-layout-content>
                <a-row>
                    <a-col :span="24">
                        <h2 class="pageTittle">Provider Summary</h2>
                    </a-col>
                </a-row>
                <a-row :gutter="24" class="mb-24">
                    <a-col :sm="8" :xs="24">
                        <div class="patientInfo">
                            <div class="patientImg">
                                <img src="@/assets/images/profile-4.jpg" alt="image" />
                                <div class="info">
                                    <p>

                                        {{getProviderSummary?getProviderSummary.name:''}}
                                    </p>
                                    <p>
                                        <a href="tel:1234567890">
                                            <PhoneOutlined :rotate="90" /> {{getProviderSummary?getProviderSummary.phoneNumber:''}}
                                        </a>
                                    </p>
                                    <p> {{getProviderSummary?getProviderSummary.address:''}}
                                    </p>
                                </div>
                            </div>
                            <div class="pat-profile">
                                <div class="pat-profile-inner">
                                    <div class="thumb-head">Tags</div>
                                    <div class="thumb-desc" v-if="globalCode.documentTags"> <span v-for="tag in globalCode.documentTags" :key="tag.id">{{ tag.name+ ", "}}</span>
                                    </div>
                                </div>
                                <div class="pat-profile-inner">
                                    <div class="thumb-head">Modules</div>
                                    <div class="thumb-desc" v-if="globalCode.modules"><span v-for="modules in globalCode.modules" :key="modules.id">{{ modules.name+ ", "}}</span></div>
                                </div>
                                <div class="pat-profile-inner">
                                    <div class="thumb-head">City</div>
                                    <div class="thumb-desc">{{getProviderSummary?getProviderSummary.city:''}}</div>
                                </div>
                            </div>
                        </div>
                    </a-col>
                    <a-col :sm="16" :xs="24" v-if="arrayToObjact(screensPermissions,31)">
                        <div class="summary-tabs">
                            <h2 class="mb-24">Locations</h2>
                            <a-table :pagination="false" :columns="columns3" :data-source="providerLocationlistData" :scroll="{ x: 600 }">
                                <template #action="text">
                                    <a-tooltip placement="bottom" v-if="arrayToObjact(screensPermissions,34)">
                                        <a class="icons" @click="deleteProviderLocation(text.record.id)">
                                            <DeleteOutlined />
                                        </a>
                                    </a-tooltip>
                                </template>
                            </a-table>
                        </div>
                    </a-col>
                </a-row>
            </a-layout-content>
        </a-layout>
    </a-layout>
    <!---->
    <a-modal v-model:visible="visible" title="Add Locations" centered @ok="handleOk">
        <a-row :gutter="24">
            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <label>Location Name</label>
                    <a-input v-model="value" size="large" />
                </div>
            </a-col>
            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <label>City</label>
                    <a-input v-model="value" size="large" />
                </div>
            </a-col>
            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <label> Phone No</label>
                    <a-input v-model="value" size="large" />
                </div>
            </a-col>
            <!-- <a-col :sm="16" :xs="24"> -->
            <!-- <div class="summary-tabs">
                <h2 class="mb-24">Locations</h2>
                <a-table  rowKey="id"
                  :pagination="false"
                  :columns="columns3"
                  :data-source="data3"
                  :scroll="{ x: 600 }"
                >
                  <template #action>
                    <a-tooltip placement="bottom">
                      <template #title>
                        <span>Edit</span>
                      </template>
                      <a class="icons"><EditOutlined /></a>
                    </a-tooltip>
                    <a-tooltip placement="bottom">
                      <template #title>
                        <span>Delete</span>
                      </template>
                      <a class="icons"> <DeleteOutlined /></a>
                    </a-tooltip>
                  </template>
                </a-table>
              </div> -->
            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <label>Zipcode</label>
                    <a-input v-model="value" size="large" />
                </div>
            </a-col>
            <a-col :sm="24" :xs="24">
                <div class="form-group">
                    <label>Address</label>
                    <a-textarea v-model:value="value2" placeholder="Address" allow-clear />
                </div>
            </a-col>
        </a-row>
    </a-modal>
    <!---->
</div>
</template>

<script>
import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import { ref, computed, watchEffect, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { DeleteOutlined } from "@ant-design/icons-vue";
import { warningSwal,arrayToObjact } from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";

const columns3 = [
  {
    title: "Location Name",
    dataIndex: "locationName",
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
  },
  {
    title: "City",
    dataIndex: "city",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    slots: {
      customRender: "action",
    },
  },
];

export default {
  components: {
    Header,
    Sidebar,
    DeleteOutlined,
  },

  setup() {
    function logout() {
      localStorage.removeItem("auth");
      localStorage.clear();
    }
    const store = useStore();
    const router = useRoute();
    const visible = ref(false);
    const showModal = () => {
      visible.value = true;
    };
    const handleOk = () => {
      visible.value = false;
    };

    onMounted(() => {
      store.dispatch("editSingleProvider", router.params.id);
    });

    watchEffect(() => {
      store.dispatch("providerLocationList", router.params.id);
      store.dispatch("providerLocationList", router.params.id);
    });
    const getProviderSummary = computed(() => {
      return store.state.provider.editSingleProvider;
    });
    const providerLocationlistData = computed(() => {
      return store.state.provider.providerLocationList;
    });

    const globalCode = computed(() => {
      return store.state.common;
    });

    const providerTags = computed(() => {
      return store.state.common.documentTags;
    });
    const providerModules = computed(() => {
      return store.state.common.modules;
    });

    function deleteProviderLocation(id) {
      if (router.params.id != null) {
        warningSwal(messages.deleteWarning).then((response) => {
          if (response == true) {
            store
              .dispatch("deleteProviderLocation", {
                id: router.params.id,
                locationId: id,
              })
              .then(() => {
                store.dispatch("providerLocationList", router.params.id);
              }, 2000);
          }
        });
      } else {
        warningSwal(messages.deleteWarning).then((response) => {
          if (response == true) {
            store.dispatch("deleteProviderLocation", {
              id: router.params.id,
              locationId: id,
            });
            setTimeout(() => {
              store.dispatch("providerLocationList", router.params.id);
            }, 2000);
          }
        });
      }
    }
    
    return {
     screensPermissions:store.getters.screensPermissions,
      arrayToObjact,
      logout,
      globalCode,
      getProviderSummary,
      providerLocationlistData,
      columns3,
      providerModules,
      providerTags,
      activeKey: ref("1"),
      activeKey1: ref("1"),
      watchEffect,
      visible,
      deleteProviderLocation,
      showModal,
      handleOk,
    };
  },
};
</script>
