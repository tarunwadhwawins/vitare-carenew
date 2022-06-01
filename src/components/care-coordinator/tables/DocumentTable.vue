<template>
<div>
<a-table  rowKey="id" :columns="documentColumns" :data-source="documentsData" :pagination="false" >
    <template #tags="text">
        <span v-for="tag,i in text.text.data" :key="tag.id">{{i==0?' ':','}}{{ tag.tag}}</span>
    </template>
    <template #document="text">
          <a :href="text.text" download>
            <FileOutlined />
          </a>
    </template>
    <template #action="text">
      <a-tooltip placement="bottom" v-if="arrayToObjact(screensPermissions, 60)">
        <template #title>
          <span>{{$t('global.edit')}}</span>
        </template>
        <a class="icons" @click="editDocument(text.record.id)">
          <EditOutlined />
        </a>
      </a-tooltip>
        <a-tooltip placement="bottom" v-if="arrayToObjact(screensPermissions,61)">
            <template #title>
                <span>{{$t('global.delete')}}</span>
            </template>
            <a class="icons" @click="deleteDocument(text.record.id)">
                <DeleteOutlined /></a>
        </a-tooltip>
    </template>
</a-table>
<a-modal width="50%" v-model:visible="visibleStaffDoc" title="Edit Documents" :maskClosable="false" centered  @cancel="staffDocCancelModal()" :footer="false">
    <StaffDocumentForm  entity="staff" :paramId="paramId" @saveModal="staffDocCloseModal($event)" />
</a-modal>
</div>
</template>

<script>
import { computed,defineAsyncComponent,defineComponent,ref } from "vue";
import { DeleteOutlined, FileOutlined,EditOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { warningSwal,arrayToObjact } from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
// import StaffDocumentForm from "@/components/modals/forms/StaffDocuments";
export default defineComponent({
  components: {
    DeleteOutlined,
    FileOutlined,
    EditOutlined,
    StaffDocumentForm:defineAsyncComponent(()=> import("@/components/modals/forms/StaffDocuments"))

  },
  props: {
    Id: String,
  },
  setup(props) {
    const store = useStore();
    const router = useRoute();
    const visibleStaffDoc =ref(false)
    const paramId =ref()
    function deleteDocument(id) {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch("deleteStaffDocument", {
            id: props.Id ? props.Id : router.params.udid,
            documentId: id,
          });
          setTimeout(() => {
            store.dispatch(
              "staffDocuments",
              props.Id ? props.Id : router.params.udid
            );
          }, 2000);
        }
      });
    }
    const documentsData = computed(() => {
      return store.state.careCoordinator.staffDocuments;
    });

    const documentColumns = computed(() => {
      return store.state.careCoordinator.documentColumns;
    });

    

    const addStaffs = computed(() => {
      return store.state.careCoordinator.addStaff;
    });


    function editDocument(id){
      visibleStaffDoc.value=true
      paramId.value=id
      store.dispatch('documentStaffDetails', {
        staffUdid: addStaffs.value? addStaffs.value.id : router.params.udid,
        documentUdid: paramId.value
      })
    }

    const staffDocCloseModal = (value) => {
      visibleStaffDoc.value = value;
      store.state.careCoordinator.documentStaffDetails=null
    };

    
    const staffDocCancelModal = () => {
      visibleStaffDoc.value = false;
      store.state.careCoordinator.documentStaffDetails=null
    };
    
    return {
      staffDocCancelModal,
      staffDocCloseModal,
      addStaffs,
      paramId,
      editDocument,
      visibleStaffDoc,
      arrayToObjact,
      screensPermissions:store.getters.screensPermissions,
      documentColumns,
      documentsData,
      deleteDocument,
    };
  },
});
</script>
