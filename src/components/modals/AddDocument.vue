<template>
  <a-modal v-model:visible="visible" width="1000px" title="Add Document" centered @ok="handleOk" @cancel="onCloseModal()">
    <a-form ref="formRef" :model="addDocumentForm" layout="vertical" @finish="submitForm">
      <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('documents.name')" name="name" :rules="[{ required: true, message: $t('documents.name')+' '+$t('global.validation') }]">
              <a-input @change="changedValue" v-model:value="addDocumentForm.name" size="large" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('documents.document')" name="document" :rules="[{ required: true, message: $t('documents.document')+' '+$t('global.validation') }]">
              <a-input v-model:value="addDocumentForm.document" size="large" type="file" @change="onFileUpload" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('documents.type')" name="type" :rules="[{ required: true, message: $t('documents.type')+' '+$t('global.validation') }]">
              <GlobalCodeDropDown @change="changedValue" v-model:value="addDocumentForm.type" :dataId="11" @handleGlobalChange="handleGlobalChange($event,'addDocumentForm.type')"/>
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('documents.tags')" name="tags" :rules="[{ required: true, message: $t('documents.tags')+' '+$t('global.validation') }]">
              <GlobalCodeDropDown @change="changedValue" v-model:value="addDocumentForm.tags" mode="multiple" :dataId="12" @handleGlobalChange="handleGlobalChange($event,'addDocumentForm.tags')"/>
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="24" :span="24">
          <ModalButtons @is_click="handleClear"/>
        </a-col>
      </a-row> 
    </a-form>
    <Loader />
  </a-modal>
</template>
<script>
import { defineComponent, ref, computed, reactive } from "vue";
import { useStore } from 'vuex';
import ModalButtons from "@/components/common/button/ModalButtons";
import Loader from "@/components/loader/Loader";
import { useRoute } from "vue-router";
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue"
import { warningSwal } from "@/commonMethods/commonMethod";
import { messages } from "../../config/messages";
export default defineComponent({
  components: {
    ModalButtons,
    GlobalCodeDropDown,
    Loader,
  },
  props: {
    patientDetails: {
      type: Array
    }
  },
  setup(props, {emit}) {
    const store = useStore();
    const route = useRoute();
    const formRef = ref();
    const visible = ref(true);
    const isValueChanged = ref(false);

    const addDocumentForm = reactive({
      name: '',
      document: '',
      type: '',
      tags: ref([]),
      entity: 'patient',
      id: '',
    })

    const form = reactive({ ...addDocumentForm })

    // const patientDetails = ref(props.patientDetails);
    
    const handleClear = () => {
      formRef.value.resetFields();
      Object.assign(addDocumentForm, form)
    }
    
    const onFileUpload = (event) => {
      let doc_file = event.target.files[0];
      let formData = new FormData();
      formData.append("file", doc_file);
      store.dispatch("uploadFile", formData);
      isValueChanged.value = true;
    };

    const filePath = computed(() => {
      return store.state.patients.uploadFile;
    });

    const changedValue = () => {
      isValueChanged.value = true;
    }

    function onCloseModal() {
			if(isValueChanged.value) {
				warningSwal(messages.modalWarning).then((response) => {
					if (response == true) {
						emit("closeModal", {
							modal: 'addDocument',
							value: false
						});
						Object.assign(addDocumentForm, form);
						isValueChanged.value = false;
					}
					else {
						emit("closeModal", {
							modal: 'addDocument',
							value: true
						});
					}
				})
			}
    }

    const globalCode = computed(() => {
      return store.state.common;
    });

    const documentTags = computed(() => {
      return store.state.common.documentTags;
    });

    const documentTypes = computed(() => {
      return store.state.common.documentTypes;
    });

    const submitForm = () => {
      const documentFormData = {
        data: {
          "name": addDocumentForm.name,
          "document": filePath.value ? filePath.value : addDocumentForm.document,
          "type": addDocumentForm.type,
          "tags": addDocumentForm.tags,
          "entity": addDocumentForm.entity,
          "id": route.params.udid ? route.params.udid : '',
        },
        id: route.params.udid,
      }
      store.dispatch("addDocument", documentFormData).then(() => {
        store.dispatch('latestDocument', route.params.udid)
        store.dispatch('patientDocuments', route.params.udid)
        store.dispatch('patientTimeline', {
          id: route.params.udid,
          type: ''
        });
        formRef.value.resetFields();
        Object.assign(addDocumentForm, form)
        emit("closeModal", {
          modal: 'addDocument',
          value: false
        });
      });
    }

    const handleGlobalChange = (data,type) =>{
            if(type =='addDocumentForm.type'){
                addDocumentForm.type = data
            }
            if(type=='addDocumentForm.tags'){
                addDocumentForm.tags = data
            }
        }

    return {
      handleGlobalChange,
      formRef,
      handleClear,
      size: ref("large"),
      addDocumentForm,
      onFileUpload,
      submitForm,
      globalCode,
      visible,
      documentTags,
      documentTypes,
      isValueChanged,
      changedValue,
      onCloseModal,
    };
  },
});
</script>
