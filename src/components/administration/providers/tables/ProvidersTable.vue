<template>
<a-table  rowKey="id" :columns="providerListColumns" :data-source="providersListAll" :scroll="{ y: tableYScroller }" :pagination=false>
    <template #name="{text,record}">
               <router-link :to="{ name: 'providerSummary', params: { id:record.id  }}">{{text}}</router-link>
    </template>
    <!-- v-if="arrayToObjact(globalCodesPermissions,25)" -->
    <template #status="{record}" v-if="arrayToObjact(providersPermissions,25)">
        <a-switch v-model:checked="record.status" @change="updateStatus(record.id, $event)" />
    </template>
    <template #action="text">
      <!--  -->
        <a-tooltip placement="bottom" v-if="arrayToObjact(providersPermissions,23)">
            <a class="icons">
                <EditOutlined @click="editSingleProvider(text.record.id)" /></a>
        </a-tooltip>
        <!--  -->
        <a-tooltip placement="bottom" v-if="arrayToObjact(providersPermissions,24)">
            <a class="icons" @click="deleteSingleProvider(text.record.id)">
                <DeleteOutlined />
            </a>
        </a-tooltip>

    </template>
</a-table>
</template>

<script>
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
import {  computed, reactive,onMounted } from "vue";
import { messages } from "@/config/messages";
import { useStore } from "vuex";
import { warningSwal,arrayToObjact ,tableYScroller} from "@/commonMethods/commonMethod";
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
    
    const providersListAll = store.getters.providersListAll
    const meta = store.getters.providerMeta
        let data = ''
        let scroller = ''
        onMounted(() => {
            var tableContent = document.querySelector('.ant-table-body')
            tableContent.addEventListener('scroll', (event) => {
                let maxScroll = event.target.scrollHeight - event.target.clientHeight
                let currentScroll = event.target.scrollTop + 2
                if (currentScroll >= maxScroll) {

                    let current_page = meta.current_page + 1

                    if (current_page <= meta.total_pages) {
                        scroller = maxScroll
                        meta.value = ""
                        data = providersListAll.value
                        store.state.provider.providersListAll = ""
                        let url=store.getters.searchTable.value ? store.getters.searchTable.value :''
                        store.dispatch("providersListAll", "&search="+url+"&page=" + current_page).then(() => {
                            loadMoredata()
                        })

                    }
                }
            })
        })

        function loadMoredata() {
            const newData = providersListAll.value

            newData.forEach(element => {
                data.push(element)
            });
            providersListAll.value = data
            var tableContent = document.querySelector('.ant-table-body')

            setTimeout(() => {
                tableContent.scrollTo(0, scroller)
            }, 50)

        }

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
        showPopup:true
      };
      store
        .dispatch("updateSingleProvider", {
          id,
          data,
        })
        .then(() => {
         //store.dispatch("providersListAll");
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

    const providersPermissions =store.getters.permissionRecords.value.providersPermissions

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
      tableYScroller,
      text: "provider-summary",
    };
  },
};
</script>
