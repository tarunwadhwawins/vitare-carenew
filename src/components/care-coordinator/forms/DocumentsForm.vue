<template>
  <Form :model="documentsForm" @submit="addCareCoordinatorDocument" :validation-schema="schema">
    <a-row :gutter="24">
      <a-col :span="12">
        <div class="form-group">
          <label>Name</label>
          <Field class="ant-input ant-input-lg" v-model="documentsForm.document_name" name="document_name" size="large" />
          <ErrorMessage class="error" name="document_name" />
        </div>
      </a-col>
      <a-col :span="12">
        <div class="form-group">
          <label>Document</label>
          <Field class="ant-input ant-input-lg" v-model="documentsForm.document" name="document" size="large" type="file" />
          <ErrorMessage class="error" name="document" />
        </div>
      </a-col>
      <a-col :span="12">
        <div class="form-group">
          <label> Type</label>
          <Field class="ant-input ant-input-lg" as="select"
            ref="select"
            v-model="documentsForm.type"
            name="type">
            <option value="lucy">Id Proof</option>
            <option value="Yiminghe">Clinical</option>
            <option value="Yiminghe">Insurance</option>
          </Field>
          <ErrorMessage class="error" name="type" />
        </div>
      </a-col>
      <a-col :span="12">
        <div class="form-group">
          <label> Tags</label>
          <Field class="ant-input ant-input-lg" as="select"
            v-model:value="selectedItemsForTag"
            name="selectedItemsForTag"
            mode="multiple"
            placeholder="Please Select Roles"
            :options="filteredOptionsForTag.map((item) => ({ value: item }))"/>
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
</template>

<script>
  import { ref, computed } from "vue";
  const OPTIONS = ["Manager", "Billing Admin", "User Admin"];
  const OPTIONSTAG = ["Tag1", "Tag2", "Tag3"];
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as yup from 'yup';
  import { configure } from 'vee-validate';
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
    },
    data() {
      const schema = yup.object({
        document_name: yup.string().required(),
        doument: yup.string().required(),
        type: yup.string().required(),
        // selectedItemsForTag: yup.string().required(),
      });
      return {
        schema,
        documentsForm: {
          document_name: '',
          doument: '',
          type: '',
          selectedItemsForTag: '',
        }
      }
    },
    methods: {
      addCareCoordinatorDocument() {
        
      }
    },
    setup() {
      const selectedItems = ref(["Manager"]);
      const filteredOptions = computed(() =>
        OPTIONS.filter((o) => !selectedItems.value.includes(o))
      );
      const selectedItemsForTag = ref(["Tag1"]);
      const filteredOptionsForTag = computed(() =>
        OPTIONSTAG.filter((o) => !selectedItemsForTag.value.includes(o))
      );
      return {
        selectedItems,
        filteredOptions,
        filteredOptionsForTag,
        selectedItemsForTag,
      };
    },
  };
</script>