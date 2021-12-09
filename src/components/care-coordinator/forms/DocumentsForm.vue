<template>
  <Form :model="documentForm" @submit="addCareCoordinatorDocument" :validation-schema="schema" enctype="multipart/form-data">
    <a-row :gutter="24">
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Name</label>
          <Field class="ant-input ant-input-lg" v-model="documentForm.document_name" name="document_name" size="large" />
          <ErrorMessage class="error" name="document_name" />
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
            v-model="documentForm.document_type"
            name="document_type">
            <option value="1">Id Proof</option>
            <option value="2">Insurance</option>
          </Field>
          <ErrorMessage class="error" name="document_type" />
        </div>
      </a-col>
      <!-- <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label> Tags</label>
          <Field class="ant-input ant-input-lg" as="select"
            v-model:value="selectedItemsForTag[0]"
            name="selectedItemsForTag"
            mode="multiple"
            :options="filteredOptionsForTag.map((item) => ({ value: item }))"/>
          <ErrorMessage class="error" name="selectedItemsForTag" />
        </div>
      </a-col> -->
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
  import { ref, computed, toRaw } from "vue";
  const OPTIONS = ["Manager", "Billing Admin", "User Admin"];
  const OPTIONSTAG = ["Tag1", "Tag2", "Tag3"];
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as yup from 'yup';
  import { configure } from 'vee-validate';
import Loading from 'vue-loading-overlay';
// import 'vue-loading-overlay/dist/vue-loading.css';
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
        document_name: yup.string().required().label("Name"),
        document_file: yup.mixed().required().label("Doument"),
        document_type: yup.string().required().label("Type"),
        // selectedItemsForTag: yup.string().required(),
      });
      return {
        isLoading: false,
        schema,
        documentForm: {
          document_name: '',
          document_file: '',
          document_type: '',
          // selectedItemsForTag: [],
          // FILE: null,
        }
      }
    },
    methods: {
      onFileUpload (event) {
        this.isLoading = true;
        let doc_file = event.target.files[0]
        let file = {
          name: doc_file.name,
          size: doc_file.size,
          type: doc_file.type
        }
        this.$store.dispatch("uploadFile", file)
        .then((res) => { 
          console.log(res);
					this.isLoading = false;
        },
        (error) => {
          console.log(error)
					this.isLoading = false;
          this.isLoading = false;
          this.message = (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) ||
          error.message ||
          error.toString();
        });
        this.document_file = event.target.files[0]
      },
      addCareCoordinatorDocument() {
        const document = toRaw(this.documentForm);
        this.$store.dispatch("addCareCoordinatorDocument", { 
          name: document.document_name,
          file_path: this.document_file.name,
          type_id: document.document_type,
          tags: ["one","two"],
          care_coordinator_id: 12,
        })
        .then((res) => { 
          console.log(res);
        },
        (error) => {
          console.log(error)
          this.isLoading = false;
          this.message = (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) ||
          error.message ||
          error.toString();
        });
      }
    },
    setup() {
      const selectedItems = ref(["Manager"]);
      // const filteredOptions = computed(() =>
      //   OPTIONS.filter((o) => !selectedItems.value.includes(o))
      // );
      // const selectedItemsForTag = ref(["Tag1"]);
      // const filteredOptionsForTag = computed(() =>
      //   OPTIONSTAG.filter((o) => !selectedItemsForTag.value.includes(o))
      // );
      return {
        selectedItems,
        // filteredOptions,
        // filteredOptionsForTag,
        // selectedItemsForTag,
      };
    },
  };
</script>