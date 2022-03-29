<template>
  
  <a-table  rowKey="id"
    :columns="globalCodesColumns"
    :data-source="globalCodesList"
    :scroll="{ y: tableYScroller }" :pagination=false>
    <template #actions="{record}">
      <a-tooltip placement="bottom" v-if="arrayToObjact(globalCodesPermissions,7)">
        <template #title>
          <span>Edit</span>
        </template>
        <span class="icons"><EditOutlined @click="editGlobalCode(record.id)" /></span>
      </a-tooltip>
      <a-tooltip placement="bottom" v-if="arrayToObjact(globalCodesPermissions,8)">
        <template #title>
          <span>Delete</span>
        </template>
        <span class="icons"><DeleteOutlined @click="deleteGlobalCode(record.id)" /></span>
      </a-tooltip>
    </template>
    <!-- v-if="arrayToObjact(globalCodesPermissions,266)"> -->
    <template #status="{record}" >
      <a-switch v-model:checked="record.status" @change="updateStatus(record.id, $event)" />
    </template>
  </a-table>
</template>

<script>
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
import { watchEffect, computed ,onMounted} from "vue";
import { useStore } from "vuex";
// import swal from 'sweetalert2';
import {warningSwal,arrayToObjact,tableYScroller} from "@/commonMethods/commonMethod"
import { messages } from '@/config/messages';
export default {
  components: {
    DeleteOutlined,
    EditOutlined,
  },
  setup(props, {emit}) {
    const store = useStore()
    watchEffect(() => {
      store.dispatch('globalCodesList')
    })
    
    const globalCodesList = store.getters.globalCodesList
    const meta = store.getters.globalMeta
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
                        data = globalCodesList.value
                        store.state.globalCodes.globalCodesList = ""
                        let url=store.getters.searchTable.value ? store.getters.searchTable.value :''
                        store.dispatch("globalCodesList", "&search="+url+"&page=" + current_page).then(() => {
                            loadMoredata()
                        })

                    }
                }
            })
        })

        function loadMoredata() {
            const newData = globalCodesList.value

            newData.forEach(element => {
                data.push(element)
            });
            globalCodesList.value = data
            var tableContent = document.querySelector('.ant-table-body')

            setTimeout(() => {
                tableContent.scrollTo(0, scroller)
            }, 50)

        }
    const editGlobalCode = (id) => {
      emit('edit-global-code', id)
    }

    const updateStatus = (id, status) => {
      const data = {
        "status": status
      };
      store.dispatch('updateGlobalCode', {id, data}).then(() => {
        store.dispatch('globalCodesList')
      })
    }

    const deleteGlobalCode = (id) => {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch('deleteGlobalCode', id).then(() => {
            store.dispatch('globalCodesList')
          })
        }
      })
    }

    const globalCodesColumns = [
      {
        title: "Category",
        dataIndex: "globalCodeCategory",
        key: "globalCodeCategory",
      
        
      },
      {
        title: "Code Name",
        dataIndex: "name",
        key: "name",
        
        
        
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        
       
      },
      {
        title: "Used Count",
        dataIndex: "usedCount",
        
        
        
      },
      {
        title: "Status",
        dataIndex: "status",
        
       
        slots: {
          customRender: "status"
        },
      },
      {
        title: "Actions",
        dataIndex: "actions",
        slots: {
          customRender: "actions",
        },
      },
    ];

    const globalCodesPermissions = computed(()=>{
      return store.state.screenPermissions.globalCodesPermissions
    })
    
    return {
      globalCodesPermissions,
      arrayToObjact,
      editGlobalCode,
      deleteGlobalCode,
      globalCodesColumns,
      globalCodesList,
      updateStatus,
      warningSwal,
      tableYScroller
    }
  }
}
</script>

<style>
  th.codeActions {
    width: 120px;
  }
  th.codeStatus, th.usedCount {
    width: 150px;
  }
 
</style>