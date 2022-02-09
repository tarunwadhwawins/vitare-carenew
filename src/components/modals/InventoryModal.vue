<template>
  <a-modal max-width="1140px" width="100%" :title="title">
    <a-form :model="inventoryForm" layout="vertical" @finish="submitForm">
      <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('inventory.deviceType')" name="deviceType" :rules="[{ required: true, message: $t('inventory.deviceType')+' '+$t('global.validation')  }]">
              <AutoComplete
                :options="deviceTypes"
                @on-select="onSelectOption"
                v-if="deviceTypes"
                v-model:value="inventoryForm.deviceType" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('inventory.modelNumber')" name="deviceModelId" :rules="[{ required: true, message: $t('inventory.deviceModelId')+' '+$t('global.validation')  }]">
              <AutoComplete
                :options="deviceModals"
                @on-select="onSelectModal"
                v-if="deviceModals"
                v-model:value="inventoryForm.deviceModelId" />
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
    </a-form>
  </a-modal>
</template>
<script>
import { ref, reactive, computed, watchEffect } from "vue";
import { useStore } from "vuex"
import ModalButtons from "@/components/common/button/ModalButtons";
import AutoComplete from "@/components/common/input/AutoComplete";
export default {
  components: {
    ModalButtons,
    AutoComplete,
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
    
    const handleCancel = () => {
      emit('is-visible', false);
    };

    const inventoryDetails = computed(() => {
      return store.state.globalCodes.inventoryDetails;
    })
    const inventoryDetail = inventoryDetails.value;
    
    const inventoryForm = reactive({
      deviceType:  inventoryDetail && inventoryDetail.deviceType ? inventoryDetail.deviceType : '',
      deviceModelId:  inventoryDetail && inventoryDetail.deviceModelId ? inventoryDetail.deviceModelId : '',
      serialNumber:  inventoryDetail && inventoryDetail.serialNumber ? inventoryDetail.serialNumber : '',
      macAddress:  inventoryDetail && inventoryDetail.macAddress ? inventoryDetail.macAddress : '',
      isActive:  inventoryDetail && inventoryDetail.isActive ? inventoryDetail.isActive : false,
    });
    
    const inventoryTypes = computed(() => {
      return store.state.common.deviceType;
    })
    
    const deviceTypes = ref([])
    inventoryTypes.value.globalCode.forEach(element => {
      deviceTypes.value.push({
        value: element.name,
        id: element.id,
      })
    });

    const onSelectOption = (selected) => {
      deviceTypes.value.forEach(type => {
        if(type.value == selected) {
          store.dispatch('deviceModalsList', type.id)
        }
      });
    };
    
    const deviceModals = ref([])
    watchEffect(() => {
      const deviceModalsList = computed(() => {
        return store.state.inventory.deviceModalsList
      });
      if(deviceModalsList.value != null) {
        deviceModalsList.value.forEach(element => {
          deviceModals.value.push({
            value: element.modelNumber,
            id: element.id,
          })
        });
      }
    })

    const deviceModelId = ref(null);
    const onSelectModal = (selected) => {
      deviceModals.value.forEach(modal => {
        if(modal.value == selected) {
          deviceModelId.value = modal.id;
        }
      });
    };

    const submitForm = () => {
      if(isEdit) {
        const data = {
          "deviceType": inventoryForm.deviceType,
          "deviceModelId": inventoryForm.deviceModelId,
          "serialNumber": inventoryForm.serialNumber,
          "macAddress": inventoryForm.macAddress,
          "isActive": inventoryForm.isActive,
        }
        const id = '5';
        store.dispatch('updateInventory', {id, data}).then(() => {
          store.dispatch('inventoriesList')
        })
        emit('is-visible', false);
      }
      else {
        inventoryForm.deviceModelId = deviceModelId.value;
        store.dispatch('addInventory', inventoryForm).then(() => {
          store.dispatch('inventoriesList')
        })
        emit('is-visible', false);
      }
    }
    
    return {
      onSelectModal,
      deviceModals,
      disabled,
      title,
      inventoryForm,
      submitForm,
      handleCancel,
      deviceTypes,
      size: ref("large"),
      checked,
      onSelectOption,
    };
  },
};
</script>
