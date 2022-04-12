<template>
  <a-form ref="formRef" scrollToFirstError=true :model="documents" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="addDocument" @finishFailed="onFinishFailed">
    <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('global.name')" name="name" :rules="[{ required: true, message: $t('global.name')+' '+$t('global.validation') }]">
                    <a-input @change="changedValue" v-model:value="documents.name" size="large" />
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.name?errorMsg.name[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :sm="12" :xs="24">
        
            <div class="form-group">
                <a-form-item :label="$t('global.document')" name="document" :rules="[{ required: true, message: $t('global.document')+' '+$t('global.validation') }]">
                    <a-input ref="image" name="document_file" size="large" type="file" @change="onFileUpload" />
                    <ErrorMessage v-if="docValidationError" name="Document is required." />
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.document?errorMsg.document[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('global.type')" name="type" :rules="[{ required: true, message: $t('global.type')+' '+$t('global.validation') }]">
                    <GlobalCodeDropDown @change="changedValue" v-model:value="documents.type" :globalCode="globalCode.documentTypes"/>
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.type?errorMsg.type[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('global.tags')" name="tags" :rules="[{ required: true, message: $t('global.tags')+' '+$t('global.validation') }]">
                    <!-- <a-select v-model:value="documents.tags" mode="multiple" size="large" placeholder="Select Tags" style="width: 100%" :options="globalCode.documentTags.globalCode.map((item) => ({ label: item.name, value: item.id }))" @change="changedValue" /> -->
                       <GlobalCodeDropDown @change="changedValue" size="large" v-model:value="documents.tags" mode="multiple" :globalCode="globalCode.documentTags"/>
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
            <DocumentTable :Id="Id" />
            <TableLoader />
        </a-col>
    </a-row>
  </a-form>
  <Loader />
</template>

<script>
import { defineComponent, computed, reactive, watchEffect, ref, onMounted } from "vue";
import { useStore } from "vuex";
import Loader from "@/components/loader/Loader";
import TableLoader from "@/components/loader/TableLoader";
import ErrorMessage from "@/components/common/messages/ErrorMessage.vue";
import { useRoute } from "vue-router";
import DocumentTable from "../../patients/data-table/DocumentTable.vue";
import { errorSwal } from "@/commonMethods/commonMethod";
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue"

export default defineComponent({
  components: {
    // DeleteOutlined,
    Loader,
    // FileOutlined,
    ErrorMessage,
    DocumentTable,
    GlobalCodeDropDown,
    TableLoader
  },
  props: {
    idPatient: {
      type: Number
    },
    entity:String,
    paramId:String
  },
  setup(props, {emit}) {
    const store = useStore();
    const route = useRoute();
    const patientId = reactive(props.idPatient);
    const patientUdid = route.params.udid;
    const docValidationError = ref(false)
    const formRef = ref()
    const image = ref()
    const changedValue = () => {
      emit('onChange')
    }

    watchEffect(() => {
      if(patientId != null) {
        store.dispatch("documents", patientUdid);
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
      entity: "patient",
    });
    const form = reactive({ ...documents })

    
    const onFileUpload = (event) => {
      let docFile = event.target.files[0];
      emit('onChange')
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
       documents.document = docFile
       
      store.commit('checkChangeInput',true)
      store.dispatch("uploadFile", formData);
    };

    const patients = computed(() => {
      return store.state.patients;
    });

    const addStaff = computed(() => {
      return store.state.careCoordinator.addStaff;
    });

    const addDocument = () => {
      if(props.entity=="patient") {
        const patientData = {
          name: documents.name,
          document: filePath.value ? filePath.value : "",
          type: documents.type,
          tags: documents.tags,
          entity: "patient",
        }
        if(patientId != null) {
          store.dispatch("addDocument", {
            data: patientData,
            id: patientId,
          }).then(() => {
            emit('onChange', false)
            formRef.value.resetFields();
            
            store.state.patients.uploadFile=null
            documents.document =''
            
            image.value.stateValue=''
            docValidationError.value=false
            Object.assign(documents, form)
            store.dispatch("documents", patientUdid);
          });
        }
        else {
        if(filePath.value==null){
          
        docValidationError.value=true
        }else{
        const patientData = {
          name: documents.name,
          document: filePath.value ? filePath.value : "",
          type: documents.type,
          tags: documents.tags,
          entity: "patient",
        }
          store.dispatch("addDocument", {
            data: patientData,
            id: patients.value.addDemographic.id,
          }).then(() => {
            emit('onChange', false)
            formRef.value.resetFields();
            
            image.value.stateValue=''
            docValidationError.value=false
            store.state.patients.uploadFile=null
            documents.document =''
            Object.assign(documents, form)
            store.dispatch("documents", patients.value.addDemographic.id);
          });
      }
        }
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
    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };
    const onFinishFailed = () => {};
    let Id = null
    if(props.paramId) {
      Id = props.paramId?props.paramId:addStaff.value.id
    }
    else {
      if(patientId != null) {
        Id = patientId
      }
      else {
        Id = patients.value.addDemographic ? patients.value.addDemographic.id : ''
      }
    }

    onMounted(()=>{
      reset();
    })

    function reset(){
      Object.assign(documents,form)
      store.state.patients.uploadFile=null
    }

    return {
      image,
      docValidationError,
      changedValue,
      formRef,
      reset,
      Id,
      onFinishFailed,
      handleChange,
      // warningSwal,
      // deleteDocument,
      globalCode,
      onFileUpload,
      filePath,
      documents,
      addDocument,
      patients,
      documentColumns,
      documentsData,
      errorMsg: patients.value.errorMsg,
    };
  },
});
</script>
