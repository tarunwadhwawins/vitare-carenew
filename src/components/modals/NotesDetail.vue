<template>
  <a-modal width="80%" title="Notes Detail" centered>
    <a-row :gutter="24">
      <a-col :sm="24" :xs="24">
        <div class="text-right mb-24">
        </div>
        <a-table  rowKey="id"  :columns="notesColumns" :data-source="notesList" :pagination="false">
          <template #flags="{ record }">
            <Flags :flag="record.color" />
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
      }
      else if(route.name == "PatientSummary") {
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
        className: "note-date",
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        className: "note-category",
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        className: "note-type",
      },
      {
        title: "Note",
        dataIndex: "note",
        key: "note",
        className: "note-text",
        ellipsis: true,
      },
      {
        title: "Added By",
        dataIndex: "addedBy",
        key: "addedBy",
      },
      {
        title: "Flag",
        dataIndex: "color",
        key: "color",
        slots: {
          customRender: "flags",
        },
        className: "note-flag",
      },
    ];

    function showModal(){
      // console.log(object);
    }

    return {
      showModal,
      paramsId:route.params.udid,
      actionTrack,
      notesList,
      notesColumns,
    };
  },
});
</script>