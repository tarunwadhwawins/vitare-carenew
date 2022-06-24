<template>
  <a-modal width="800px" :title="isAdd ? 'Edit Inventory' :'Add Inventory'" :footer="false" @cancel="closeModal()" centered :maskClosable="false">
    <a-form ref="formRef" :model="inventoryForm" layout="vertical" @finish="submitForm" >
      <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            
            <a-form-item :label="$t('inventory.deviceType')" name="deviceType" :rules="[{ required: true, message: $t('inventory.deviceType')+' '+$t('global.validation')  }]">
               
                <GlobalCodeDropDown v-model:value="inventoryForm.deviceType" :globalCode="inventoryTypes" @change="onSelectOption(); checkChangeInput()" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('inventory.modelNumber')" name="deviceModelId" :rules="[{ required: true, message: $t('inventory.modelNumber')+' '+$t('global.validation')  }]">
                
                <GlobalCodeDropDown   v-model:value="inventoryForm.deviceModelId" :globalCode="deviceModalsList" @change="checkChangeInput()"/>
            </a-form-item>
            
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('inventory.macAddress')" name="macAddress" :rules="[{ required: true, message: $t('inventory.macAddress')+' '+$t('global.validation')  }]">
              <a-input v-model:value="inventoryForm.macAddress" size="large" @change="checkChangeInput()"/>
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('inventory.serialNumber')" name="serialNumber" :rules="[{ required: false, message: $t('inventory.serialNumber')+' '+$t('global.validation')  }]">
              <a-input v-model:value="inventoryForm.serialNumber" size="large" @change="checkChangeInput()"/>
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('inventory.activeStatus')" name="isActive">
              <a-switch @change="checkChangeInput()" v-model:checked="inventoryForm.isActive" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="24" :span="24">
          <ModalButtons @is_cancel="closeModal" :Id="isAdd"/>
        </a-col>
      </a-row>
      <Loader />
    </a-form>
  </a-modal>
</template>
<script>
import { ref, reactive, computed, watchEffect } from "vue";
import { useStore } from "vuex"
import ModalButtons from "@/components/common/button/ModalButtons";
import Loader from "@/components/loader/Loader"
// import AutoComplete from "@/components/common/input/AutoComplete";
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue";
import {
	warningSwal
} from "@/commonMethods/commonMethod";
import {
	messages
} from "../../config/messages";
export default {
  components: {
    ModalButtons,
    // AutoComplete,
    Loader,
    GlobalCodeDropDown
  },
  props: {
    isAdd: {
      type: Boolean
    }
  },
  setup(props, {emit}) {
    const store = useStore()
    const checked = ref([false]);
    const formRef = ref()
   

    const inventory = computed(() => {
      return store.state.inventory;
    })
    
    const inventoryForm = reactive({
      deviceType: '',
      deviceModelId: '',
      serialNumber: '',
      macAddress: '',
      isActive: true,
    });
    
    const inventoryTypes = computed(() => {
      return store.state.common.deviceType;
    })

    watchEffect(() => {
     
      if(inventory.value.inventoryDetails){
      if(props.isAdd) {
     
        Object.assign(inventoryForm, inventory.value.inventoryDetails);
       // inventoryForm.deviceModelId= inventory.value.inventoryDetails.modelNumber
      }
      }
    })
   
    const deviceModalsList = computed(() => {
      return store.state.inventory.deviceModalsList
    });

    const onSelectOption = () => {
      inventoryForm.deviceModelId =null
      store.dispatch('deviceModalsList', inventoryForm.deviceType)
    };
    
   
    

   

    const submitForm = () => {
      if(props.isAdd) {
				//Object.assign(inventoryForm, form)
        store.dispatch('updateInventory', {id: inventoryForm.id, data: inventoryForm}).then(() => {
          store.dispatch('inventoriesList')

          emit('is-visible', false);
        })
      }
      else {
        console.log('data', inventoryForm)
        store.dispatch('addInventory', inventoryForm).then(() => {
          store.dispatch('inventoriesList')
          emit('is-visible', false);
        })
      }
      handleCancel();
      store.commit('checkChangeInput', false)
    }
    function checkChangeInput() {
			store.commit('checkChangeInput', true)
		}

		const checkFieldsData = computed(() => {
			return store.state.common.checkChangeInput;
		})
    const form = reactive({ ...inventoryForm })
    const handleCancel = () => {
				formRef.value.resetFields();
				Object.assign(inventoryForm, form)
				//emit('is-visible', false);
		};

    function closeModal() {
      emit("is-visible", true)
			if (checkFieldsData.value) {
				warningSwal(messages.modalWarning).then((response) => {
					if (response == true) {
						handleCancel();
						emit("is-visible", false);
						store.commit('checkChangeInput', false)
					} else {
						emit("is-visible", true);
					}
				});
			}
			else {
				formRef.value.resetFields();
        emit("is-visible", false)
			}
		}
    return {
      
    
      inventoryForm,
      submitForm,
      handleCancel,
     
      size: ref("large"),
      checked,
      onSelectOption,
      inventoryTypes,
      deviceModalsList,
      closeModal,
      checkFieldsData,
			checkChangeInput,
      formRef,
    };
  },
};
</script>
