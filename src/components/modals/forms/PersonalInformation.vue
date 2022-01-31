<template>
<a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="onFinish" @finishFailed="onFinishFailed">
    <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('global.firstName')" name="firstName" :rules="[{ required: true, message: 'This field is required.' }]">
                    <a-input v-model:value="formState.firstName" placeholder="input placeholder" size="large" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :sm="12" :xs="24">   
            <div class="form-group">
                <a-form-item :label="$t('global.lastName')" name="lastName" :rules="[{ required: true, message: 'This field is required.' }]">
                    <a-input v-model:value="formState.lastName" placeholder="input placeholder" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item name="designation" :label="$t('global.designation')" has-feedback :rules="[{ required: true, message: 'This field is required.' }]">
                    <a-select v-model:value="formState.designation" placeholder="Please select designation">
                        <a-select-option value="Administrative">Administrative</a-select-option>
                        <a-select-option value="Manager">Manager</a-select-option>
                        <a-select-option value="Executive">Executive</a-select-option>
                    </a-select>
                </a-form-item>
            </div>

        </a-col>
        <a-col :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item name="gender" :label="$t('global.gender')" has-feedback :rules="[{ required: true, message: 'This field is required.' }]">
                    <a-select v-model:value="formState.gender" placeholder="Please select gender">
                        <a-select-option value="lucy">Male</a-select-option>
                        <a-select-option value="Yiminghe">Female</a-select-option>
                        <a-select-option value="Yiminghe">Others</a-select-option>
                    </a-select>
                </a-form-item>
            </div>
        </a-col>
        <a-col :sm="12" :xs="24">
             <div class="form-group">
                <a-form-item :label="$t('global.email')" name="email" :rules="[{ required: true, message: 'This field is required.' }]">
                    <a-input v-model:value="formState.email" placeholder="input placeholder" />
                </a-form-item>
             </div>
        </a-col>
        <a-col :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('global.phoneNo')" name="phoneNo" :rules="[{ required: true, message: 'This field is required.' }]">
                    <a-input v-model:value="formState.phoneNo" placeholder="input placeholder" />
                </a-form-item>
             </div>
        </a-col>
        <a-col :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('global.specialization')" name="specialization" :rules="[{ required: true, message: 'This field is required.' }]">
                    <a-input v-model:value="formState.specialization" placeholder="input placeholder" />
                </a-form-item>
             </div>
        </a-col>
        <a-col :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('global.network')" name="network" :rules="[{ required: true, message: 'This field is required.' }]">
                    <a-input v-model:value="formState.network" placeholder="input placeholder" />
                </a-form-item>
             </div>
        </a-col>
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
    </a-row>
</a-form>
</template>

<script>
import {
    defineComponent,
    ref,
    reactive
} from "vue";
export default defineComponent({
    components: {},

    setup() {
        const formState = reactive({
            firstName: '',
            lastName: '',
            designation: '',
            gender:'',
            email:'',
            phoneNo:'',
            specialization:'',
            network:''

        });
        const onFinish = values => {
            console.log('Success:', values);
        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };

        return {
            size: ref('large'),
            onFinish,
            onFinishFailed,
            formState
        };
    },
});
</script>
