<template>
  <a-modal width="1000px" title="Notes Detail" centered>
    <a-row :gutter="24">
      <a-col :sm="24" :xs="24">
        <div class="text-right mb-24">
          <a-button class="btn blueBtn" @click="showModal();actionTrack(paramsId,316,'patient')">Export to Excel/PDF</a-button>
        </div>
        <a-table  rowKey="id"  :columns="notesColumns" :data-source="notesList" :pagination="false">
          <template #flags="{ record }">
            <Flags :flag="record.flag" />
          </template>
        </a-table>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
import { computed, defineComponent, watchEffect } from "vue";
import { useStore } from "vuex";
import Flags from "@/components/common/flags/Flags";
import { useRoute } from "vue-router";
import {
  actionTrack
} from '@/commonMethods/commonMethod';
export default defineComponent({
  components: {
    Flags,
  },
  props:{
    Id:String
  },
  setup(props) {
    const store = useStore();
    const route = useRoute();

    watchEffect(() => {
      if(props.Id){
      store.dispatch('notesList', props.Id);
      }else{
      store.dispatch('notesList', route.params.udid);
      }
    })

    const notesList = computed(() => {
      return store.state.notes.notesList
    })

    const notesColumns = [
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
      },
      {
        title: "Note",
        dataIndex: "note",
        key: "note",
      },
      {
        title: "Added By",
        dataIndex: "addedBy",
        key: "addedBy",
      },
      {
        title: "Flag",
        dataIndex: "flag",
        key: "flag",
        slots: {
          customRender: "flags",
        },
      },
    ];

    return {
      paramsId:route.params.udid,
      actionTrack,
      notesList,
      notesColumns,
    };
  },
});
</script>