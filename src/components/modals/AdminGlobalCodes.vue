<template>
<a-modal width="800px" :title="isAdd ? 'Edit Global Code' : 'Add Global Code'" :footer="null" :maskClosable="false" @cancel="closeModal()" centered>

    <a-form ref="formRef" :model="globalCodeForm" layout="vertical" @finish="submitForm">

        <a-row :gutter="24">
            <a-col :sm="8" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('globalCodes.category')" name="globalCodeCategory" :rules="[{ required: true, message: $t('globalCodes.category')+' '+$t('global.validation')  }]">
                        <a-select v-if="globalCodeCategories" ref="select" v-model:value="globalCodeForm.globalCodeCategory" style="width: 100%" size="large" placeholder="Select Device Type" :options="globalCodeCategories.map((item) => ({label: item.name, value: item.id }))" @change="checkChangeInput()"></a-select>
                        <!-- <AutoComplete :options="globalCodeCategories.map((item) => ({label: item.name, value: item.id }))"  v-if="globalCodeCategories" v-model:value="globalCodeForm.globalCodeCategory" @change="checkChangeInput()" /> -->
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="8" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('globalCodes.codeName')" name="name" :rules="[{ required: true, message: $t('globalCodes.codeName')+' '+$t('global.validation')  }]">
                        <a-input v-model:value="globalCodeForm.name" size="large" @change="checkChangeInput()" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="8" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('globalCodes.activeStatus')" name="status">
                        <a-switch :checked="globalCodeForm.status ? true : false" @change="UpdateStatus($event)" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="24" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('globalCodes.description')" name="description" :rules="[{ required: true, message: $t('globalCodes.description')+' '+$t('global.validation')  }]">
                        <a-textarea v-model:value="globalCodeForm.description" placeholder="Description" allow-clear @change="checkChangeInput()" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="24" :span="24">
                <ModalButtons :Id="isAdd" :disabled="formButton" @is_click="handleClear" />
            </a-col>
        </a-row>
    </a-form>
</a-modal>
</template>

<script>
import {
    ref,
    reactive,
    computed,
    watchEffect
} from "vue";
import {
    useStore
} from "vuex"
import ModalButtons from "@/components/common/button/ModalButtons";
//import AutoComplete from "@/components/common/input/AutoComplete";
import {
    warningSwal
} from "@/commonMethods/commonMethod";
import {
    messages
} from "../../config/messages";
export default {
    components: {
        ModalButtons,
        // AutoComplete
    },
    props: {
        isAdd: {
            type: Boolean
        }
    },
    setup(props, {
        emit
    }) {
        const store = useStore()
        const formRef = ref()
        const checked = ref([false]);

        const formButton = ref(false)
        const handleCancel = () => {
            emit('is-visible', false);
        };

        //const codecategoryId = ref(null);
        //onst onSelectOption = (selected) => {
        // categories.value.forEach(category => {
        //     if (category.value == selected) {
        //         codecategoryId.value = category.id
        //     }
        // });
        //};
        const codeDetails = ref(null)
        const globalCodeForm = reactive({
            globalCodeCategory: '',
            name: '',
            description: '',
            status: true,
        });

        watchEffect(() => {
            if (props.isAdd != null) {
                // console.log("sdffds")
                codeDetails.value = store.state.globalCodes.globalCodeDetails
                Object.assign(globalCodeForm, codeDetails.value)
            }
        })

        const globalCodeCategories = computed(() => {
            return store.state.common.globalCodeCategories;
        })

        //const categories = ref([])
        // globalCodeCategories.value ? globalCodeCategories.value.forEach(element => {
        //     categories.value.push({
        //         value: element.name,
        //         id: element.id,
        //     })
        // }) : ''

        const form = reactive({
            ...globalCodeForm
        })
        const handleClear = () => {
            //formRef.value.resetFields();
            Object.assign(globalCodeForm, form)
        }

        const submitForm = () => {
            if (props.isAdd) {
                const data = {
                    "name": globalCodeForm.name,
                    "description": globalCodeForm.description,
                    "status": globalCodeForm.status,
                    "globalCodeCategory": globalCodeForm.globalCodeCategory
                }
                const id = props.isAdd;
                store.dispatch('updateGlobalCode', {
                    id,
                    data
                }).then(() => {
                    store.dispatch('globalCodesList')
                })

            } else {
                formButton.value = true

                store.dispatch('addGlobalCode', globalCodeForm).then(() => {
                    store.dispatch('globalCodesList')
                })
                emit('close-modal', false);
            }
            store.commit('checkChangeInput', false)
            emit('close-modal', false);
            handleClear()
        }

        function closeModal() {
            if (checkFieldsData.value) {
                warningSwal(messages.modalWarning).then((response) => {
                    if (response == true) {
                        handleClear()
                        emit("close-modal", false);

                        store.commit('checkChangeInput', false)
                    } else {
                        emit("close-modal", true);
                    }
                })
            } else {
                handleClear()
            }
        }

        const checkFieldsData = computed(() => {
            return store.state.common.checkChangeInput;
        })

        function checkChangeInput() {
            store.commit('checkChangeInput', true)
        }

        function UpdateStatus(event) {
            globalCodeForm.status = event
        }
        return {
            UpdateStatus,
            checkChangeInput,
            checkFieldsData,
            closeModal,
            formRef,
            handleClear,
            //onSelectOption,
            globalCodeCategories,

            globalCodeForm,
            submitForm,
            handleCancel,
            //categories,
            size: ref("large"),
            checked,
            formButton
        };
    },
};
</script>
