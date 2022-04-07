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
                          <EditOutlined class="editIcon" style="float:right;padding:10px" @click="showModal(getProviderSummary?.id)"/>
                            <div class="patientImg">
                                
                                <div class="info">
                                    <p>

                                      Name :   {{ getProviderSummary?getProviderSummary.name:''}}
                                    </p>
                                    <p>
                                        <a href="tel:1234567890">
                                          Phone :   <PhoneOutlined :rotate="90" /> {{ getProviderSummary?getProviderSummary.phoneNumber:''}}
                                        </a>
                                    </p>
                                    <p> Address : {{ getProviderSummary?getProviderSummary.address:''}}
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
                            <a-table :pagination="false" :columns="columns" :data-source="providerLocationlistData" :scroll="{ x: 600 }">
                                
                            </a-table>
                        </div>
                    </a-col>
                </a-row>
            </a-layout-content>
        </a-layout>
    </a-layout>
     <AdminProvidersModal v-if="visible" v-model:visible="visible"  @closeModal="closeModal($event)" :isAdd="true" :providerId="providerID" />
    <!---->
    <!-- <a-modal v-model:visible="visible" title="Add Locations" centered @ok="handleOk">
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
            <a-col :sm="16" :xs="24">
            <div class="summary-tabs">
                <h2 class="mb-24">Locations</h2>
                <a-table  rowKey="id"
                  :pagination="false"
                  :columns="columns"
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
              </div>
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
    </a-modal> -->
    <!---->
    
</div>
</template>


<script>
import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import { ref, computed, watchEffect, onMounted, defineComponent, defineAsyncComponent } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { EditOutlined,PhoneOutlined } from "@ant-design/icons-vue";
import { warningSwal,arrayToObjact } from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
// import AdminProvidersModal from "@/components/modals/AdminProvidersModal";

const columns = [
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
  
];

export default defineComponent({
  components: {
    Header,
    Sidebar,
    EditOutlined,
    PhoneOutlined,
    AdminProvidersModal:defineAsyncComponent(()=>import("@/components/modals/AdminProvidersModal"))
  },

  setup() {
    function logout() {
      localStorage.removeItem("auth");
      localStorage.clear();
    }
    const store = useStore();
    const router = useRoute();
    const visible = ref(false);
    const providerID = ref();

    const showModal = (id) => {
      providerID.value =id
      visible.value = true;
       store.dispatch('editSingleProvider', id)
    };
    const closeModal = (e) => {
      visible.value = e;
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
      providerID,
      screensPermissions:store.getters.screensPermissions,
      arrayToObjact,
      logout,
      globalCode,
      getProviderSummary,
      providerLocationlistData,
      columns,
      providerModules,
      providerTags,
      watchEffect,
      visible,
      deleteProviderLocation,
      showModal,
      closeModal,
    };
  },
});
</script>
