<template>
<a-form :model="contact" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="addContacts" @finishFailed="contactDataFailed">
    <a-row :gutter="24">
        <a-col :md="12" :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('global.firstName')" name="firstName" :rules="[{ required: true, message: $t('global.firstName')+' '+$t('global.validation')  }]">
                    <a-input v-model:value="contact.firstName" size="large" />
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.firstName?errorMsg.firstName[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :md="12" :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('global.lastName')" name="lastName" :rules="[{ required: false, message: $t('global.lastName')+' '+$t('global.validation') }]">
                    <a-input v-model:value="contact.lastName" size="large" />
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.lastName?errorMsg.lastName[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :md="12" :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('global.email')" name="email" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.email').toLowerCase(), type: 'email' }]">
                    <a-input v-model:value="contact.email" placeholder="test@test.com" size="large" />
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.email?errorMsg.email[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :md="12" :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('global.phoneNo')" name="phoneNumber" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern: regex.phoneNumber}]">
                    <a-input v-model:value="contact.phoneNumber" placeholder="Please enter 10 digit number" size="large" />
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.phoneNumber?errorMsg.phoneNumber[0]:''" />
                </a-form-item>
            </div>
        </a-col>
    </a-row>
    <a-row :gutter="24" class="mb-24">
        <a-col :span="24">
            <a-button class="btn primaryBtn" html-type="submit">{{$t('global.add')}}</a-button>
        </a-col>
    </a-row>
    <a-row :gutter="24">
        <a-col :span="24">
            <a-table :pagination="false" :columns="staffs.staffContactColms" :data-source="staffs.staffContactList" :scroll="{ x: 900 }">
                <template #action="text">
                    <a-tooltip placement="bottom" @click="deleteContact(text.record.id)">
                        <template #title>
                            <span>{{$t('global.delete')}}</span>
                        </template>
                        <a class="icons">
                            <DeleteOutlined /></a>
                    </a-tooltip>
                </template>
            </a-table>
            <Loader />
        </a-col>
    </a-row>
</a-form>
</template>

<script>
import { defineComponent, reactive, ref, computed } from "vue";
import { useStore } from "vuex";
import { regex } from "@/RegularExpressions/regex";
import { warningSwal } from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
import Loader from "@/components/loader/Loader";
import {
  // EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    // EditOutlined,
    DeleteOutlined,
    Loader,
  },
  setup() {
    const store = useStore();
    const contact = reactive({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    });

    function addContacts() {
      store.dispatch("addContacts", {
        id: staffs.value.addStaff.id,
        data: contact,
      });
      setTimeout(() => {
        store.dispatch("staffContactList", staffs.value.addStaff.id);
      }, 2000);
    }
    const staffs = computed(() => {
      return store.state.careCoordinator;
    });

    function deleteContact(id) {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch("deleteContact", {
            id: staffs.value.addStaff.id,
            contactId: id,
          });
          setTimeout(() => {
            store.dispatch("staffContactList", staffs.value.addStaff.id);
          }, 2000);
        }
      });
    }
    return {
      deleteContact,
      addContacts,
      contact,
      size: ref("large"),
      staffs,
      regex,
    };
  },
});
</script>
