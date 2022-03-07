<template>
<a-modal title="Add New Physician">
    <a-form ref="formRef" :model="physicianForm" layout="vertical" @finish="sendMessage" @finishFailed="onFinishFailed">
        <a-row :gutter="24">
            <!-- <a-col :sm="24" :xs="24">
        <div class="form-group">
          <label>Physician</label>
          <a-select
            v-model:value="value"
            show-search
            placeholder="Select Physician"
            style="width: 100%"
            :options="options"
            :filter-option="filterOption"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
          ></a-select>
        </div>
      </a-col> -->
            <a-col :sm="24" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('appointmentCalendar.physician')" name="staffId">
                        <a-select ref="select" v-if="staffList" v-model:value="physicianForm.staffId" style="width: 100%" size="large">
                            <a-select-option value="" hidden>{{'Select Staff'}}</a-select-option>
                            <a-select-option v-for="staff in staffList" :key="staff.id" :value="staff.id">{{ staff.fullName }}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </div>
            </a-col>
            <a-col>
                <div class="steps-action">
                    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                        <a-button class="modal-button" type="primary" html-type="submit">{{$t('global.add')}}</a-button>
                    </a-form-item>
                </div>
            </a-col>
        </a-row>
    </a-form>
</a-modal>
</template>

<script>
import {
    ref,
    reactive
} from "vue";
import {
    useStore
} from "vuex"
export default {
    props: {

    },
    setup(props, {
        emit
    }) {
        const options = ref([{
                value: "Steve Smith",
                label: "Steve Smith",
            },
            {
                value: "Robert Henry",
                label: "Robert Henry",
            },
            {
                value: "Smith Joseph",
                label: "Smith Joseph",
            },
            {
                value: "Jane Doe",
                label: "Jane Doe",
            },
        ]);
        const store = useStore()
        const handleChange = (value) => {
            console.log(`selected ${value}`);
        };

        const handleBlur = () => {
            console.log("blur");
        };

        const handleFocus = () => {
            console.log("focus");
        };

        const filterOption = (input, option) => {
            return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };
        const staffList = store.getters.commonRecords.value.staffList

        const physicianForm = reactive({
            staffId: ''
        })
        const sendMessage = () => {
            store.dispatch('staffSummary', physicianForm.staffId).then(() => {
                addStaff()
            })
        }
        const form = reactive({
            ...physicianForm
        })

        function addStaff() {
            Object.assign(physicianForm, form)
            emit('add-staff', {
                data: store.state.careCoordinatorSummary.staffSummary
            });

        }
        return {
            value: ref(undefined),
            filterOption,
            handleBlur,
            handleFocus,
            handleChange,
            options,
            staffList,
            physicianForm,
            sendMessage,
        };
    },
};
</script>
