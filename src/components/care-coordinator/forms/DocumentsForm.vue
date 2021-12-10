<template>
  <Form :model="documentForm" @submit="addCareCoordinatorDocument" :validation-schema="schema" enctype="multipart/form-data">
    <a-row :gutter="24">
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Name</label>
          <Field class="ant-input ant-input-lg" v-model="documentForm.name" name="name" size="large" />
          <ErrorMessage class="error" name="name" />
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Document</label>
          <Field class="ant-input ant-input-lg" v-model="documentForm.document_file" name="document_file" size="large" type="file" @change="onFileUpload" />
          <ErrorMessage class="error" name="document_file" ref="document_file" />
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label> Type</label>
          <Field class="ant-input ant-input-lg" as="select"
            ref="select"
            v-model="documentForm.type"
            name="type">
            <option value="1">Id Proof</option>
            <option value="2">Insurance</option>
          </Field>
          <ErrorMessage class="error" name="type" />
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label> Tags</label>
          <a-select
            v-model:value="value"
            name="selectedItemsForTag"
            mode="multiple"
            size="large"
            placeholder="Please Select Roles"
            style="width: 100%"
            :options="filteredOptionsForTag.map((item) => ({ value: item }))"
          />
          <ErrorMessage class="error" name="selectedItemsForTag" />
        </div>
      </a-col>
    </a-row>
    <a-row :gutter="24" class="mb-24">
      <a-col :span="24">
        <button class="btn primaryBtn">Add</button>
      </a-col>
    </a-row>
  </Form>
  <loading
    v-model:active="isLoading" 
    loader="bars"
    lock-scroll="true"
    is-full-page="false"
    transition="fade"
    :can-cancel="false"/>
</template>

<script>
  import { ref, computed, useStore, reactive } from "vue";
  const OPTIONS = ["Manager", "Billing Admin", "User Admin"];
  const OPTIONSTAG = ["Tag1", "Tag2", "Tag3"];
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as yup from 'yup';
  import { configure } from 'vee-validate';
import Loading from 'vue-loading-overlay';
  // Default values
  configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
    validateOnModelUpdate: true,
  });
  export default {
    components: {
      Form,
      Field,
      ErrorMessage,
      Loading,
    },
    data() {
      const schema = yup.object({
        name: yup.string().required().label("Name"),
        document_file: yup.mixed().required().label("Doument"),
        type: yup.string().required().label("Type"),
        // selectedItemsForTag: yup.string().required(),
      });
      return {
        schema,
      }
    },
    setup() {
      const store = useStore()
      const value = ref()
      const selectedItems = ref(["Manager"]);
      const filteredOptions = computed(() =>
        OPTIONS.filter((o) => !selectedItems.value.includes(o))
      );
      const selectedItemsForTag = ref(["Tag1"]);
      const filteredOptionsForTag = computed(() =>
        OPTIONSTAG.filter((o) => !selectedItemsForTag.value.includes(o))
      );
      const onFileUpload = (event) => {
        let doc_file = event.target.files[0]
        let formData = new FormData();
        formData.append('file', doc_file);
        store.dispatch("uploadFile", formData)
        .then((res) => {
          localStorage.setItem('file_path', res.data.path)
        });
      }

      const addCareCoordinatorDocument = () => {
        const documentForm = reactive({
          name: null,
          document: file_path,
          type: null,
          tags: this.value,
        })
        const file_path = localStorage.getItem('file_path')
        store.dispatch("addCareCoordinatorDocument", documentForm)
      }
      
      return {
        onFileUpload,
        addCareCoordinatorDocument,
        value,
        selectedItems,
        filteredOptions,
        filteredOptionsForTag,
        selectedItemsForTag,
      }
    },
  };
</script>