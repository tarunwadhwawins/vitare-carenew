<template>
  <a-form ref="formRef" :rules="rules" :model="documentForm" @submit="addCareCoordinatorDocument">
    <a-row :gutter="24">
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Name</label>
          <a-input size="large" v-model:value="documentForm.name" />
          <a-form-item ref="name" name="name"/>
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Document</label>
          <a-input v-model:value="documentForm.document_file" name="document_file" size="large" type="file" @change="onFileUpload" />
          <a-form-item name="document_file"/>
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label> Type</label>
          <a-select v-model:value="documentForm.type" name="type" style="width: 100%" size="large">
            <a-select-option hidden>Choose Type</a-select-option>
            <a-select-option value="1">Id Proof</a-select-option>
            <a-select-option value="2">Insurance</a-select-option>
          </a-select>
          <a-form-item name="type"/>
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
          <a-form-item name="tags"/>
        </div>
      </a-col>
    </a-row>
    <a-row :gutter="24" class="mb-24">
      <a-col :span="24">
        <button class="btn primaryBtn">Add</button>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
  import { ref, computed, reactive } from "vue";
  const OPTIONS = ["Manager", "Billing Admin", "User Admin"];
  const OPTIONSTAG = ["Tag1", "Tag2", "Tag3"];
  import { useStore } from "vuex"
  export default {
    setup() {
      const store = useStore()
      const formRef = ref();
      const rules = {
        name: [{
          required: true,
          message: 'Please enter Name',
          trigger: 'blur',
        }],
        document_file: [{
          required: true,
          message: 'Please select an image',
          trigger: 'blur',
        }],
        type: [{
          required: true,
          message: 'Please select Type',
          trigger: 'blur',
        }],
        // tags: [{
        //   required: true,
        //   message: 'Please select Tag(s)',
        //   trigger: 'blur',
        // }],
      };
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

      const file_path = localStorage.getItem('file_path')
      const documentForm = reactive({
        name: null,
        document: file_path,
        type: null,
        tags: [],
      })
      const addCareCoordinatorDocument = () => {
        formRef.value.validate().then(() => {
          store.dispatch("addCareCoordinatorDocument", documentForm)
        }).catch(error => {
          console.log('error', error);
        });
      }
      
      return {
        formRef,
        rules,
        onFileUpload,
        documentForm,
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