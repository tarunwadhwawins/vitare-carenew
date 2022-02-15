<template>
  <a-modal v-model:visible="visible" width="1000px" title="Add Document" centered @ok="handleOk">
    <a-form ref="formRef" :model="addDocumentForm" layout="vertical" @finish="submitForm">
      <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('documents.name')" name="name" :rules="[{ required: true, message: $t('documents.name')+' '+$t('global.validation') }]">
              <a-input v-model:value="addDocumentForm.name" size="large" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('documents.document')" name="document" :rules="[{ required: true, message: $t('documents.document')+' '+$t('global.validation') }]">
              <a-input v-model:value="addDocumentForm.document" size="large" type="file" @change="onFileUpload" />
              <!-- <a-input v-model:value="addDocumentForm.id" type="hidden" /> -->
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('documents.type')" name="type" :rules="[{ required: true, message: $t('documents.type')+' '+$t('global.validation') }]">
              <a-select ref="select" v-model:value="addDocumentForm.type" style="width: 100%" size="large">
                <a-select-option value="" hidden>{{'Select Type'}}</a-select-option>
                <a-select-option v-for="documentType in documentTypes.globalCode" :key="documentType.id" :value="documentType.id">{{documentType.name}}</a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('documents.tags')" name="tags" :rules="[{ required: true, message: $t('documents.tags')+' '+$t('global.validation') }]">
              <a-select v-model:value="addDocumentForm.tags" mode="multiple" size="large" placeholder="Select Tags" style="width: 100%" :options="documentTags.globalCode.map((item) => ({ label: item.name, value: item.id }))" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="24" :span="24">
          <ModalButtons @is_click="handleClear"/>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
<script>
import { defineComponent, ref, computed, reactive } from "vue";
import { useStore } from 'vuex';
import ModalButtons from "@/components/common/button/ModalButtons";
export default defineComponent({
  components: {
    ModalButtons,
  },
  props: {
    patientDetails: {
      type: Array
    }
  },
  setup(props, {emit}) {
    const store = useStore();
    const formRef = ref();
    const form = reactive({ ...addDocumentForm })
    const visible = ref(true);

    const patientDetails = ref(props.patientDetails);
    
    const handleClear = () => {
      formRef.value.resetFields();
      Object.assign(addDocumentForm, form)
    }
    
    const onFileUpload = (event) => {
      let doc_file = event.target.files[0];
      let formData = new FormData();
      formData.append("file", doc_file);
      store.dispatch("uploadFile", formData);
    };

    const filePath = computed(() => {
      return store.state.patients.uploadFile;
    });

    const addDocumentForm = reactive({
      name: '',
      document: '',
      type: '',
      tags: '',
      entity: 'patient',
    })
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
        },
        id: patientDetails.value.id,
      }
      store.dispatch("addDocument", documentFormData)
      formRef.value.resetFields();
      Object.assign(addDocumentForm, form)
      emit('closeModal');
    }

    return {
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
    };
  },
});
</script>
