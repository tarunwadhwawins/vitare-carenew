<template>
<a-table v-if="providersListAll" rowKey="id" :columns="providerListColumns" :data-source="providersListAll" >
    <template #name="{text,record}">
               <router-link :to="{ name: 'providerSummary', params: { id:record.id  }}">{{text}}</router-link>
    </template>
    <!-- v-if="arrayToObjact(globalCodesPermissions,25)" -->
    <template #status="{record}" >
        <a-switch v-model:checked="record.status" @change="updateStatus(record.id, $event)" />
    </template>
    <template #action="text">
      <!-- v-if="arrayToObjact(globalCodesPermissions,23)" -->
        <a-tooltip placement="bottom" >
            <a class="icons">
                <EditOutlined @click="editSingleProvider(text.record.id)" /></a>
        </a-tooltip>
        <!-- v-if="arrayToObjact(globalCodesPermissions,24)" -->
        <a-tooltip placement="bottom" >
            <a class="icons" @click="deleteSingleProvider(text.record.id)">
                <DeleteOutlined />
            </a>
        </a-tooltip>

    </template>
</a-table>
</template>

<script>
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
import {  computed, reactive } from "vue";
import { messages } from "@/config/messages";
import { useStore } from "vuex";
import { warningSwal,arrayToObjact } from "@/commonMethods/commonMethod";
export default {
  components: {
    EditOutlined,
    DeleteOutlined,
  },
  props: {
    id: {
      type: Number,
    },
  },

  setup(props, { emit }) {
    const store = useStore();
    const providerId = reactive(props.id);
    
    const providersListAll = computed(() => {
      return store.state.provider.providersListAll;
    });
    const providersData = computed(() => {
      return store.state.provider;
    });

    function deleteSingleProvider(id) {
      if (id != null) {
        warningSwal(messages.deleteWarning).then((response) => {
          if (response == true) {
            store
              .dispatch("deleteSingleProvider", {
                id: id,
              })
              .then(() => {
                store.dispatch("providersListAll");
              }, 2000);
          }
        });
      } else {
        warningSwal(messages.deleteWarning).then((response) => {
          if (response == true) {
            store.dispatch("deleteSingleProvider", {
              id: providersData.value.provider.id,
            });
            setTimeout(() => {
              store.dispatch(
                "deleteSingleProvider",
                providersData.value.provider.id
              );
            }, 2000);
          }
        });
      }
    }

    const updateStatus = (id, status) => {
      const data = {
        isActive: status,
      };
      store
        .dispatch("updateSingleProvider", {
          id,
          data,
        })
        .then(() => {
         store.dispatch("providersListAll");
        });
    };

    const editSingleProvider = (id) => {
      store.dispatch("editSingleProvider", id);
      emit("isEdit", {
        check: true,
        providerId: id,
      });
    };
    const providerListColumns = computed(() => {
      return store.state.provider.providerListColumns;
    });

    const providersPermissions = computed(()=>{
      return store.state.screenPermissions.providersPermissions
    })

    return {
      providersPermissions,
      arrayToObjact,
      editSingleProvider,
      providerListColumns,
      warningSwal,
      providersListAll,
      deleteSingleProvider,
      providersData,
      emit,
      updateStatus,
      providerId,
      props,
      text: "provider-summary",
    };
  },
};
</script>
