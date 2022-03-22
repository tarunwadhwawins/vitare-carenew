<template>
  <a-modal width="800px" :title="title">
    <a-form :model="inventoryForm" layout="vertical" @finish="submitForm">
      <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('inventory.deviceType')" name="deviceType" :rules="[{ required: true, message: $t('inventory.deviceType')+' '+$t('global.validation')  }]">
              <!-- <AutoComplete
                :options="deviceTypes"
                @on-select="onSelectOption"
                v-if="deviceTypes"
                v-model:value="inventoryForm.deviceType" /> -->
                <a-select ref="select" v-model:value="inventoryForm.deviceType" style="width: 100%" size="large" @change="onSelectOption">
                  <a-select-option value="" hidden>{{'Select Device Type'}}</a-select-option>
                  <a-select-option v-for="deviceType in inventoryTypes.globalCode" :key="deviceType.id" :value="deviceType.id">
                    {{ deviceType.name }}</a-select-option>
                </a-select>
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('inventory.modelNumber')" name="deviceModelId" :rules="[{ required: true, message: $t('inventory.modelNumber')+' '+$t('global.validation')  }]">
              <!-- <AutoComplete
                :options="deviceModals"
                @on-select="onSelectModal"
                v-if="deviceModals"
                v-model:value="inventoryForm.deviceModelId" /> -->
                <a-select ref="select" v-model:value="inventoryForm.deviceModelId" style="width: 100%" size="large" :disabled="disabledModelNumber">
                  <a-select-option value="" hidden>{{'Select Model Number'}}</a-select-option>
                  <a-select-option v-for="deviceModal in deviceModalsList" :key="deviceModal.id" :value="deviceModal.id">{{ deviceModal.modelNumber }}</a-select-option>
                </a-select>
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('inventory.serialNumber')" name="serialNumber" :rules="[{ required: true, message: $t('inventory.serialNumber')+' '+$t('global.validation')  }]">
              <a-input v-model:value="inventoryForm.serialNumber" size="large" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('inventory.macAddress')" name="macAddress" :rules="[{ required: true, message: $t('inventory.macAddress')+' '+$t('global.validation')  }]">
              <a-input v-model:value="inventoryForm.macAddress" size="large" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('inventory.activeStatus')" name="isActive">
              <a-switch v-model:checked="inventoryForm.isActive" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="24" :span="24">
          <ModalButtons/>
        </a-col>
      </a-row>
      <Loader />
    </a-form>
  </a-modal>
</template>
<script>
import { ref, reactive, computed, watchEffect, onMounted } from "vue";
import { useStore } from "vuex"
import ModalButtons from "@/components/common/button/ModalButtons";
import Loader from "@/components/loader/Loader"
// import AutoComplete from "@/components/common/input/AutoComplete";
export default {
  components: {
    ModalButtons,
    // AutoComplete,
    Loader,
  },
  props: {
    isAdd: {
      type: Boolean
    }
  },
  setup(props, {emit}) {
    const store = useStore()
    const checked = ref([false]);
    const title = props.isAdd ? "Add Inventory" : "Edit Inventory";
    const isEdit = props.isAdd ? false : true;
    const disabled = props.isAdd ? false : true;
    const disabledModelNumber = ref(true);
    
    const handleCancel = () => {
      emit('is-visible', false);
    };

    const inventory = computed(() => {
      return store.state.inventory;
    })
    const inventoryDetail = inventory.value.inventoryDetails;
    console.log('inventoryDetail', inventoryDetail)
    
    var switchOn;
    if(isEdit) {
      switchOn = inventoryDetail && inventoryDetail.isActive ? true : false;
    }
    else {
      switchOn = true;
    }
    
    const inventoryForm = reactive({
      deviceType: '',
      deviceModelId: inventoryDetail && inventoryDetail.modelNumber ? inventoryDetail.modelNumber : '',
      serialNumber: '',
      macAddress: '',
      isActive: switchOn,
    });
    
    const inventoryTypes = computed(() => {
      return store.state.common.deviceType;
    })

    onMounted(() => {
      if(isEdit) {
        disabledModelNumber.value = false
        Object.assign(inventoryForm, inventory.value.inventoryDetails);
      }
    })
    
    /* const deviceTypes = ref([])
    inventoryTypes.value.globalCode.forEach(element => {
      deviceTypes.value.push({
        value: element.name,
        id: element.id,
      })
    }); */

    const deviceModalsList = computed(() => {
      return store.state.inventory.deviceModalsList
    });

    const onSelectOption = (value) => {
      store.state.inventory.deviceModalsList = ""
      store.dispatch('deviceModalsList', value)
      disabledModelNumber.value = false
      // deviceModalsList.value = null;
      // deviceTypes.value.forEach(type => {
      //   if(type.value == selected) {
      //     store.dispatch('deviceModalsList', type.id)
      //   }
      // });
    };
    
    // const deviceModals = ref([])
    watchEffect(() => {
      // deviceModalsList = computed(() => {
      //   return store.state.inventory.deviceModalsList
      // });
      // deviceModals.value = [];
      // if(deviceModalsList.value != null) {
      //   deviceModalsList.value.forEach(element => {
      //     deviceModals.value.push({
      //       value: element.modelNumber,
      //       id: element.id,
      //     })
      //   });
      // }
    })

    /* const modelId = ref(null);
    const onSelectModal = (selected) => {
      deviceModals.value.forEach(modal => {
        if(modal.value == selected) {
          modelId.value = modal.id;
        }
      });
    }; */

    const submitForm = () => {
      if(isEdit) {
        // console.log('data', data)
        const id = inventoryDetail.id;
        inventoryForm.deviceModelId = inventoryDetail.deviceModelId
        store.dispatch('updateInventory', {id: id, data: inventoryForm}).then(() => {
          store.dispatch('inventoriesList')
          emit('is-visible', false);
        })
      }
      else {
        store.dispatch('addInventory', inventoryForm).then(() => {
          store.dispatch('inventoriesList')
          emit('is-visible', false);
        })
      }
    }
    
    return {
      // onSelectModal,
      // deviceModals,
      disabledModelNumber,
      disabled,
      title,
      inventoryForm,
      submitForm,
      handleCancel,
      // deviceTypes,
      size: ref("large"),
      checked,
      onSelectOption,
      inventoryTypes,
      deviceModalsList,
    };
  },
};
</script>
