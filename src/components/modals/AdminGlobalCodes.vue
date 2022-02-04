<template>
  <a-modal max-width="1140px" width="100%" :title="title">
    <a-form :model="globalCodeForm" layout="vertical" @finish="submitForm">
      <a-row :gutter="24">
        <a-col :sm="8" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('globalCodes.category')" name="globalCodeCategory" :rules="[{ required: true, message: $t('globalCodes.category')+' '+$t('global.validation')  }]">
              <!-- <a-auto-complete
                :options="categories"
                :filter-option="filterOption"
                v-if="categories"
                ref="select"
                v-model:value="globalCodeForm.globalCodeCategory"
                style="width: 100%"
                size="large">
              </a-auto-complete> -->
              <a-select
                v-if="globalCodeCategories"
                ref="select"
                v-model:value="globalCodeForm.globalCodeCategory"
                style="width: 100%"
                size="large"
                @focus="focus"
                :disabled="disabled"
                @change="handleChange">
                <a-select-option value="" disabled>{{'Select Category'}}</a-select-option>
                <a-select-option v-for="category in globalCodeCategories" :key="category.id" :value="category.id">{{ category.name }}</a-select-option>
              </a-select>
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
          <ModalButtons/>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
<script>
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex"
import ModalButtons from "@/components/common/button/ModalButtons";
export default {
  components: {
    ModalButtons
  },
  props: {
    isAdd: {
      type: Boolean
    }
  },
  setup(props, {emit}) {
    const store = useStore()
    const checked = ref([false]);
    const title = props.isAdd ? "Add Global Code" : "Edit Global Code";
    const isEdit = props.isAdd ? false : true;
    
    const handleCancel = () => {
      emit('is-visible', false);
    };

    const filterOption = (input, option) => {
      return option.value.toUpperCase().indexOf(input.toUpperCase()) >= 0;
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
      })
    });
    console.log('categories', categories.value)
    
    const submitForm = () => {
      if(isEdit) {
        const data = {
          "name": globalCodeForm.name,
          "description": globalCodeForm.description,
          "status": globalCodeForm.status,
        }
        const id = globalCodeDetails.value.id;
        console.log('globalCodeForm', id)
        store.dispatch('updateGlobalCode', {id, data}).then(() => {
          store.dispatch('globalCodesList')
        })
        emit('is-visible', false);
      }
      else {
        console.log('globalCodeForm', globalCodeForm)
        store.dispatch('addGlobalCode', globalCodeForm).then(() => {
          store.dispatch('globalCodesList')
        })
        emit('is-visible', false);
      }
    }
    return {
      filterOption,
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
