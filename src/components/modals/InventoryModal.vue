<template>
  <a-modal max-width="1140px" width="100%" :title="title">
    <a-form :model="inventoryForm" layout="vertical" @finish="submitForm">
      <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('inventory.deviceType')" name="deviceType" :rules="[{ required: true, message: $t('inventory.deviceType')+' '+$t('global.validation')  }]">
              <a-select
                v-if="deviceTypes"
                ref="select"
                v-model:value="inventoryForm.deviceType"
                style="width: 100%"
                size="large">
                <a-select-option value="" hidden>Select Device Type</a-select-option>
                <a-select-option v-for="device in deviceTypes.globalCode" :key="device.id" :value="device.id">{{ device.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('inventory.modelNumber')" name="modelNumber" :rules="[{ required: true, message: $t('inventory.modelNumber')+' '+$t('global.validation')  }]">
              <a-input v-model:value="inventoryForm.modelNumber" size="large" />
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
          <div class="steps-action">
            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
              <a-button @click="handleCancel" html-type="reset">{{$t('global.cancel')}}</a-button>
              <a-button type="primary" html-type="submit">{{$t('global.ok')}}</a-button>
            </a-form-item>
          </div>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
<script>
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex"
export default {
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
      modelNumber:  inventoryDetail && inventoryDetail.modelNumber ? inventoryDetail.modelNumber : '',
      serialNumber:  inventoryDetail && inventoryDetail.serialNumber ? inventoryDetail.serialNumber : '',
      macAddress:  inventoryDetail && inventoryDetail.macAddress ? inventoryDetail.macAddress : '',
      isActive:  inventoryDetail && inventoryDetail.isActive ? inventoryDetail.isActive : false,
    });
    
    const deviceTypes = computed(() => {
      return store.state.common.deviceType;
    })

    const submitForm = () => {
      if(isEdit) {
        const data = {
          "deviceType": inventoryForm.deviceType,
          "modelNumber": inventoryForm.modelNumber,
          "serialNumber": inventoryForm.serialNumber,
          "macAddress": inventoryForm.macAddress,
          "isActive": inventoryForm.isActive,
        }
        const id = '5';
        // const id = inventoryDetails.value.id;
        console.log('inventoryForm', id)
        console.log('inventoryForm data', data)
        store.dispatch('updateInventory', {id, data}).then(() => {
          store.dispatch('inventoriesList')
        })
        emit('is-visible', false);
      }
      else {
        console.log('inventoryForm', inventoryForm)
        store.dispatch('addInventory', inventoryForm).then(() => {
          store.dispatch('inventoriesList')
        })
        emit('is-visible', false);
      }
    }
    
    return {
      disabled,
      title,
      inventoryForm,
      submitForm,
      handleCancel,
      deviceTypes,
      size: ref("large"),
      checked,
    };
  },
};
</script>
