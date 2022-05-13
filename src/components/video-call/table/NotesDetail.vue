<template>
<div :class="showRecord==true? 'notesDetailBg show':'notesDetailBg'">
   <div class="notesDetail 23">
          <div class="notesHeader">
            <h4>Notes Detail</h4>
            <CloseOutlined @click="closeModal"/>
          </div>
          <div class="notesBody">
            <div class="form-group">
                <div class="calendarDropdown notificationModal">
                
                    <div class="itemWrapper">
                        <div class="leftWrapper">Added By {{showRecord}}</div>
                        <div class="rightWrapper">{{detailsNotes.addedBy}}</div>
                    </div>
                    <div class="itemWrapper">
                        <div class="leftWrapper">Date Time</div>
                        <div class="rightWrapper">
                            {{ detailsNotes.date}}
                        </div>
                    </div>
                    <div class="itemWrapper">
                        <div class="leftWrapper">Specialization</div>
                        <div class="rightWrapper">
                            {{detailsNotes.specialization}}
                        </div>
                    </div>
                    <div class="itemWrapper">
                        <div class="leftWrapper">Type</div>
                        <div class="rightWrapper">
                            {{detailsNotes.type}}
                        </div>
                    </div>
                    
                   <div class="itemWrapper">
                      <div class="leftWrapper">Flags</div>
                      <div class="rightWrapper"><span class="box" :title="detailsNotes.flag" :style="{ 'background-color': detailsNotes.color }"></span></div>
                  </div>
                    
                    <div class="itemWrapper">
                        <div class="leftWrapper">Note</div>
                        <div class="rightWrapper">{{ detailsNotes.notes }}</div>
                    </div>

                </div>

            </div>
          </div>
        </div>
        </div>
    <a-row :gutter="24">
      <a-col :sm="24" :xs="24">
      
        <a-table  rowKey="id"  :columns="notesColumns" :data-source="notesList" :pagination="false">
          <template #flags="{ record }">
            <Flags :flag="record.color" />
          </template>
          <template #action="{record}" >
          
            <a class="icons"><EyeTwoTone @click="edit(record.id)" /></a>
          </template>
        </a-table>
       
        <Loader />
      </a-col>
    </a-row>
    
</template>
<script>
import { computed, defineComponent, watchEffect,ref } from "vue";
import { useStore } from "vuex";
import Flags from "@/components/common/flags/Flags";
import { useRoute } from "vue-router";
import Loader from "@/components/loader/Loader";
import {
  EyeTwoTone,
 CloseOutlined
} from "@ant-design/icons-vue";
import {
  actionTrack
} from '@/commonMethods/commonMethod';
export default defineComponent({
  components: {
    Flags,
    EyeTwoTone,
    CloseOutlined,
    Loader
  },
  props:{
    Id:String
  },
  setup(props) {
    const store = useStore();
    const route = useRoute();
 const showRecord = ref('false')
 const detailsNotes = ref('')
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
const edit = (id) =>{
    detailsNotes.value = notesList.value.find(item => item.id==id)
    showRecord.value = true

}
    const notesColumns = [
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        className: "note-date",
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
       {
        title: "Note",
        dataIndex: "note",
        key: "note",
        className: "note-text",
        ellipsis: true,
      },
      
      
     
      {
        title: "Detail",
        dataIndex: "action",
        className: "doc-actions",
        slots: {
          customRender: "action",
        },
        
      },
      
    ];

    function showModal(){
      // console.log(object);
    }
    function closeModal(){
      console.log("ss")
      showRecord.value = false
    }

    return {
      showModal,
      paramsId:route.params.udid,
      actionTrack,
      notesList,
      notesColumns,
      edit,
      showRecord,
      detailsNotes,
      closeModal
    };
  },
});
</script>