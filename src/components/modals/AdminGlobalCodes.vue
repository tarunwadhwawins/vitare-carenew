<template>
  <a-modal max-width="1140px" width="100%" :title="title">
    <a-form ref="formRef" :model="globalCodeForm" layout="vertical" @finish="submitForm">
      <a-row :gutter="24">
        <a-col :sm="8" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('globalCodes.category')" name="globalCodeCategory" :rules="[{ required: true, message: $t('globalCodes.category')+' '+$t('global.validation')  }]">
              <AutoComplete
                :options="categories"
                @on-select="onSelectOption"
                v-if="categories"
                v-model:value="globalCodeForm.globalCodeCategory" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="8" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('globalCodes.codeName')" name="name" :rules="[{ required: true, message: $t('globalCodes.codeName')+' '+$t('global.validation')  }]">
              <a-input v-model:value="globalCodeForm.name" size="large" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="8" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('globalCodes.activeStatus')" name="status">
              <a-switch v-model:checked="globalCodeForm.status" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="24" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('globalCodes.description')" name="description" :rules="[{ required: true, message: $t('globalCodes.description')+' '+$t('global.validation')  }]">
              <a-textarea v-model:value="globalCodeForm.description" placeholder="Description" allow-clear />
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
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex"
import ModalButtons from "@/components/common/button/ModalButtons";
import AutoComplete from "@/components/common/input/AutoComplete";
export default {
  components: {
    ModalButtons,
    AutoComplete
  },
  props: {
    isAdd: {
      type: Boolean
    }
  },
  setup(props, {emit}) {
    const store = useStore()
    const formRef = ref()
    const checked = ref([false]);
    const title = props.isAdd ? "Add Global Code" : "Edit Global Code";
    const isEdit = props.isAdd ? false : true;
    
    const handleCancel = () => {
      emit('is-visible', false);
    };

    const codecategoryId = ref(null);
    const onSelectOption = (selected) => {
      categories.value.forEach(category => {
        if(category.value == selected) {
          codecategoryId.value = category.id
        }
      });
    };

    const globalCodeDetails = computed(() => {
      return store.state.globalCodes.globalCodeDetails;
    })
    const codeDetails = globalCodeDetails.value;
    
    var switchOn;
    if(isEdit) {
      switchOn = codeDetails && codeDetails.status ? true : false;
    }
    else {
      switchOn = true;
    }
    
    const globalCodeForm = reactive({
      globalCodeCategory: codeDetails ? codeDetails.globalCodeCategory : '',
      name: codeDetails ? codeDetails.name : '',
      description: codeDetails ? codeDetails.description : '',
      status: switchOn,
    });
    
    const globalCodeCategories = computed(() => {
      return store.state.common.globalCodeCategories;
    })
    
    const categories = ref([])
    globalCodeCategories.value.forEach(element => {
      categories.value.push({
        value: element.name,
        id: element.id,
      })
    });
    
    const form = reactive({ ...globalCodeForm })
    const handleClear = () => {
      formRef.value.resetFields();
      Object.assign(globalCodeForm, form)
    }

    const submitForm = () => {
      if(isEdit) {
        const data = {
          "name": globalCodeForm.name,
          "description": globalCodeForm.description,
          "status": globalCodeForm.status,
        }
        const id = globalCodeDetails.value.id;
        store.dispatch('updateGlobalCode', {id, data}).then(() => {
          store.dispatch('globalCodesList')
        })
        emit('is-visible', false);
      }
      else {
        globalCodeForm.globalCodeCategory = codecategoryId.value;
        store.dispatch('addGlobalCode', globalCodeForm).then(() => {
          store.dispatch('globalCodesList')
        })
        emit('is-visible', false);
      }
    }
    return {
      formRef,
      handleClear,
      onSelectOption,
      globalCodeCategories,
      title,
      globalCodeForm,
      submitForm,
      handleCancel,
      categories,
      size: ref("large"),
      checked,
    };
  },
};
</script>
