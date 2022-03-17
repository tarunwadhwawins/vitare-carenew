<template>
  <a-modal width="1000px" title="Critical Note Details" centered :maskClosable="false">
    <a-row :gutter="24">
      <a-col :sm="24" :xs="24">
        <a-table  rowKey="id"  :columns="notesColumns" :data-source="criticalNotesList" :pagination="false">
          <template #criticalNote="{record}">
          <a-popover>
            <template #content>
              <p :ellipsis=true>{{record.criticalNote }}</p>
            </template>
            {{ record.criticalNote.length>150?record.criticalNote.substring(0,120)+'...':record.criticalNote }}
          </a-popover>
        </template>
        <template #action="{record}">
        <a-tooltip placement="bottom">
            <template #title>
                <span>{{$t('global.delete')}}</span>
            </template>
            <a class="icons" @click="deleteDocument(record.id)">
                <DeleteOutlined /></a>
        </a-tooltip>
        </template>
        </a-table>
        <Loader/>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
import { computed, defineComponent,watchEffect } from "vue";
import { useStore } from "vuex";
import {DeleteOutlined} from "@ant-design/icons-vue";
import { warningSwal } from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
import {useRoute} from "vue-router"
import Loader from "@/components/loader/Loader"
export default defineComponent({
  components: {
   DeleteOutlined,
   Loader
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    watchEffect(() => {
      store.dispatch('criticalNotesList', route.params.udid);
    })

    const criticalNotesList = computed(() => {
      return store.state.patients.criticalNotesList
    })

    const notesColumns = [
      {
        title: "Notes",
        dataIndex: "criticalNote",
        className:'criticalNote',
        slots:{
          customRender:'criticalNote'
        }
      },
      
      {
        title: "Action",
        dataIndex: "action",
        className:'criticalNoteAction',
        slots: {
          customRender: "action",
        },
      },
    ];

    function deleteDocument(id) {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch("criticalNotesDelete", {
            id: route.params.udid,
            documentId: id,
          });
          setTimeout(() => {
             store.dispatch('criticalNotesList', route.params.udid);
          }, 2000);
        }
      });
    }

    return {
      deleteDocument,
      criticalNotesList,
      notesColumns,
    };
  },
});
</script>
<style >
.ant-popover {
    width: 60%;
    left: 24px !important;
  }
  .criticalNote { width: 50%; }
  td.criticalNote {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis !important;
    margin: 0 auto;
  }
  th.criticalNoteAction, td.criticalNoteAction { text-align: center !important; }

</style>