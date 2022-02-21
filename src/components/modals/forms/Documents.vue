<template>
<a-form :model="documents" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="addDocument" @finishFailed="onFinishFailed">
    <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('global.name')" name="name" :rules="[{ required: false, message: $t('global.name')+' '+$t('global.validation') }]">
                    <a-input v-model:value="documents.name" size="large" />
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.name?errorMsg.name[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('global.document')" name="document" :rules="[{ required: false, message: $t('global.document')+' '+$t('global.validation') }]">
                    <a-input name="document_file" size="large" type="file" @change="onFileUpload" />
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.document?errorMsg.document[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('global.type')" name="type" :rules="[{ required: false, message: $t('global.type')+' '+$t('global.validation') }]">
                    <a-select ref="select" v-model:value="documents.type" style="width: 100%" size="large" @change="handleChange">
                        <a-select-option value="" disabled>{{'Select Type'}}</a-select-option>
                        <a-select-option v-for="documentType in globalCode.documentTypes.globalCode" :key="documentType.id" :value="documentType.id">{{documentType.name}}</a-select-option>
                    </a-select>
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.type?errorMsg.type[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('global.tags')" name="tags" :rules="[{ required: false, message: $t('global.tags')+' '+$t('global.validation') }]">
                    <a-select v-model:value="documents.tags" mode="multiple" size="large" placeholder="Select Tags" style="width: 100%" :options="globalCode.documentTags.globalCode.map((item) => ({ label: item.name, value: item.id }))" @change="handleChange" />
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.tags?errorMsg.tags[0]:''" />
                </a-form-item>
            </div>
        </a-col>
    </a-row>
    <a-row :gutter="24" class="mb-24">
        <a-col :span="24">
            <a-button class="btn primaryBtn" html-type="submit">{{$t('global.add')}}</a-button>
        </a-col>
    </a-row>
    <a-row :gutter="24" class="mb-24">
        <a-col :span="24">
            <a-table :columns="documentColumns" :data-source="documentsData" :pagination="false" :scroll="{ x: 900 }">
                <template #tags="text">
                    <span v-for="tag in text.text.data" :key="tag.id">{{ tag.tag+ " "}}</span>
                </template>
                <template #document="text">
                    <router-link :to="text.text">
                        <FileOutlined />
                    </router-link>
                </template>
                <template #action="text">
                    <a-tooltip placement="bottom">
                        <template #title>
                            <span>{{$t('global.delete')}}</span>
                        </template>
                        <a class="icons" @click="deleteDocument(text.record.id)">
                            <DeleteOutlined /></a>
                    </a-tooltip>
                </template>
            </a-table>
            <Loader />
        </a-col>
    </a-row>
</a-form>
</template>

<script>
import { defineComponent, computed, reactive, watchEffect } from "vue";
import { DeleteOutlined, FileOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import Loader from "@/components/loader/Loader";
import { warningSwal } from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
import ErrorMessage from "@/components/common/messages/ErrorMessage.vue";
import { useRoute } from "vue-router";
export default defineComponent({
  components: {
    DeleteOutlined,
    Loader,
    FileOutlined,
    ErrorMessage,
  },
  props: {
    idPatient: {
      type: Number
    }
  },
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const patientId = reactive(props.idPatient);
    const patientUdid = route.params.udid;
    const onFileUpload = (event) => {
      let doc_file = event.target.files[0];
      let formData = new FormData();
      formData.append("file", doc_file);
      store.dispatch("uploadFile", formData);
    };

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

    const addDocument = () => {
      if(patientId != null) {
        store.dispatch("addDocument", {
          data: {
            name: documents.name,
            document: filePath.value ? filePath.value : "",
            type: documents.type,
            tags: documents.tags,
            entity: "patient",
          },
          id: patientId,
        }).then(() => {
          store.dispatch("documents", patientUdid);
        });
      }
      else {
        store.dispatch("addDocument", {
          data: {
            name: documents.name,
            document: filePath.value ? filePath.value : "",
            type: documents.type,
            tags: documents.tags,
            entity: "patient",
          },
          id: patients.value.addDemographic.id,
        });
        setTimeout(() => {
          store.dispatch("documents", patientUdid);
        }, 2000);
      }
    };
    const patients = computed(() => {
      return store.state.patients;
    });
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
          if(patientId != null) {
            store.dispatch("deleteDocument", {
              id: patientId,
              documentId: id,
            });
            setTimeout(() => {
              store.dispatch("documents", patientUdid);
            }, 2000);
          }
          else {
            store.dispatch("deleteDocument", {
              id: patients.value.addDemographic.id,
              documentId: id,
            });
            setTimeout(() => {
              store.dispatch("documents", patients.value.addDemographic.id);
            }, 2000);
          }
        }
      });
    }
    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };

    const onFinishFailed = () => {};
    return {
      onFinishFailed,
      handleChange,
      warningSwal,
      deleteDocument,
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
