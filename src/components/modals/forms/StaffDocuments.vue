<template>
<a-form :model="documents" ref="formRest" scrollToFirstError=true name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="addDocument" @finishFailed="onFinishFailed">
    <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('global.name')" name="name" :rules="[{ required: true, message: $t('global.name')+' '+$t('global.validation') }]">
                    <a-input v-model:value="documents.name" size="large" @change="checkChangeInput()"/>
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.name?errorMsg.name[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :sm="12" :xs="24">
            <div class="form-group">
                <label><span style="color:red">* </span>{{$t('global.document')}}
                    <a-input  name="document_file" size="large" type="file" @change="onFileUpload" />
                    <ErrorMessage v-if="docValidationError" name="Document is required." />
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.document?errorMsg.document[0]:''" />
                </label>
            </div>
        </a-col>
        <a-col :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('global.type')" name="type" :rules="[{ required: true, message: $t('global.type')+' '+$t('global.validation') }]">
                    <!-- <a-select ref="select" v-model:value="documents.type" style="width: 100%" size="large" @change="checkChangeInput()">
                        <a-select-option value="" disabled>{{'Select Type'}}</a-select-option>
                        <a-select-option v-for="documentType in globalCode.documentTypes.globalCode" :key="documentType.id" :value="documentType.id">{{documentType.name}}</a-select-option>
                    </a-select> -->
                     <GlobalCodeDropDown  v-model:value="documents.type" :globalCode="globalCode.documentTypes" @change="checkChangeInput()"/>
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.type?errorMsg.type[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('global.tags')" name="tags" :rules="[{ required: true, message: $t('global.tags')+' '+$t('global.validation') }]">
                    <!-- <a-select v-model:value="documents.tags" mode="multiple" size="large" placeholder="Select Tags" style="width: 100%" :options="globalCode.documentTags.globalCode.map((item) => ({ label: item.name, value: item.id }))" @change="checkChangeInput()" /> -->
                       <GlobalCodeDropDown  v-model:value="documents.tags" mode="multiple" :globalCode="globalCode.documentTags" @change="checkChangeInput()"/>
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.tags?errorMsg.tags[0]:''" />
                </a-form-item>
            </div>
        </a-col>
    </a-row>
    <a-row :gutter="24" class="mb-24">
        <a-col :span="24" v-if="paramId">
        <a-button  html-type="reset" style="margin-right: 8px" @click="reset()">{{$t('global.clear')}}</a-button>
        <a-button type="primary" html-type="submit">{{$t('global.save')}}</a-button>
        </a-col>
        <a-col :span="24" v-else>
            <a-button class="btn primaryBtn" html-type="submit">{{$t('global.add')}}</a-button>
        </a-col>
    </a-row>
    <a-row :gutter="24" class="mb-24" v-show="!paramId">
        <a-col :span="24">
            <DocumentTable :Id="Id"/>
            <Loader />
        </a-col>
    </a-row>
</a-form>
</template>

<script>
import { defineComponent, computed, reactive, watchEffect,ref } from "vue";
// import { DeleteOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import Loader from "@/components/loader/Loader";
import { warningSwal,errorSwal } from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
import ErrorMessage from "@/components/common/messages/ErrorMessage.vue";
import { useRoute } from "vue-router";
import DocumentTable from "../../care-coordinator/tables/DocumentTable.vue";
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue"


export default defineComponent({
  components: {
    // DeleteOutlined,
    Loader,
    ErrorMessage,
    DocumentTable,
    GlobalCodeDropDown,
  
  },
  props: {
    idPatient: {
      type: Number
    },
    entity:String,
    paramId:String,
    clearData:Boolean
  },
  setup(props,{emit}) {
    const store = useStore();
    const route = useRoute();
    const formRest =ref();
    const patientId = reactive(props.idPatient);
    const patientUdid = route.params.udid;
    const docValidationError = ref(false)
    // const onFileUpload = (event) => {
    //   let docFile = event.target.files[0];
    //   let formData = new FormData();
    //   formData.append("file", docFile);
    //   store.commit('checkChangeInput',true)
    //   store.dispatch("uploadFile", formData);
    // };

    const onFileUpload = (event) => {
      let docFile = event.target.files[0];
      if((docFile.size/1024) > 5120) {
        Object.assign(documents, {
          document: ""
        })
        errorSwal('File size should be less than or equal to 5 MB');
        return false
      }
      if(
        docFile.type != 'image/jpg' &&
        docFile.type != 'image/jpeg' &&
        docFile.type != 'image/tiff' &&
        docFile.type != 'image/tif' &&
        docFile.type != 'image/bmp' &&
        docFile.type != 'image/png'
        && docFile.type != 'application/pdf'
      ) {
        Object.assign(documents, {
          document: ""
        })
        errorSwal('Allowed file types are JPG, JPEG, TIFF, TIF, BMP, PNG and PDF only');
        return false
      }
      let formData = new FormData();
       formData.append("file", docFile);
       docValidationError.value=false
      store.commit('checkChangeInput',true)
      store.dispatch("uploadFile", formData);
    };
    const addStaffs = computed(() => {
      return store.state.careCoordinator;
    });

    watchEffect(() => {
      if(patientId != null) {
        store.dispatch("documents", patientUdid);
      }
      if(addStaffs.value.clearStaffFormValidation){
        formRest.value.resetFields();
      }
    })

    const filePath = computed(() => {
      return store.state.patients.uploadFile;
    });

    const documents = reactive({
      name: "",
      document: filePath.value ? filePath.value : "",
      type: "",
      tags: [],
      entity: "staff",
    });

    

    const addDocument = () => {
      if(filePath.value==null){
        docValidationError.value=true
      }else{
        store.dispatch("addStaffDocument", {
          data: {
            name: documents.name,
            document: filePath.value ? filePath.value : "",
            type: documents.type,
            tags: documents.tags,
            entity: "staff",
          },
          id: props.paramId?props.paramId:addStaffs.value.addStaff.id,
        });
        setTimeout(() => {
          if(addStaffs.value.closeModal==true){
          store.dispatch("staffDocuments",  props.paramId?props.paramId:addStaffs.value.addStaff.id);
            reset()
            emit("saveModal", false)
          }
        }, 2000);
      }
      }
    
    
    const documentsData = computed(() => {
      return store.state.patients.documents;
    });

    const documentColumns = computed(() => {
      return store.state.patients.documentColumns;
    });
    const globalCode = computed(() => {
      return store.state.common;
    });

    function deleteDocument(id) {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch("deleteDocument", {
            id: addStaffs.value.addStaff.id,
            documentId: id,
          });
          setTimeout(() => {
            store.dispatch("staffDocuments", addStaffs.value.addStaff.id);
          }, 2000);
        }
      });
    }
    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };
    const onFinishFailed = () => {};
    

    const form = reactive({
      ...documents,
    });
    function reset(){
      formRest.value.resetFields();
      Object.assign(documents,form)
    }
    watchEffect(()=>{
    if(props.clearData==true){
      Object.assign(documents,form)
    }
    })
    function checkChangeInput(){
      store.commit('checkChangeInput',true)
    }
    
    return {
      formRest,
      docValidationError,
      checkChangeInput,
      Id:addStaffs.value.addStaff?addStaffs.value.addStaff.id:'',
      reset,
      onFinishFailed,
      handleChange,
      warningSwal,
      deleteDocument,
      globalCode,
      onFileUpload,
      filePath,
      documents,
      addDocument,
      documentColumns,
      documentsData,
      errorMsg: addStaffs.value.errorMsg,
    };
  },
});
</script>
