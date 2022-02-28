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
            <a-form-item :label="$t('inventory.modelNumber')" name="deviceModelId" :rules="[{ required: true, message: $t('inventory.modelNumber')+' '+$t('global.validation')  }]">
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
import { ref, reactive, computed, watchEffect, onMounted } from "vue";
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

    const inventory = computed(() => {
      return store.state.inventory;
    })
    console.log('inventory', inventory)
    const inventoryDetail = inventory.value.inventoryDetails;
    
    var switchOn;
    if(isEdit) {
      switchOn = inventoryDetail && inventoryDetail.isActive ? true : false;
    }
    else {
      switchOn = true;
    }
    
    const inventoryTypes = computed(() => {
      return store.state.common.deviceType;
    })
    
    const inventoryForm = reactive({
      deviceType: '',
      deviceModelId: '',
      serialNumber: '',
      macAddress: '',
      isActive: switchOn,
    });

    onMounted(() => {
      if(isEdit) {
        Object.assign(inventoryForm, inventory.value.inventoryDetails);
      }
    })
    
    const deviceTypes = ref([])
    inventoryTypes.value.globalCode.forEach(element => {
      deviceTypes.value.push({
        value: element.name,
        id: element.id,
      })
    });

    const onSelectOption = (selected) => {
      deviceModalsList.value = null;
      deviceTypes.value.forEach(type => {
        if(type.value == selected) {
          store.dispatch('deviceModalsList', type.id)
        }
      });
    };
    
    const deviceModals = ref([])
    var deviceModalsList = ref(null)
    watchEffect(() => {
      deviceModalsList = computed(() => {
        return store.state.inventory.deviceModalsList
      });
      deviceModals.value = [];
      if(deviceModalsList.value != null) {
        deviceModalsList.value.forEach(element => {
          deviceModals.value.push({
            value: element.modelNumber,
            id: element.id,
          })
        });
      }
    })

    const modelId = ref(null);
    const onSelectModal = (selected) => {
      deviceModals.value.forEach(modal => {
        if(modal.value == selected) {
          modelId.value = modal.id;
        }
      });
    };

    const submitForm = () => {
      if(isEdit) {
        const data = {
          "deviceModelId": modelId.value != null ? modelId.value : inventoryDetail.modelId,
          "serialNumber": inventoryForm.serialNumber,
          "macAddress": inventoryForm.macAddress,
          "isActive": inventoryForm.isActive,
        }
        console.log('data', data)
        const id = inventoryDetail.id;
        store.dispatch('updateInventory', {id, data}).then(() => {
          store.dispatch('inventoriesList')
          emit('is-visible', false);
        })
      }
      else {
        inventoryForm.deviceModelId = modelId.value;
        store.dispatch('addInventory', inventoryForm).then(() => {
          store.dispatch('inventoriesList')
          emit('is-visible', false);
        })
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
